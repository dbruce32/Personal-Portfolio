'use client';

import { useState, useEffect } from 'react';
import styles from './LiveClock.module.css';

export default function LiveClock() {
  const [time, setTime] = useState<string>('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const update = () => {
      const now = new Date();
      const formatted = now.toLocaleTimeString('en-US', {
        timeZone: 'America/New_York',
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      setTime(formatted);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <div className={styles.clock}>
      <span className={styles.dot}></span>
      <span className={styles.time}>{time}</span>
      <span className={styles.label}>Atlanta, GA</span>
    </div>
  );
}
