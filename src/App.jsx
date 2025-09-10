import { useEffect, useRef, useState } from "react";
import "./App.css";

import About from ".././src/Sections/About";
import Projects from "../src/Sections/Projects";
import Skills from "../src/Sections/Skills";
import Achievements from "../src/Sections/Achievements";
import Contact from "../src/Sections/Contact";

export default function App() {
  const [blur, setBlur] = useState(20);
  const [opacity, setOpacity] = useState(1);
  const [unlocked, setUnlocked] = useState(false);

  const progressRef = useRef(0);
  const touchStartRef = useRef(null);

  const projects = [
    { title: "Portfolio Website", description: "A responsive portfolio website built with React.", image: "/src/assets/portfolio.png", link: "https://example.com/portfolio" },
    { title: "Smart Storage App", description: "IoT app that monitors food freshness and temperature.", image: "/src/assets/storage.png", link: "https://example.com/smart-storage" },
    { title: "Weather Dashboard", description: "A dashboard showing real-time weather data.", image: "/src/assets/weather.png", link: "https://example.com/weather" },
  ];

  const achievements = [
    { title: "Web Developer of the Year", description: "Awarded by XYZ Organization in 2024.", image: "/src/assets/award1.jpg" },
    { title: "Hackathon Winner", description: "First place in ABC Hackathon for innovative IoT solution.", image: "/src/assets/award2.jpg" },
    { title: "Open Source Contributor", description: "Contributed to multiple React libraries and GitHub projects.", image: "/src/assets/award3.jpg" },
  ];

  // -- Scroll unlock logic stays the same --
  useEffect(() => {
    const body = document.body;
    body.style.overflow = "hidden";
    const SENSITIVITY = 800;
    const BLUR_START = 20;

    const setVisualsFromProgress = (p) => {
      setBlur(BLUR_START * (1 - p));
      setOpacity(1 - p);
    };

    const tryUnlock = () => {
      body.style.overflow = "";
      setUnlocked(true);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };

    const increaseProgressBy = (delta) => {
      progressRef.current = Math.min(Math.max(progressRef.current + delta / SENSITIVITY, 0), 1);
      const p = progressRef.current;
      setVisualsFromProgress(p);
      if (p >= 1) tryUnlock();
    };

    const onWheel = (e) => { e.preventDefault(); increaseProgressBy(e.deltaY); };
    const onTouchStart = (e) => { touchStartRef.current = e.touches?.[0]?.clientY ?? null; };
    const onTouchMove = (e) => {
      if (touchStartRef.current == null) return;
      const dy = touchStartRef.current - (e.touches?.[0]?.clientY ?? 0);
      if (Math.abs(dy) < 3) return;
      e.preventDefault();
      increaseProgressBy(dy);
      touchStartRef.current = e.touches[0].clientY;
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: false });
    window.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      body.style.overflow = "";
    };
  }, []);

  return (
    <>
      {!unlocked && (
        <section className="hero" style={{ opacity }}>
          <h1 className="hero-title">Hi, I’m Justine 👋</h1>
          <p className="hero-subtitle">A passionate web developer.</p>
          <p className="hero-hint">Scroll down to unlock more!</p>
        </section>
      )}
      <div className="content-wrapper" style={{ filter: !unlocked ? `blur(${blur}px)` : "none", transition: "filter 0.5s ease" }}>
        <main>
          <About />
          <Projects projects={projects} />
          <Skills />
          <Achievements achievements={achievements} />
          <Contact />
        </main>
      </div>
    </>
  );
}
