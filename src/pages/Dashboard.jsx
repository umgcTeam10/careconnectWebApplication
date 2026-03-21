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
      <div className={styles.mainContent}>
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

        <section className={styles.section}>
          <SectionHeader title="Health Summary" />
          <p className={styles.summarySubtitle}>Recent vitals and measurements</p>
          <Card>
            <div className={styles.vitalRow}>
              <div className={styles.vitalInfo}>
                <Icon name="heart" size={18} className={styles.vitalIcon} />
                <span className={styles.vitalLabel}>Blood Pressure</span>
              </div>
              <span className={styles.vitalValue}>120/80</span>
            </div>
            <div className={styles.vitalRow}>
              <div className={styles.vitalInfo}>
                <Icon name="heart" size={18} className={styles.vitalIcon} />
                <span className={styles.vitalLabel}>Heart Rate</span>
              </div>
              <span className={styles.vitalValue}>72 bpm</span>
            </div>
          </Card>
          <Link to="/health-logs" className={styles.viewHistoryLink}>View Full History</Link>
        </section>
      </div>

      <aside className={styles.rightSidebar}>
        <Card className={styles.appointmentCard}>
          <div className={styles.appointmentHeader}>
            <h3 className={styles.appointmentTitle}>Next Appointment</h3>
            <Badge variant="info">THERAPY</Badge>
          </div>
          <p className={styles.appointmentType}>Check-up</p>
          <h4 className={styles.appointmentName}>Knee rehabilitation session</h4>
          <div className={styles.appointmentMeta}>
            <Icon name="calendar" size={14} />
            <span>2026-01-26 at 10:00 AM</span>
          </div>
          <p className={styles.appointmentProvider}>Dr. Lisa Chen, PT</p>
          <Button variant="outline" size="sm" fullWidth>
            Set Reminder
          </Button>
        </Card>

        <Card className={styles.careTeamCard}>
          <div className={styles.careTeamIcon}>
            <Icon name="heart" size={20} />
          </div>
          <h3 className={styles.careTeamTitle}>Your care team is here for you</h3>
          <p className={styles.careTeamText}>
            Need help or have questions? Reach out anytime.
          </p>
          <Link to="/messages">
            <Button variant="primary" size="sm">
              Send Message
            </Button>
          </Link>
        </Card>

        <div>
          <SectionHeader
            title="Recent Wellness Check"
            actionLabel="View All →"
            onAction={() => {}}
          />
          <Card>
            <div className={styles.wellnessCheckItem}>
              <Icon name="smile" size={18} className={styles.wellnessCheckIcon} />
              <div>
                <p className={styles.wellnessCheckTitle}>Mood Check</p>
                <p className={styles.wellnessCheckDetail}>Feeling good today</p>
                <p className={styles.wellnessCheckDate}>Jan 25, 1:14 PM</p>
              </div>
            </div>
          </Card>
        </div>
      </aside>
    </div>
  );
}
