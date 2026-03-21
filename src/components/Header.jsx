import styles from './Header.module.css';
import Icon from './Icon';
import Badge from './Badge';
import { currentUser } from '../data/mockData';

export default function Header({ title = 'CareConnect', onMenuToggle }) {
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const timeStr = now.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <header className={styles.header}>
      <button
        className={styles.menuButton}
        onClick={onMenuToggle}
        aria-label="Open navigation menu"
        type="button"
      >
        <Icon name="menu" size={24} />
      </button>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.headerRight}>
        <span className={styles.dateTime}>
          {dateStr} | {timeStr}
        </span>
        <span className={styles.userName}>{currentUser.careRecipient.split(' ')[0]}</span>
        <Badge variant="primary">PATIENT</Badge>
      </div>
    </header>
  );
}
