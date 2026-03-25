const demoPause = () => {
  if (Cypress.env('demoMode')) {
    cy.wait(800, { log: false });
  }
};

describe('CareConnect critical user flows', () => {
  it('shows the standalone welcome screen first and advances to role selection', () => {
    cy.visit('/');
    demoPause();

    cy.contains('h1', 'Welcome back').should('be.visible');
    cy.contains('Choose Your Role').should('not.exist');

    cy.contains('Click anywhere to continue').click();
    demoPause();

    cy.contains('h1', 'Choose Your Role').should('be.visible');
    cy.contains('Step 1 of 2').should('be.visible');
  });

  it('lets a user choose a role and continue to the sign-in page', () => {
    cy.visit('/');
    demoPause();

    cy.contains('Click anywhere to continue').click();
    demoPause();
    cy.contains('label', "I'm a Caregiver").click();
    demoPause();
    cy.contains('button', 'Continue').click();
    demoPause();

    cy.url().should('include', '/signin');
    cy.contains('h1', 'Sign in to your account').should('be.visible');
  });

  it('submits the sign-in form and lands on the dashboard', () => {
    cy.visit('/signin');
    demoPause();

    cy.get('#email').type('sarah.johnson@example.com');
    cy.get('#password').type('Password123!');
    demoPause();
    cy.contains('button', 'Sign in').click();
    demoPause();

    cy.url().should('include', '/dashboard');
    cy.contains('h1', 'Dashboard').should('be.visible');
    cy.contains('h2', 'Your Health Today').should('be.visible');
  });

  it('navigates between primary app sections from the shared navigation', () => {
    cy.visit('/dashboard');
    demoPause();

    cy.contains('aside nav a', 'Tasks').click();
    demoPause();
    cy.url().should('include', '/tasks');
    cy.contains('h2', 'Task Overview').should('be.visible');

    cy.contains('aside nav a', 'Messages').click();
    demoPause();
    cy.url().should('include', '/messages');
    cy.contains('h2', 'Robert Martinez').should('be.visible');

    cy.contains('aside nav a', 'Calendar').click();
    demoPause();
    cy.url().should('include', '/calendar');
    cy.contains('h2', 'Calendar Overview').should('be.visible');

    cy.contains('aside nav a', 'Profile').click();
    demoPause();
    cy.url().should('include', '/profile');
    cy.contains('h2', 'Settings').should('be.visible');
  });

  it('supports key task, health log, and profile interactions', () => {
    cy.visit('/tasks');
    demoPause();

    cy.contains('[role="tab"]', 'Overdue').click();
    demoPause();
    cy.get('[role="tab"][aria-selected="true"]').should('contain.text', 'Overdue');
    cy.contains('Medication Refill').should('be.visible');

    cy.visit('/health-logs');
    demoPause();
    cy.contains('button', 'Mood').click();
    demoPause();
    cy.contains('button[aria-pressed="true"]', 'Mood').should('be.visible');
    cy.contains('h2', 'Recent Logs').should('be.visible');

    cy.visit('/profile');
    demoPause();
    cy.contains('label', 'Dark Mode').find('input[type="checkbox"]').should('not.be.checked').click({ force: true });
    demoPause();
    cy.contains('label', 'Dark Mode').find('input[type="checkbox"]').should('be.checked');
    cy.contains('button', '24h').click();
    demoPause();
    cy.contains('button', '24h').invoke('attr', 'class').should('match', /formatActive/);
  });
});
