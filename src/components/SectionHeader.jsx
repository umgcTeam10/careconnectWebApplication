import styles from './SectionHeader.module.css';

export default function SectionHeader({ title, action, actionLabel, onAction, id }) {
  return (
    <div className={styles.sectionHeader}>
      <h2 id={id} className={styles.title}>{title}</h2>
      {actionLabel && (
        <button className={styles.action} onClick={onAction} type="button">
          {actionLabel}
        </button>
      )}
      {action && !actionLabel && action}
    </div>
  );
}
