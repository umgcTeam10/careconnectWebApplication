import { useState } from 'react';
import styles from './Calendar.module.css';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Icon from '../components/Icon';
import { calendarEvents } from '../data/mockData';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function generateCalendarDays(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const days = [];

  for (let i = firstDay - 1; i >= 0; i--) {
    days.push({ day: daysInPrevMonth - i, isCurrentMonth: false });
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({ day: i, isCurrentMonth: true });
  }
  const remaining = 42 - days.length;
  for (let i = 1; i <= remaining; i++) {
    days.push({ day: i, isCurrentMonth: false });
  }

  return days;
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export default function Calendar() {
  const [currentDate] = useState(new Date(2026, 0, 26));
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const selectedDay = currentDate.getDate();
  const days = generateCalendarDays(year, month);

  return (
    <div className={styles.calendar}>
      <section aria-labelledby="calendar-heading">
        <h2 id="calendar-heading" className={styles.pageTitle}>
          Calendar Overview
        </h2>
        <p className={styles.subtitle}>View your schedule and upcoming appointments</p>

        <Card padding="md" className={styles.calendarCard}>
          <div className={styles.calendarNav}>
            <button type="button" aria-label="Previous month" className={styles.navBtn}>
              <Icon name="chevronLeft" size={20} />
            </button>
            <span className={styles.monthYear}>
              {MONTH_NAMES[month]} {year}
            </span>
            <button type="button" aria-label="Next month" className={styles.navBtn}>
              <Icon name="chevronRight" size={20} />
            </button>
          </div>

          <div className={styles.dayHeaders} role="row">
            {DAYS.map((d) => (
              <span key={d} className={styles.dayHeader} role="columnheader">
                {d}
              </span>
            ))}
          </div>

          <div className={styles.daysGrid} role="grid" aria-label="Calendar days">
            {days.map((d, i) => (
              <button
                key={i}
                type="button"
                className={`${styles.dayCell} ${
                  !d.isCurrentMonth ? styles.otherMonth : ''
                } ${d.day === selectedDay && d.isCurrentMonth ? styles.selectedDay : ''}`}
                aria-label={
                  d.isCurrentMonth
                    ? `${MONTH_NAMES[month]} ${d.day}`
                    : `${d.day}`
                }
                aria-current={
                  d.day === selectedDay && d.isCurrentMonth ? 'date' : undefined
                }
              >
                {d.day}
              </button>
            ))}
          </div>
        </Card>
      </section>

      <section aria-labelledby="schedule-heading" className={styles.section}>
        <h2 id="schedule-heading" className={styles.scheduleTitle}>
          Schedule for Monday, Jan {selectedDay}
        </h2>

        <ul className={styles.eventList}>
          {calendarEvents.map((event) => (
            <li key={event.id}>
              <Card className={styles.eventCard}>
                <div className={styles.eventIcon}>
                  <Icon name="clock" size={18} />
                </div>
                <div className={styles.eventContent}>
                  <h3 className={styles.eventTitle}>{event.title}</h3>
                  <p className={styles.eventDesc}>{event.description}</p>
                  <p className={styles.eventTime}>{event.time}</p>
                  {event.provider && (
                    <p className={styles.eventProvider}>{event.provider}</p>
                  )}
                  <Badge variant={event.status === 'SCHEDULED' ? 'primary' : 'success'}>
                    {event.status}
                  </Badge>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
