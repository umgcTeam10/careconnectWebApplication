import { spawn } from 'node:child_process';
import net from 'node:net';

const isWindows = process.platform === 'win32';
const npmCommand = isWindows ? 'npm.cmd' : 'npm';
const npxCommand = isWindows ? 'npx.cmd' : 'npx';
const isHeaded = process.argv.includes('--headed');
const isSlow = process.argv.includes('--slow');

function spawnProcess(command, args, options = {}) {
  if (isWindows) {
    const cmd = process.env.ComSpec || 'cmd.exe';
    return spawn(cmd, ['/d', '/s', '/c', [command, ...args].join(' ')], {
      stdio: 'inherit',
      shell: false,
      ...options,
    });
  }

  return spawn(command, args, {
    stdio: 'inherit',
    shell: false,
    ...options,
  });
}

function runCommand(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawnProcess(command, args, options);

    child.on('error', reject);
    child.on('exit', (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(`${command} ${args.join(' ')} exited with code ${code}`));
    });
  });
}

function getAvailablePort(startPort = 4173) {
  return new Promise((resolve, reject) => {
    const tryPort = (port) => {
      const server = net.createServer();

      server.unref();
      server.on('error', (error) => {
        if (error.code === 'EADDRINUSE') {
          tryPort(port + 1);
          return;
        }

        reject(error);
      });

      server.listen(port, '127.0.0.1', () => {
        const { port: openPort } = server.address();
        server.close(() => resolve(openPort));
      });
    };

    tryPort(startPort);
  });
}

async function waitForServer(url, timeoutMs = 30000) {
  const started = Date.now();

  while (Date.now() - started < timeoutMs) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return;
      }
    } catch {
      // Retry until timeout.
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  throw new Error(`Timed out waiting for ${url}`);
}

async function killProcessTree(pid) {
  if (!pid) {
    return;
  }

  if (isWindows) {
    try {
      await runCommand('taskkill', ['/pid', String(pid), '/t', '/f'], {
        stdio: 'ignore',
      });
    } catch {
      // Ignore cleanup failures.
    }
    return;
  }

  try {
    process.kill(-pid, 'SIGTERM');
  } catch {
    // Ignore cleanup failures.
  }
}

async function main() {
  const port = await getAvailablePort();
  const baseUrl = `http://127.0.0.1:${port}`;

  const previewProcess = spawnProcess(npxCommand, ['vite', 'preview', '--host', '127.0.0.1', '--port', String(port), '--strictPort'], {
    detached: !isWindows,
  });

  try {
    await waitForServer(baseUrl);
    const cypressArgs = ['cypress', 'run', '--config', `baseUrl=${baseUrl}`];

    if (isHeaded) {
      cypressArgs.push('--headed', '--browser', 'electron');
    }

    if (isSlow) {
      cypressArgs.push('--env', 'demoMode=true');
    }

    await runCommand(npxCommand, cypressArgs);
  } finally {
    await killProcessTree(previewProcess.pid);
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
