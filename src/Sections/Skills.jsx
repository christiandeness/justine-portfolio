import React from "react";
import "../section-styles/Skills.css";

const skills = [
  "JavaScript", "React", "HTML", "CSS", "Node.js", "Python", 
  "Git", "Figma", "TypeScript", "Redux", "Next.js", "Express.js",
  "MongoDB", "SQL", "Tailwind CSS", "Sass", "Webpack", "REST APIs",
  "GraphQL", "Docker", "Jest", "Cypress", "Photoshop", "Illustrator",
  "Responsive Design", "Accessibility (a11y)"
];

export default function SkillsSection() {
  return (
    <section className="skills">
      <h2>Skills 🛠️</h2>
      <div className="skills-grid">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="skill-badge"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}