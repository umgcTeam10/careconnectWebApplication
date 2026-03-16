import { Link } from 'react-router-dom';
import styles from './NotificationBanner.module.css';
import Button from './Button';

export default function NotificationBanner({ appointment }) {
  if (!appointment) return null;

  return (
    <aside className={styles.banner} aria-label="Upcoming appointment notification">
      <div className={styles.indicator} />
      <div className={styles.content}>
        <p className={styles.label}>
          {appointment.isNow ? 'Now' : 'Next'}: <strong>{appointment.title}</strong>
        </p>
        <div className={styles.meta}>
          <span>{appointment.time}</span>
          <span>{appointment.location}</span>
        </div>
      </div>
      <Link to="/calendar" className={styles.viewLink}>
        <Button variant="primary" size="sm">
          View &rarr;
        </Button>
      </Link>
    </aside>
  );
}
