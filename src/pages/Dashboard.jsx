import { Link } from 'react-router-dom';
import styles from './Dashboard.module.css';
import Card from '../components/Card';
import SectionHeader from '../components/SectionHeader';
import StatCard from '../components/StatCard';
import Badge from '../components/Badge';
import Button from '../components/Button';
import Icon from '../components/Icon';
import { healthSummary, todaysTasks } from '../data/mockData';

export default function Dashboard() {
  return (
    <div className={styles.dashboard}>
      <section aria-labelledby="health-heading">
        <h2 id="health-heading" className={styles.pageTitle}>
          Your Health Today
        </h2>
        <p className={styles.subtitle}>Here&rsquo;s your care summary for today</p>

        <div className={styles.statsGrid}>
          <StatCard
            icon="checkCircle"
            iconColor="var(--color-success)"
            value={healthSummary.completed}
            label="Completed"
          />
          <StatCard
            icon="clock"
            iconColor="var(--color-warning)"
            value={healthSummary.pending}
            label="Pending"
          />
          <StatCard
            icon="calendar"
            iconColor="var(--color-primary)"
            value={healthSummary.appointments}
            label="Appointments"
          />
        </div>
      </section>

      <section aria-labelledby="wellness-heading" className={styles.section}>
        <Card className={styles.wellnessCard}>
          <div className={styles.wellnessContent}>
            <div className={styles.wellnessIcon}>
              <Icon name="smile" size={24} />
            </div>
            <div>
              <h3 id="wellness-heading" className={styles.wellnessTitle}>
                How are you feeling today?
              </h3>
              <p className={styles.wellnessText}>
                Take a moment to log your mood and any symptoms
              </p>
            </div>
          </div>
          <Link to="/health-logs" className={styles.wellnessLink}>
            <Button variant="primary" size="sm">
              Log Wellness Check
            </Button>
          </Link>
        </Card>
      </section>

      <section aria-labelledby="tasks-heading" className={styles.section}>
        <SectionHeader
          title="Today's Tasks"
          actionLabel="View All →"
          onAction={() => {}}
        />

        <ul className={styles.taskList}>
          {todaysTasks.map((task) => (
            <li key={task.id}>
              <Card className={styles.taskCard}>
                <div className={styles.taskHeader}>
                  <h3 className={styles.taskTitle}>{task.title}</h3>
                  <Badge variant="warning">{task.priority}</Badge>
                </div>
                <p className={styles.taskTime}>{task.time}</p>
              </Card>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
