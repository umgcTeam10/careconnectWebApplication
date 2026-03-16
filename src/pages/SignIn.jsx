import { Link } from 'react-router-dom';
import styles from './SignIn.module.css';
import Button from '../components/Button';
import Icon from '../components/Icon';

export default function SignIn() {
  return (
    <div className={styles.page}>
      <main className={styles.container}>
        <div className={styles.skipNav}>
          Use Tab to navigate, Enter to activate
        </div>

        <h1 className={styles.title}>Sign in to your account</h1>
        <p className={styles.subtitle}>
          Enter your credentials to access your healthcare portal
        </p>

        <form
          className={styles.form}
          onSubmit={(e) => e.preventDefault()}
        >
          <div className={styles.field}>
            <label htmlFor="email" className={styles.label}>
              Email address <span aria-hidden="true">*</span>
            </label>
            <div className={styles.inputWrap}>
              <Icon name="mail" size={18} className={styles.inputIcon} />
              <input
                id="email"
                type="email"
                className={styles.input}
                placeholder="your.email@example.com"
                required
                autoComplete="email"
              />
            </div>
            <p className={styles.hint}>
              Use the email address associated with your CareConnect account
            </p>
          </div>

          <div className={styles.field}>
            <div className={styles.labelRow}>
              <label htmlFor="password" className={styles.label}>
                Password <span aria-hidden="true">*</span>
              </label>
              <a href="#" className={styles.forgotLink}>Forgot password?</a>
            </div>
            <div className={styles.inputWrap}>
              <Icon name="lock" size={18} className={styles.inputIcon} />
              <input
                id="password"
                type="password"
                className={styles.input}
                placeholder="Enter your password"
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                className={styles.togglePassword}
                aria-label="Show password"
              >
                <Icon name="eye" size={18} />
              </button>
            </div>
          </div>

          <label className={styles.rememberLabel}>
            <input type="checkbox" className={styles.checkbox} />
            <span>Remember me on this device</span>
          </label>

          <Link to="/dashboard">
            <Button variant="primary" fullWidth size="lg" type="submit">
              Sign in
            </Button>
          </Link>
        </form>

        <div className={styles.dividerRow}>
          <Button variant="outline" fullWidth>
            <Icon name="mail" size={18} />
            Email me a sign-in link
          </Button>
        </div>

        <p className={styles.altText}>Or use a secure alternative</p>

        <Button variant="secondary" fullWidth>
          Sign in with Windows Hello / Passkey
        </Button>
      </main>
    </div>
  );
}
