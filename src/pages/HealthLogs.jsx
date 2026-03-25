import { useState } from 'react';
import styles from './HealthLogs.module.css';
import Card from '../components/Card';
import SectionHeader from '../components/SectionHeader';
import Button from '../components/Button';
import Badge from '../components/Badge';
import Icon from '../components/Icon';
import { healthLogsSummary, weeklyActivity, recentLogs } from '../data/mockData';

const FILTERS = ['All', 'Vitals', 'Meals', 'Mood'];

const TYPE_BADGE_MAP = {
  vitals: { variant: 'info', label: 'VITALS' },
  lab: { variant: 'success', label: 'LAB' },
  wellness: { variant: 'primary', label: 'WELLNESS' },
};

export default function HealthLogs() {
  const [activeFilter, setActiveFilter] = useState('All');

  return (
    <div className={styles.healthLogs}>
      <div className={styles.leftColumn}>
        <section aria-labelledby="summary-heading">
          <Card padding="lg">
            <div className={styles.summaryHeader}>
              <h2 id="summary-heading" className={styles.sectionTitle}>
                Health Summary
              </h2>
              <button type="button" className={styles.viewReport}>
                View Report
              </button>
            </div>

            <div className={styles.summaryGrid}>
              <div className={styles.summaryItem}>
                <Icon name="activity" size={18} className={styles.summaryIcon} />
                <p className={styles.summaryLabel}>BP Today</p>
                <p className={styles.summaryValue}>{healthLogsSummary.bpToday}</p>
                <p className={styles.summaryUnit}>{healthLogsSummary.bpUnit}</p>
              </div>
              <div className={styles.summaryItem}>
                <Icon name="checkCircle" size={18} className={styles.summaryIconGreen} />
                <p className={styles.summaryLabel}>Walks</p>
                <p className={styles.summaryValue}>{healthLogsSummary.walks}</p>
                <p className={styles.summaryUnit}>{healthLogsSummary.walksLabel}</p>
              </div>
              <div className={styles.summaryItem}>
                <Icon name="heart" size={18} className={styles.summaryIconGreen} />
                <p className={styles.summaryLabel}>Meals</p>
                <p className={styles.summaryValue}>{healthLogsSummary.meals}</p>
                <p className={styles.summaryUnit}>{healthLogsSummary.mealsUnit}</p>
              </div>
              <div className={styles.summaryItem}>
                <Icon name="smile" size={18} className={styles.summaryIconOrange} />
                <p className={styles.summaryLabel}>Mood</p>
                <p className={styles.summaryValue}>{healthLogsSummary.mood}</p>
                <p className={styles.summaryUnit}>{healthLogsSummary.moodLabel}</p>
              </div>
            </div>
          </Card>
        </section>

        <section aria-labelledby="filters-heading" className={styles.section}>
          <h3 id="filters-heading" className={styles.filtersLabel}>Filters</h3>
          <div className={styles.filters} role="group" aria-label="Log type filters">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                className={`${styles.filterBtn} ${activeFilter === f ? styles.activeFilter : ''}`}
                onClick={() => setActiveFilter(f)}
                aria-pressed={activeFilter === f}
              >
                {f}
              </button>
            ))}
          </div>
        </section>

        <section aria-labelledby="activity-heading" className={styles.section}>
          <div className={styles.activityHeader}>
            <h3 id="activity-heading" className={styles.activityTitle}>
              Weekly Activity
            </h3>
            <span className={styles.activityMeta}>6/7 Days</span>
          </div>
          <div className={styles.activityChart} aria-label="Weekly activity chart">
            {weeklyActivity.map((d) => (
              <div key={d.day} className={styles.activityDay}>
                <div
                  className={styles.activityBar}
                  style={{
                    backgroundColor:
                      d.level === 0
                        ? 'var(--color-border)'
                        : 'var(--color-navy)',
                    opacity: d.level === 0 ? 1 : 0.3 + d.level * 0.23,
                  }}
                  aria-label={`${d.day}: activity level ${d.level}`}
                />
                <span className={styles.activityLabel}>{d.day}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className={styles.rightColumn}>
        <section aria-labelledby="recent-heading" className={styles.section}>
          <div className={styles.recentHeader}>
            <h2 id="recent-heading" className={styles.sectionTitle}>Recent Logs</h2>
            <div className={styles.recentActions}>
              <div className={styles.search}>
                <Icon name="search" size={18} className={styles.searchIcon} />
                <input
                  type="search"
                  placeholder="Search logs... (Ctrl+F)"
                  className={styles.searchInput}
                  aria-label="Search health logs"
                />
              </div>
              <Button variant="primary" size="sm">
                <Icon name="plus" size={16} /> New Log
              </Button>
            </div>
          </div>

          <div className={styles.entriesHeader}>
            <span className={styles.entriesLabel}>Entries</span>
            <Badge variant="primary">{recentLogs.length}</Badge>
          </div>

          <ul className={styles.logList}>
            {recentLogs.map((log) => {
              const badge = TYPE_BADGE_MAP[log.type] || { variant: 'info', label: log.type.toUpperCase() };
              return (
                <li key={log.id}>
                  <Card className={styles.logCard}>
                    <div className={styles.logDot} />
                    <div className={styles.logContent}>
                      <div className={styles.logHeader}>
                        <h3 className={styles.logTitle}>{log.title}</h3>
                        <Badge variant={badge.variant}>{badge.label}</Badge>
                      </div>
                      <p className={styles.logDate}>
                        {log.date} &middot; {log.details}
                      </p>
                      {log.values && (
                        <p className={styles.logMeta}>
                          Systolic: {log.values.systolic} &middot; Diastolic: {log.values.diastolic} &middot; Heart Rate: {log.values.heartRate}
                        </p>
                      )}
                      {log.reading && (
                        <p className={styles.logReading}>{log.reading}</p>
                      )}
                      {log.notes && (
                        <p className={styles.logNotes}>{log.notes}</p>
                      )}
                    </div>
                  </Card>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </div>
  );
}
