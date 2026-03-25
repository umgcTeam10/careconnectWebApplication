import { useState } from 'react';
import styles from './Profile.module.css';
import Card from '../components/Card';
import Button from '../components/Button';
import Icon from '../components/Icon';

export default function Profile() {
  const [pushNotif, setPushNotif] = useState(true);
  const [emailNotif, setEmailNotif] = useState(true);
  const [taskReminders, setTaskReminders] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [timeFormat, setTimeFormat] = useState('12h');

  return (
    <div className={styles.profile}>
      <div className={styles.leftColumn}>
        <Card>
          <div className={styles.avatarSection}>
            <p className={styles.sectionLabel}>User Profile</p>
            <div className={styles.avatar} aria-hidden="true">Rt</div>
            <h2 className={styles.name}>Sarah Johnson</h2>
            <p className={styles.role}>Care recipient</p>
            <Button variant="outline" size="sm" className={styles.editBtn}>
              Edit Profile
            </Button>
          </div>
        </Card>

        <Card className={styles.infoCard}>
          <h3 className={styles.cardTitle}>Contact Information</h3>
          <div className={styles.contactRow}>
            <Icon name="mail" size={16} />
            <span>sarah.johnson@email.com</span>
          </div>
          <div className={styles.contactRow}>
            <Icon name="phone" size={16} />
            <span>(555) 123-4567</span>
          </div>
          <div className={styles.contactRow}>
            <Icon name="home" size={16} />
            <span>123 Main St, City, ST</span>
          </div>
        </Card>

        <Card className={styles.infoCard}>
          <h3 className={styles.cardTitle}>Account Statistics</h3>
          <dl className={styles.infoList}>
            <div className={styles.infoItem}>
              <dt className={styles.infoLabel}>Member since</dt>
              <dd className={styles.infoValue}>January 2024</dd>
            </div>
            <div className={styles.infoItem}>
              <dt className={styles.infoLabel}>Active days</dt>
              <dd className={styles.infoValue}>45 days</dd>
            </div>
            <div className={styles.infoItem}>
              <dt className={styles.infoLabel}>Tasks completed</dt>
              <dd className={styles.infoValue}>128</dd>
            </div>
          </dl>
        </Card>
      </div>

      <div className={styles.rightColumn}>
        <div className={styles.settingsHeader}>
          <h2 className={styles.settingsTitle}>Settings</h2>
          <div className={styles.settingsSearch}>
            <Icon name="search" size={16} className={styles.searchIcon} />
            <input type="search" placeholder="Search settings (Ctrl+I)" className={styles.searchInput} />
          </div>
        </div>

        <Card>
          <h3 className={styles.cardTitle}>Notifications</h3>
          <p className={styles.cardSubtitle}>Manage your notification settings</p>
          <div className={styles.toggleGrid}>
            <div className={styles.toggleItem}>
              <label className={styles.toggleLabel}>
                <span className={styles.toggleSwitch}>
                  <input type="checkbox" checked={pushNotif} onChange={() => setPushNotif(!pushNotif)} />
                  <span className={styles.slider}></span>
                </span>
                <span>Push Notifications</span>
              </label>
              <p className={styles.toggleDesc}>Receive push notifications</p>
            </div>
            <div className={styles.toggleItem}>
              <label className={styles.toggleLabel}>
                <span className={styles.toggleSwitch}>
                  <input type="checkbox" checked={emailNotif} onChange={() => setEmailNotif(!emailNotif)} />
                  <span className={styles.slider}></span>
                </span>
                <span>Email Notifications</span>
              </label>
              <p className={styles.toggleDesc}>Receive email updates</p>
            </div>
            <div className={styles.toggleItem}>
              <label className={styles.toggleLabel}>
                <span className={styles.toggleSwitch}>
                  <input type="checkbox" checked={taskReminders} onChange={() => setTaskReminders(!taskReminders)} />
                  <span className={styles.slider}></span>
                </span>
                <span>Task Reminders</span>
              </label>
              <p className={styles.toggleDesc}>Remind me about daily tasks</p>
            </div>
          </div>
          <div className={styles.quietHours}>
            <label className={styles.toggleLabel}>
              <span className={styles.toggleSwitch}>
                <input type="checkbox" />
                <span className={styles.slider}></span>
              </span>
              <span>Quiet Hours</span>
            </label>
            <p className={styles.toggleDesc}>10:00 PM - 7:00 AM</p>
          </div>
        </Card>

        <Card>
          <h3 className={styles.cardTitle}>Preferences</h3>
          <p className={styles.cardSubtitle}>Customize your CareConnect experience</p>
          <div className={styles.prefGrid}>
            <div className={styles.prefItem}>
              <label className={styles.toggleLabel}>
                <span className={styles.toggleSwitch}>
                  <input type="checkbox" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
                  <span className={styles.slider}></span>
                </span>
                <span>Dark Mode</span>
              </label>
              <p className={styles.toggleDesc}>Currently disabled</p>
            </div>
            <div className={styles.prefItem}>
              <div>
                <span className={styles.prefLabel}>Language</span>
                <p className={styles.toggleDesc}>English</p>
              </div>
            </div>
            <div className={styles.prefItem}>
              <div>
                <span className={styles.prefLabel}>Time Format</span>
                <div className={styles.formatToggle}>
                  <button
                    type="button"
                    className={`${styles.formatBtn} ${timeFormat === '12h' ? styles.formatActive : ''}`}
                    onClick={() => setTimeFormat('12h')}
                  >12h</button>
                  <button
                    type="button"
                    className={`${styles.formatBtn} ${timeFormat === '24h' ? styles.formatActive : ''}`}
                    onClick={() => setTimeFormat('24h')}
                  >24h</button>
                </div>
              </div>
            </div>
            <div className={styles.prefItem}>
              <div>
                <span className={styles.prefLabel}>Date Format</span>
                <p className={styles.toggleDesc}>MM/DD/YYYY</p>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className={styles.cardTitle}>Accessibility</h3>
          <p className={styles.cardSubtitle}>Adjust settings for better usability</p>
          <div className={styles.textSizeRow}>
            <span className={styles.textSizeLabel}>Text Size</span>
            <div className={styles.textSizeSlider}>
              <span className={styles.textSizeSmall}>A Small</span>
              <input type="range" min="1" max="5" defaultValue="3" className={styles.rangeInput} />
              <span className={styles.textSizeLarge}>A Large</span>
            </div>
          </div>
          <div className={styles.sizeLabels}>
            <span>Normal</span>
            <span></span>
            <span>Max</span>
          </div>
        </Card>

        <button type="button" className={styles.logoutBtn}>
          <Icon name="lock" size={18} />
          Logout
        </button>
      </div>
    </div>
  );
}
