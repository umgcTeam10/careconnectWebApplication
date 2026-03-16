import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Onboarding.module.css';
import Button from '../components/Button';

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
