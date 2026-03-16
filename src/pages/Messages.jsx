import { useState } from 'react';
import styles from './Messages.module.css';
import Icon from '../components/Icon';
import { messages, quickReplies } from '../data/mockData';

export default function Messages() {
  const [inputValue, setInputValue] = useState('');
  const conversation = messages[0];

  return (
    <div className={styles.messages}>
      <section className={styles.chatContainer} aria-labelledby="chat-heading">
        <div className={styles.chatHeader}>
          <div className={styles.contactInfo}>
            <div className={styles.avatar} aria-hidden="true">
              {conversation.from.charAt(0)}
            </div>
            <div>
              <h2 id="chat-heading" className={styles.contactName}>
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
          <p className={styles.typing}>Robert is typing...</p>
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
        </form>
      </section>
    </div>
  );
}
