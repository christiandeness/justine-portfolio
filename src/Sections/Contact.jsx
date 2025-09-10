import React from "react";
import { Mail, Linkedin, Github } from "lucide-react";
import "../section-styles/Contact.css";

export default function Contact() {
  return (
    <footer className="contact-footer">
      <div className="contact-container">
        <p className="contact-text">Get in touch 📬:</p>
        <div className="contact-icons">
          <a href="mailto:justine@example.com" target="_blank" rel="noreferrer">
            <Mail size={32} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">
            <Linkedin size={32} />
          </a>
          <a href="https://github.com" target="_blank" rel="noreferrer">
            <Github size={32} />
          </a>
        </div>
        <p className="copyright">© {new Date().getFullYear()} JusDev</p>
      </div>
    </footer>
  );
}
