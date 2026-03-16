import { useState } from 'react';
import styles from './Header.module.css';
import Icon from './Icon';

export default function Header({ title = 'CareConnect', onMenuToggle }) {
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
    </header>
  );
}
