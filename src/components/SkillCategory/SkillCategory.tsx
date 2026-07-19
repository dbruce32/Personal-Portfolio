import styles from './SkillCategory.module.css';

interface Skill {
  name: string;
  description: string;
  icon: string;
}

interface SkillCategoryProps {
  title: string;
  titleIcon: string;
  skills: Skill[];
}

export default function SkillCategory({ title, titleIcon, skills }: SkillCategoryProps) {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>
        <i className={titleIcon}></i> {title}
      </h2>
      <div className={styles.skillsContainer}>
        {skills.map((skill) => (
          <div key={skill.name} className={styles.skillItem}>
            <h3 className={styles.skillName}>
              <i className={skill.icon}></i> {skill.name}
            </h3>
            <p className={styles.skillDescription}>{skill.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
