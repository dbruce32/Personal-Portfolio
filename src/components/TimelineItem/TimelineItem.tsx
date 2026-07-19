import styles from './TimelineItem.module.css';

interface TimelineItemProps {
  date: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
}

export default function TimelineItem({ date, title, subtitle, description, icon }: TimelineItemProps) {
  return (
    <div className={styles.timelineItem}>
      <div className={styles.timelineIcon}>
        <i className={icon}></i>
      </div>
      <div className={styles.timelineContent}>
        <span className={styles.timelineDate}>{date}</span>
        <h3 className={styles.timelineTitle}>{title}</h3>
        <p className={styles.timelineSubtitle}>{subtitle}</p>
        <p className={styles.timelineDescription}>{description}</p>
      </div>
    </div>
  );
}
