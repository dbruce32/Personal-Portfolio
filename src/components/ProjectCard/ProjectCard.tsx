import styles from './ProjectCard.module.css';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  links: { label: string; href: string; icon: string }[];
  className?: string;
}

export default function ProjectCard({ title, description, tags, links, className }: ProjectCardProps) {
  return (
    <div className={`${styles.projectCard} ${className || ''}`}>
      <div className={styles.projectContent}>
        <h3 className={styles.projectTitle}>{title}</h3>
        <p className={styles.projectDescription}>{description}</p>
        <div className={styles.skillsUsed}>
          {tags.map((tag) => (
            <span key={tag} className={styles.skillTag}>{tag}</span>
          ))}
        </div>
        {links.length > 0 && (
          <div className={styles.projectLinks}>
            {links.map((link) => (
              <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className={styles.projectLink}>
                <i className={link.icon}></i> {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
