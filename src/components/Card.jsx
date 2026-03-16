import styles from './Card.module.css';

export default function Card({ children, className = '', padding = 'md', ...rest }) {
  const classNames = [styles.card, styles[`pad-${padding}`], className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames} {...rest}>
      {children}
    </div>
  );
}
