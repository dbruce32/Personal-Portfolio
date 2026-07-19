'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar/Navbar';
import styles from './page.module.css';

const contacts = [
  { command: 'email', label: 'dylanbruce.cs@gmail.com', href: 'mailto:dylanbruce.cs@gmail.com', icon: 'fas fa-envelope' },
  { command: 'linkedin', label: 'linkedin.com/in/dylangbruce', href: 'https://www.linkedin.com/in/dylangbruce', icon: 'fab fa-linkedin' },
  { command: 'github', label: 'github.com/dbruce32', href: 'https://github.com/dbruce32', icon: 'fab fa-github' },
];

const responses: Record<string, string> = {
  help: 'Available commands: email, linkedin, github, about, clear',
  about: 'CS + Math @ Georgia Tech. Building software, analyzing data, always learning.',
  email: '→ dylanbruce.cs@gmail.com',
  linkedin: '→ linkedin.com/in/dylangbruce',
  github: '→ github.com/dbruce32',
};

interface HistoryEntry {
  input: string;
  output: string;
  link?: string;
}

export default function ContactPage() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryEntry[]>([
    { input: '', output: 'Type "help" to see available commands.' },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();

    if (cmd === 'clear') {
      setHistory([{ input: '', output: 'Type "help" to see available commands.' }]);
      setInput('');
      return;
    }

    const contact = contacts.find((c) => c.command === cmd);
    const output = responses[cmd] || `Command not found: "${cmd}". Type "help" for options.`;
    const link = contact?.href;

    setHistory((prev) => [...prev, { input: cmd, output, link }]);
    setInput('');

    if (link) {
      window.open(link, cmd === 'email' ? '_self' : '_blank');
    }
  };

  return (
    <div className={styles.body}>
      <Navbar />

      <div className={styles.content}>
        <section className={styles.intro}>
          <h1 className={styles.title}>Contact</h1>
          <p className={styles.subtitle}>Let&apos;s connect. Use the terminal below or the links on the side.</p>
        </section>

        <div className={styles.layout}>
          {/* Terminal */}
          <div className={styles.terminal}>
            <div className={styles.terminalHeader}>
              <span className={styles.dot} data-color="red"></span>
              <span className={styles.dot} data-color="yellow"></span>
              <span className={styles.dot} data-color="green"></span>
              <span className={styles.terminalTitle}>dylan@portfolio ~ contact</span>
            </div>
            <div className={styles.terminalBody}>
              {history.map((entry, i) => (
                <div key={i} className={styles.historyEntry}>
                  {entry.input && (
                    <div className={styles.inputLine}>
                      <span className={styles.prompt}>$</span> {entry.input}
                    </div>
                  )}
                  <div className={styles.outputLine}>
                    {entry.link ? (
                      <a href={entry.link} target="_blank" rel="noopener noreferrer" className={styles.outputLink}>
                        {entry.output}
                      </a>
                    ) : (
                      entry.output
                    )}
                  </div>
                </div>
              ))}
              <form onSubmit={handleSubmit} className={styles.inputForm}>
                <span className={styles.prompt}>$</span>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className={styles.inputField}
                  autoFocus
                  spellCheck={false}
                  aria-label="Terminal input"
                />
              </form>
            </div>
          </div>

          {/* Quick links sidebar */}
          <aside className={styles.sidebar}>
            {contacts.map((c) => (
              <a
                key={c.command}
                href={c.href}
                target={c.command === 'email' ? '_self' : '_blank'}
                rel="noopener noreferrer"
                className={styles.quickLink}
              >
                <i className={`${c.icon} ${styles.quickIcon}`}></i>
                <span className={styles.quickLabel}>{c.label}</span>
              </a>
            ))}
          </aside>
        </div>
      </div>
    </div>
  );
}
