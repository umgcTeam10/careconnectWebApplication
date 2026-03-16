import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css';
import Icon from './Icon';
import { navItems } from '../data/mockData';

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {isOpen && (
        <div
          className={styles.overlay}
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}
        aria-label="Primary navigation"
      >
        <div className={styles.brand}>
          <span className={styles.logo}>CC</span>
          <span className={styles.brandName}>CareConnect</span>
        </div>
        <nav>
          <ul className={styles.navList}>
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `${styles.navItem} ${isActive ? styles.active : ''}`
                  }
                  onClick={onClose}
                >
                  <Icon name={item.icon} size={20} />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles.sidebarFooter}>
          <NavLink to="/health-logs" className={styles.navItem} onClick={onClose}>
            <Icon name="activity" size={20} />
            <span>Health Logs</span>
          </NavLink>
        </div>
      </aside>
    </>
  );
}
