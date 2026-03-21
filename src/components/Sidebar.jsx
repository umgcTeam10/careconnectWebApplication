import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css';
import Icon from './Icon';
import { currentUser } from '../data/mockData';

const sidebarNavItems = [
  { path: '/dashboard', label: 'Dashboard', icon: 'home' },
  { path: '/health-logs', label: 'Health Logs', icon: 'heart' },
  { path: '/messages', label: 'Messages', icon: 'messages' },
  { path: '/calendar', label: 'Calendar', icon: 'calendar' },
  { path: '/tasks', label: 'Tasks', icon: 'tasks' },
  { path: '/profile', label: 'Profile', icon: 'profile' },
];

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
          <div className={styles.brandText}>
            <span className={styles.brandName}>CareConnect</span>
            <span className={styles.brandSub}>Patient Portal</span>
          </div>
        </div>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {sidebarNavItems.map((item) => (
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
          <div className={styles.userProfile}>
            <div className={styles.userAvatar}>
              {currentUser.careRecipient.charAt(0)}
            </div>
            <div className={styles.userInfo}>
              <span className={styles.userName}>{currentUser.careRecipient.split(' ')[0]}</span>
              <span className={styles.userRole}>Patient</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
