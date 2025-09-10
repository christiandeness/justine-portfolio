import React from "react";
import { Facebook, Linkedin, Github } from "lucide-react";
import "../section-styles/About.css";

export default function About() {
  return (
    <section className="about">
      <div className="about-container">
        <div className="about-photo">
          <img src="src/assets/image copy.png" alt="Me" />
        </div>
        <div className="about-text">
          <h2 className="about-name">JUSTINE ANGELO A. DE VERA</h2>
          <p className="about-description">
            I’m a web developer 💻 passionate about building modern,
            user-friendly apps. I focus on clean UI 🎨, smooth user
            experiences ✨, and creating solutions that are both intuitive
            and efficient ⚡.
          </p>
          <div className="socials">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <Facebook size={28} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              <Linkedin size={28} />
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer">
              <Github size={28} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
