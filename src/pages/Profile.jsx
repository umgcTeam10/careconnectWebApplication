import styles from './Profile.module.css';
import Card from '../components/Card';
import Icon from '../components/Icon';

export default function Profile() {
  return (
    <div className={styles.profile}>
      <section aria-labelledby="profile-heading">
        <div className={styles.avatarSection}>
          <div className={styles.avatar} aria-hidden="true">S</div>
          <h2 id="profile-heading" className={styles.name}>Sarah Johnson</h2>
          <p className={styles.role}>Caregiver</p>
        </div>

        <Card className={styles.infoCard}>
          <h3 className={styles.cardTitle}>Account Information</h3>
          <dl className={styles.infoList}>
            <div className={styles.infoItem}>
              <dt className={styles.infoLabel}>Email</dt>
              <dd className={styles.infoValue}>sarah.johnson@email.com</dd>
            </div>
            <div className={styles.infoItem}>
              <dt className={styles.infoLabel}>Phone</dt>
              <dd className={styles.infoValue}>(555) 123-4567</dd>
            </div>
            <div className={styles.infoItem}>
              <dt className={styles.infoLabel}>Care Recipient</dt>
              <dd className={styles.infoValue}>Robert Martinez</dd>
            </div>
          </dl>
        </Card>

        <Card className={styles.infoCard}>
          <h3 className={styles.cardTitle}>Preferences</h3>
          <p className={styles.placeholder}>
            Notification preferences, theme settings, and accessibility options will be available here.
          </p>
        </Card>
      </section>
    </div>
  );
}
