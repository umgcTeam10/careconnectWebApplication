import { useState } from 'react';
import styles from './Messages.module.css';
import Icon from '../components/Icon';
import Button from '../components/Button';
import { messages, quickReplies } from '../data/mockData';

const contacts = [
  { id: 1, name: 'Robert Martinez', initials: 'RM', lastMessage: 'Morning walk completed...', time: 'Now', active: true },
  { id: 2, name: 'Dr. Smith', initials: 'DS', lastMessage: 'Appointment reminder...', time: '2024-09-14', active: false },
  { id: 3, name: 'CareConnect', initials: 'CC', lastMessage: 'Weekly summary...', time: 'Nov 04 AM', active: false },
];

const quickContactAvatars = [
  { name: 'Sarah', role: 'Caregiver', initials: 'SJ', color: '#b45309' },
  { name: 'Dr. Martinez', role: 'Physician', initials: 'DM', color: '#15803d' },
  { name: 'Nurse Chen', role: 'Nurse', initials: 'NC', color: '#dc2626' },
];

const sharedFiles = [
  { name: 'Lab_Results_Dec.pdf', date: '4.2 MB · Yesterday' },
  { name: 'Prescription_Refill.jpg', date: '1.8 MB · Dec 10' },
  { name: 'Exercise_Plan.v2.docx', date: '512 KB · Nov 28' },
];

export default function Messages() {
  const [inputValue, setInputValue] = useState('');
  const conversation = messages[0];

  return (
    <div className={styles.messages}>
      {/* Left contacts panel */}
      <aside className={styles.contactsPanel}>
        <div className={styles.quickContacts}>
          <p className={styles.quickContactLabel}>QUICK CONTACT</p>
          <div className={styles.quickContactAvatars}>
            {quickContactAvatars.map((c) => (
              <button key={c.name} className={styles.quickContactBtn} type="button" title={c.name}>
                <span className={styles.quickContactAvatar} style={{ backgroundColor: c.color }}>{c.initials}</span>
                <span className={styles.quickContactName}>{c.name}</span>
                <span className={styles.quickContactRole}>{c.role}</span>
              </button>
            ))}
          </div>
        </div>
        <div className={styles.contactSearch}>
          <Icon name="search" size={16} className={styles.contactSearchIcon} />
          <input type="search" placeholder="Search messages..." className={styles.contactSearchInput} aria-label="Search messages" />
        </div>
        <ul className={styles.contactList}>
          {contacts.map((contact) => (
            <li key={contact.id} className={`${styles.contactItem} ${contact.active ? styles.contactActive : ''}`}>
              <div className={styles.contactAvatar}>{contact.initials}</div>
              <div className={styles.contactDetails}>
                <span className={styles.contactName}>{contact.name}</span>
                <span className={styles.contactLastMsg}>{contact.lastMessage}</span>
              </div>
              <span className={styles.contactTime}>{contact.time}</span>
            </li>
          ))}
        </ul>
      </aside>

      {/* Center chat area */}
      <section className={styles.chatContainer} aria-labelledby="chat-heading">
        <div className={styles.chatHeader}>
          <div className={styles.contactInfo}>
            <div className={styles.avatar} aria-hidden="true">
              {conversation.from.charAt(0)}
            </div>
            <div>
              <h2 id="chat-heading" className={styles.chatContactName}>
                {conversation.from}
              </h2>
              {conversation.isOnline && (
                <span className={styles.onlineStatus}>Active now</span>
              )}
            </div>
          </div>
          <div className={styles.chatActions}>
            <button type="button" aria-label="Voice call">
              <Icon name="phone" size={20} />
            </button>
            <button type="button" aria-label="Video call">
              <Icon name="video" size={20} />
            </button>
            <button type="button" aria-label="More options">
              <Icon name="moreVertical" size={20} />
            </button>
          </div>
        </div>

        <div className={styles.messageList} role="log" aria-label="Message history">
          {conversation.messages.map((msg) => (
            <div
              key={msg.id}
              className={`${styles.message} ${
                msg.sender === 'user' ? styles.sent : styles.received
              }`}
            >
              <p className={styles.messageText}>{msg.text}</p>
            </div>
          ))}
          <p className={styles.typing} aria-live="polite">Robert is typing...</p>
        </div>

        <div className={styles.quickReplies}>
          {quickReplies.map((reply) => (
            <button key={reply} type="button" className={styles.quickReply}>
              {reply}
            </button>
          ))}
        </div>

        <form
          className={styles.inputBar}
          onSubmit={(e) => {
            e.preventDefault();
            setInputValue('');
          }}
        >
          <button type="button" aria-label="Attach file" className={styles.attachBtn}>
            <Icon name="plus" size={20} />
          </button>
          <button type="button" aria-label="Emoji" className={styles.attachBtn}>
            <Icon name="smile" size={20} />
          </button>
          <label htmlFor="message-input" className="visually-hidden">
            Type your message
          </label>
          <input
            id="message-input"
            type="text"
            className={styles.input}
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button variant="primary" size="sm" type="submit">Send</Button>
        </form>
      </section>

      {/* Right details panel */}
      <aside className={styles.detailsPanel}>
        <button type="button" className={styles.emergencyBtn}>EMERGENCY SOS</button>

        <div className={styles.detailSection}>
          <p className={styles.detailMuted}>Immediately contact emergency services</p>
        </div>

        <div className={styles.detailSection}>
          <h4 className={styles.detailTitle}>Upcoming Reminder</h4>
          <p className={styles.detailBold}>Physical Therapy Starts in 30 minutes</p>
          <p className={styles.detailMuted}>Reminder: Physical therapy appointment at 2:00 PM</p>
          <div className={styles.reminderActions}>
            <button type="button" className={styles.linkBtn}>Acknowledge</button>
            <button type="button" className={styles.linkBtn}>Snooze</button>
          </div>
        </div>

        <div className={styles.detailSection}>
          <h4 className={styles.detailTitle}>Shared Files</h4>
          {sharedFiles.map((file) => (
            <div key={file.name} className={styles.fileItem}>
              <p className={styles.fileName}>{file.name}</p>
              <p className={styles.fileMeta}>{file.date}</p>
            </div>
          ))}
        </div>

        <div className={styles.detailSection}>
          <div className={styles.detailRow}>
            <h4 className={styles.detailTitle}>Scheduled Messages</h4>
            <Icon name="clock" size={16} />
          </div>
        </div>

        <div className={styles.detailSection}>
          <button type="button" className={styles.linkBtn}>Mute Notifications</button>
        </div>
        <div className={styles.detailSection}>
          <button type="button" className={styles.linkBtnDanger}>Block Contact</button>
        </div>
      </aside>
    </div>
  );
}
