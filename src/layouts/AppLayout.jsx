import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import BottomNav from '../components/BottomNav';
import NotificationBanner from '../components/NotificationBanner';
import { upcomingAppointment } from '../data/mockData';
import styles from './AppLayout.module.css';

const PAGE_TITLES = {
  '/dashboard': 'Dashboard',
  '/tasks': 'Tasks',
  '/messages': 'Messages',
  '/calendar': 'Calendar',
  '/health-logs': 'Health Logs',
  '/profile': 'Profile',
};

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const pageTitle = PAGE_TITLES[location.pathname] || 'CareConnect';

  return (
    <div className={styles.layout}>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className={styles.mainColumn}>
        <Header
          title={pageTitle}
          onMenuToggle={() => setSidebarOpen((prev) => !prev)}
        />
        <NotificationBanner appointment={upcomingAppointment} />

        <main id="main-content" className={styles.content}>
          <Outlet />
        </main>

        <BottomNav />
      </div>
    </div>
  );
}
