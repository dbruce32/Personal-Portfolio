'use client';

import { useEffect, useMemo, useState } from 'react';
import styles from './SectionNav.module.css';

export interface SectionNavItem {
  id: string;
  title: string;
  /** Optional sub-sections, shown indented under their parent. */
  children?: SectionNavItem[];
}

interface SectionNavProps {
  sections: SectionNavItem[];
  /** Accessible name for the nav landmark, e.g. "Project sections". */
  ariaLabel: string;
  label?: string;
}

// A section counts as "current" once its top passes this line below the viewport top.
const ACTIVE_LINE = 140;

/**
 * "On this page" index. Sits in a sticky right-hand gutter on wide screens and
 * collapses to a row of tabs on narrow ones (the page decides where it sits).
 * Highlights the section you're reading, supports one level of sub-sections,
 * and scrolls smoothly on click.
 */
export default function SectionNav({ sections, ariaLabel, label = 'On this page' }: SectionNavProps) {
  // Every id in document order: parent first, then its children.
  const order = useMemo(
    () => sections.flatMap((s) => [s.id, ...(s.children ?? []).map((c) => c.id)]),
    [sections]
  );
  const [active, setActive] = useState(order[0]);

  // Runs directly on scroll (it's only a handful of getBoundingClientRect calls),
  // so it stays accurate even where animation frames are throttled.
  useEffect(() => {
    const update = () => {
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      let current = order[0];
      for (const id of order) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= ACTIVE_LINE) current = id;
      }
      if (atBottom) current = order[order.length - 1];
      setActive(current);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [order]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    const reduceMotion =
      typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    history.replaceState(null, '', `#${id}`);
    setActive(id);
  };

  const link = (item: SectionNavItem, className: string, isActive: boolean) => (
    <a
      href={`#${item.id}`}
      onClick={(e) => handleClick(e, item.id)}
      className={`${className} ${isActive ? styles.active : ''}`}
      aria-current={isActive ? 'location' : undefined}
    >
      {item.title}
    </a>
  );

  return (
    <nav aria-label={ariaLabel}>
      <p className={styles.label}>{label}</p>
      <ul className={styles.list}>
        {sections.map((item) => {
          const childActive = item.children?.some((c) => c.id === active) ?? false;
          return (
            <li key={item.id} className={childActive ? styles.within : undefined}>
              {link(item, styles.link, active === item.id)}
              {item.children && item.children.length > 0 && (
                <ul className={styles.subList}>
                  {item.children.map((child) => (
                    <li key={child.id}>{link(child, styles.subLink, active === child.id)}</li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
