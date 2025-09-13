import React from "react";
import { Facebook, Linkedin, Github } from "lucide-react";
import "../section-styles/About.css";
import { useEffect, useRef } from "react";
import image from "./assets/image.png";

export default function About() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let stars = [];
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    // generate stars
    for (let i = 0; i < 150; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        radius: Math.random() * 2,
      });
    }

    // redraw stars
    function draw() {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "white";
      stars.forEach((s) => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    draw();

    // parallax on mouse move
    function moveStars(e) {
      const offsetX = (e.clientX / w - 0.5) * 75;
      const offsetY = (e.clientY / h - 0.5) * 75;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "white";
      stars.forEach((s) => {
        ctx.beginPath();
        ctx.arc(s.x + offsetX, s.y + offsetY, s.radius, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    window.addEventListener("mousemove", moveStars);
    window.addEventListener("resize", () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      draw();
    });

    return () => {
      window.removeEventListener("mousemove", moveStars);
    };
  }, []);

  return (
    <section className="about">
      <canvas ref={canvasRef} className="star-canvas"></canvas>
      <div className="about-container">
        <div className="about-photo">
          <img src={myPhoto} alt="Me" />
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
