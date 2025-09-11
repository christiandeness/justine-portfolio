import React from "react";
import ProjectCard from "../components/ProjectCard";
import "../section-styles/Projects.css";

export default function Projects({ projects }) {
  return (
    <section className="projects">
      <h2>Projects 📂</h2>
      <div className="projects-grid">
        {projects.map((proj, i) => (
          <ProjectCard
            key={i}
            title={proj.title}
            description={proj.description}
            image={proj.image}
            link={proj.link}
          />
        ))}
      </div>
    </section>
  );
}
