import React from "react";
import "../component-styles/ProjectCard.css";

export default function ProjectCard({ title, description, image, link }) {
  return (
    <div className="project-card">
      {image && <img src={image} alt={title} className="project-image" />}
      <h3 className="project-title">{title}</h3>
      <p className="project-description">{description}</p>
      {link && (
        <a href={link} target="_blank" rel="noreferrer" className="project-link">
          View Project
        </a>
      )}
    </div>
  );
}
