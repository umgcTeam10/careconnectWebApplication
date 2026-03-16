import styles from './SectionHeader.module.css';

export default function SectionHeader({ title, action, actionLabel, onAction }) {
  return (
    <div className={styles.sectionHeader}>
      <h2 className={styles.title}>{title}</h2>
      {actionLabel && (
        <button className={styles.action} onClick={onAction} type="button">
          {actionLabel}
        </button>
      )}
      {action && !actionLabel && action}
    </div>
  );
}
