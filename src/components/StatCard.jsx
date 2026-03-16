import styles from './StatCard.module.css';
import Icon from './Icon';

export default function StatCard({ icon, iconColor, value, label }) {
  return (
    <div className={styles.statCard}>
      <div className={styles.iconWrap} style={{ color: iconColor }}>
        <Icon name={icon} size={20} />
      </div>
      <div>
        <p className={styles.value}>{value}</p>
        <p className={styles.label}>{label}</p>
      </div>
    </div>
  );
}
