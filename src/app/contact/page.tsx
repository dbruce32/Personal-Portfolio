'use client';

import { useEffect, useRef, useState } from 'react';
import Navbar from '@/components/Navbar/Navbar';
import LiveClock from '@/components/LiveClock/LiveClock';
import styles from './page.module.css';

const contacts = [
  { command: 'email', kind: 'Email', label: 'dylanbruce.cs@gmail.com', icon: 'fas fa-envelope', href: 'mailto:dylanbruce.cs@gmail.com' },
  { command: 'linkedin', kind: 'LinkedIn', label: 'dylangbruce', icon: 'fab fa-linkedin', href: 'https://www.linkedin.com/in/dylangbruce' },
  { command: 'github', kind: 'GitHub', label: 'dbruce32', icon: 'fab fa-github', href: 'https://github.com/dbruce32' },
];

const responses: Record<string, string> = {
  help: 'Available commands: email, linkedin, github, about, clear',
  about: 'CS + Math @ Georgia Tech. Building software, analyzing data, always learning.',
  email: '→ dylanbruce.cs@gmail.com',
  linkedin: '→ linkedin.com/in/dylangbruce',
  github: '→ github.com/dbruce32',
};

const WELCOME = 'Type "help" to see available commands.';

interface HistoryEntry {
  input: string;
  output: string;
  link?: string;
}

export default function ContactPage() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryEntry[]>([{ input: '', output: WELCOME }]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus the terminal on load like before, but only with a mouse/trackpad,
  // so phones don't scroll down and pop open the keyboard.
  useEffect(() => {
    if (typeof window.matchMedia === 'function' && window.matchMedia('(pointer: fine)').matches) {
      inputRef.current?.focus({ preventScroll: true });
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === 'clear') {
      setHistory([{ input: '', output: WELCOME }]);
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
          <p className={styles.lede}>
            Happy to talk about roles, research, or anything on this site. Email is the quickest way to reach me.
          </p>
        </section>

        {/* Channels: a ruled list set in large type */}
        <section aria-label="Contact channels">
          <ul className={styles.channels}>
            {contacts.map((c) => (
              <li key={c.command}>
                <a
                  href={c.href}
                  target={c.command === 'email' ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  className={styles.channel}
                >
                  <span className={styles.channelKind}>{c.kind}</span>
                  <span className={styles.channelValue}>
                    <i className={`${c.icon} ${styles.channelIcon}`} aria-hidden="true"></i>
                    <span className={styles.channelLabel}>{c.label}</span>
                  </span>
                  <span className={styles.channelArrow} aria-hidden="true">
                    {c.command === 'email' ? '→' : '↗'}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <div className={styles.local}>
            <span className={styles.localLabel}>Local time</span>
            <LiveClock />
          </div>
        </section>

        {/* Command line: the macOS-style terminal window */}
        <section className={styles.shell} aria-labelledby="shell-title">
          <h2 id="shell-title" className={styles.shellTitle}>Prefer the command line?</h2>
          <div className={styles.terminal}>
            <div className={styles.terminalHeader}>
              <span className={styles.dot} data-color="red"></span>
              <span className={styles.dot} data-color="yellow"></span>
              <span className={styles.dot} data-color="green"></span>
              <span className={styles.terminalTitle}>dylan@portfolio ~ contact</span>
            </div>
            <div className={styles.terminalBody} role="log" aria-live="polite" aria-label="Terminal output">
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
              <form onSubmit={handleSubmit} className={styles.inputForm} aria-label="Terminal command input">
                <span className={styles.prompt}>$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className={styles.inputField}
                  spellCheck={false}
                  autoCapitalize="off"
                  autoComplete="off"
                  aria-label="Terminal input"
                />
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
