import { useState } from 'react';
import styles from './Tasks.module.css';
import Card from '../components/Card';
import StatCard from '../components/StatCard';
import Button from '../components/Button';
import Badge from '../components/Badge';
import Icon from '../components/Icon';
import { taskOverview, todaysTasks, overdueTasks } from '../data/mockData';

const TABS = ['Upcoming', 'Today', 'Overdue', 'Done'];

export default function Tasks() {
  const [activeTab, setActiveTab] = useState('Today');

  const displayedTasks = activeTab === 'Overdue' ? overdueTasks : todaysTasks;

  return (
    <div className={styles.tasks}>
      <div className={styles.mainContent}>
        <section aria-labelledby="task-overview-heading">
          <h2 id="task-overview-heading" className={styles.pageTitle}>
            Task Overview
          </h2>
          <p className={styles.subtitle}>Manage your daily health tasks and activities</p>

          <div className={styles.statsGrid}>
            <StatCard icon="clock" iconColor="var(--color-text-secondary)" value={taskOverview.today} label="Today" />
            <StatCard icon="alertCircle" iconColor="var(--color-warning)" value={taskOverview.overdue} label="Overdue" />
            <StatCard icon="checkCircle" iconColor="var(--color-success)" value={taskOverview.done} label="Done" />
          </div>
        </section>

        <section aria-labelledby="task-list-heading" className={styles.section}>
          <div className={styles.actions}>
            <Button variant="primary" size="sm">
              <Icon name="plus" size={16} /> Add Task
            </Button>
            <Button variant="secondary" size="sm">
              <Icon name="filter" size={16} /> Filter
            </Button>
            <div className={styles.searchWrap}>
              <Icon name="search" size={18} className={styles.searchIcon} />
              <input
                type="search"
                placeholder="Search tasks..."
                className={styles.searchInput}
                aria-label="Search tasks"
              />
            </div>
          </div>

          {overdueTasks.length > 0 && (
            <Card className={styles.overdueAlert}>
              <Icon name="alertCircle" size={18} />
              <span>You have {overdueTasks.length} overdue tasks</span>
              <button className={styles.viewOverdue} type="button">View →</button>
            </Card>
          )}

          <div className={styles.tabs} role="tablist" aria-label="Task time filters">
            {TABS.map((tab) => (
              <button
                key={tab}
                role="tab"
                aria-selected={activeTab === tab}
                className={`${styles.tab} ${activeTab === tab ? styles.activeTab : ''}`}
                onClick={() => setActiveTab(tab)}
                type="button"
              >
                {tab}
              </button>
            ))}
          </div>

          <ul className={styles.taskList} aria-label={`${activeTab} tasks`}>
            {displayedTasks.map((task) => (
              <li key={task.id}>
                <Card className={styles.taskCard}>
                  <div className={styles.taskHeader}>
                    <h3 className={styles.taskTitle}>{task.title}</h3>
                    <Badge variant={task.priority === 'HIGH' ? 'danger' : 'warning'}>
                      {task.priority}
                    </Badge>
                  </div>
                  <p className={styles.taskDesc}>{task.description}</p>
                  {task.time && (
                    <p className={styles.taskMeta}>{task.time} | {task.date}</p>
                  )}
                  {task.tag && <p className={styles.taskTag}>{task.tag}</p>}
                  <div className={styles.taskActions}>
                    <Button variant="primary" size="sm">Done</Button>
                    <Button variant="ghost" size="sm">Reschedule</Button>
                  </div>
                </Card>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <aside className={styles.rightSidebar}>
        <Card className={styles.appointmentSidebar}>
          <div className={styles.appointmentBadges}>
            <Badge variant="danger">NOW</Badge>
            <Badge variant="info">PT</Badge>
          </div>
          <h3 className={styles.appointmentTitle}>Physical Therapy Appointment</h3>
          <p className={styles.appointmentMeta}>Due now &middot; 02:00 PM &middot; A1 clinic</p>
          <div className={styles.appointmentActions}>
            <Button variant="primary" size="sm">Start</Button>
            <Button variant="outline" size="sm">Snooze 10 min</Button>
          </div>
        </Card>
      </aside>
    </div>
  );
}
