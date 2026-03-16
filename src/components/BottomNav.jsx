import { NavLink } from 'react-router-dom';
import styles from './BottomNav.module.css';
import Icon from './Icon';
import { navItems } from '../data/mockData';

export default function BottomNav() {
  return (
    <nav className={styles.bottomNav} aria-label="Main navigation">
      <ul className={styles.navList}>
        {navItems.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `${styles.navItem} ${isActive ? styles.active : ''}`
              }
            >
              <Icon name={item.icon} size={22} />
              <span className={styles.label}>{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
