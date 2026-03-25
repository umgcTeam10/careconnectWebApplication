import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Onboarding.module.css';
import Button from '../components/Button';
import Icon from '../components/Icon';

const ROLES = [
  {
    id: 'caregiver',
    title: "I'm a Caregiver",
    description:
      'You help someone manage their healthcare, appointments, or daily care needs.',
    features: [
      'Manage appointments and medications for your care recipient',
      'Communicate with their care team on their behalf',
    ],
  },
  {
    id: 'recipient',
    title: "I'm a Care Recipient",
    description:
      "You're managing your own healthcare and may receive support from caregivers.",
    features: [
      'View your appointments, test results, and medications',
      'Message your care team and manage your health records',
    ],
  },
];

export default function Onboarding() {
  const [selectedRole, setSelectedRole] = useState(null);
  const [hasEnteredFlow, setHasEnteredFlow] = useState(false);

  const enterFlow = () => {
    setHasEnteredFlow(true);
  };

  if (!hasEnteredFlow) {
    return (
      <div
        className={`${styles.page} ${styles.welcomePage}`}
        role="button"
        tabIndex={0}
        onClick={enterFlow}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            enterFlow();
          }
        }}
        aria-label="Enter sign-in flow"
      >
        <div className={`${styles.brandPanel} ${styles.standaloneWelcome}`}>
          <div className={styles.brandTop}>
            <div className={styles.brandLogo}>
              <span className={styles.logoIcon}>CC</span>
              <div>
                <div className={styles.brandName}>CareConnect</div>
                <div className={styles.brandSub}>Patient Portal</div>
              </div>
            </div>
            <h1 className={styles.brandTitle}>Welcome back</h1>
            <p className={styles.brandDesc}>
              Sign in to access your appointments, medications, test results, and care team messages. We&rsquo;re here to support you every step of the way.
            </p>
          </div>
          <div className={styles.features}>
            <div className={styles.featureItem}>
              <Icon name="lock" size={20} />
              <div>
                <strong>Secure &amp; Private</strong>
                <p>Your health information is protected with bank-level encryption and HIPAA compliance.</p>
              </div>
            </div>
            <div className={styles.featureItem}>
              <Icon name="clock" size={20} />
              <div>
                <strong>24/7 Access</strong>
                <p>View your health records, upcoming appointments, and messages anytime you need.</p>
              </div>
            </div>
          </div>
          <div className={styles.supportInfo}>
            <p className={styles.supportTitle}>Need help signing in?</p>
            <p><strong>Call Support</strong> - 1-800-CARE-HELP - Available 24/7</p>
            <p><strong>Help Center</strong> - View sign-in guides and FAQs</p>
          </div>
          <p className={styles.welcomePrompt}>Click anywhere to continue</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <main className={styles.container}>
        <p className={styles.step}>Step 1 of 2</p>
        <h1 className={styles.title}>Choose Your Role</h1>
        <p className={styles.subtitle}>
          This helps us show you the most relevant information and features for your needs.
        </p>

        <fieldset className={styles.roleGroup}>
          <legend className="visually-hidden">Select your role</legend>
          {ROLES.map((role) => (
            <label
              key={role.id}
              className={`${styles.roleCard} ${
                selectedRole === role.id ? styles.selected : ''
              }`}
            >
              <input
                type="radio"
                name="role"
                value={role.id}
                checked={selectedRole === role.id}
                onChange={() => setSelectedRole(role.id)}
                className="visually-hidden"
              />
              <h2 className={styles.roleTitle}>{role.title}</h2>
              <p className={styles.roleDesc}>{role.description}</p>
              <ul className={styles.roleFeatures}>
                {role.features.map((f, i) => (
                  <li key={i} className={styles.feature}>
                    {f}
                  </li>
                ))}
              </ul>
            </label>
          ))}
        </fieldset>

        <Link to="/signin" className={styles.continueLink}>
          <Button
            variant="primary"
            fullWidth
            size="lg"
            disabled={!selectedRole}
          >
            Continue &rarr;
          </Button>
        </Link>

        <p className={styles.signInPrompt}>
          Have an account?{' '}
          <Link to="/signin">Sign in to your account.</Link>
        </p>
      </main>
    </div>
  );
}
