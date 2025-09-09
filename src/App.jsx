import { useEffect, useRef, useState } from "react";
import "./App.css";

export default function App() {
  const [blur, setBlur] = useState(20);
  const [opacity, setOpacity] = useState(1);
  const [unlocked, setUnlocked] = useState(false);

  const progressRef = useRef(0); // 0..1 progress of "reveal"
  const touchStartRef = useRef(null); // for touch handling

  useEffect(() => {
    const body = document.body;
    // lock scrolling initially
    body.style.overflow = "hidden";

    // adjust sensitivity here (higher -> need more scroll to finish)
    const SENSITIVITY = 800; // px of drag to reach full reveal
    const BLUR_START = 20; // starting blur in px

    const setVisualsFromProgress = (p) => {
      // p is 0..1
      setBlur(BLUR_START * (1 - p));
      setOpacity(1 - p);
    };

    const tryUnlock = () => {
      // fully revealed: unlock scroll and clean listeners
      body.style.overflow = "";
      setUnlocked(true);
      // listeners will be removed in cleanup too; removing now is fine
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };

    const increaseProgressBy = (delta) => {
      // delta is positive for downward gestures
      progressRef.current = Math.min(
        Math.max(progressRef.current + delta / SENSITIVITY, 0),
        1
      );
      const p = progressRef.current;
      setVisualsFromProgress(p);
      if (p >= 1) tryUnlock();
    };

    const onWheel = (e) => {
      // We only intercept wheel while overlay active
      e.preventDefault();
      const dy = e.deltaY;
      if (dy > 0) {
        increaseProgressBy(dy);
      } else {
        // allow reversing (optional)
        increaseProgressBy(dy);
      }
    };

    const onTouchStart = (e) => {
      touchStartRef.current = e.touches?.[0]?.clientY ?? null;
    };

    const onTouchMove = (e) => {
      if (touchStartRef.current == null) return;
      const currentY = e.touches?.[0]?.clientY ?? 0;
      const dy = touchStartRef.current - currentY; // positive when swiping up (revealing)
      if (Math.abs(dy) < 3) return; // ignore tiny movements
      e.preventDefault();
      increaseProgressBy(dy);
      // update start so consecutive moves are incremental
      touchStartRef.current = currentY;
    };

    // add listeners (non-passive so we can preventDefault)
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: false });
    window.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      // cleanup: restore scroll if anything odd happens
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      body.style.overflow = "";
    };
  }, []);

  return (
    <>
      {/* Hero Overlay */}
      {!unlocked && (
        <section className="hero" style={{ opacity }}>
          <h1 className="hero-title">Hi, I’m Justine 👋</h1>
          <p className="hero-subtitle">A passionate web developer.</p>
          <p className="hero-hint">Scroll down to unlock more!</p>
        </section>
      )}

      {/* CONTENT WRAPPER with blur */}
      <div
        className="content-wrapper"
        style={{
          filter: !unlocked ? `blur(${blur}px)` : "none",
          transition: "filter 0.5s ease",
        }}
      >
        <main>
          {/* About Section */}
          <section className="about">
            <div className="about-container">
              <div className="about-photo">
                <img src="src\assets\image copy.png" alt="Me 2" />
              </div>

              {/* Text + Socials */}
              <div className="about-text">
                <h2 className="about-name">JUSTINE ANGELO A. DE VERA</h2>
                <p className="about-description">
                  I’m a web developer passionate about building modern,
                  user-friendly apps. I focus on clean UI, smooth user
                  experiences, and creating solutions that are both intuitive
                  and efficient.
                </p>

                <div className="socials">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src="/icons/facebook.svg" alt="Facebook" />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src="/icons/linkedin.svg" alt="LinkedIn" />
                  </a>
                  <a href="https://github.com" target="_blank" rel="noreferrer">
                    <img src="/icons/github.svg" alt="GitHub" />
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Projects */}
          <section className="projects">
            <h2>Projects</h2>
            <p>Portfolio Website, Smart Storage App, Weather Dashboard</p>
          </section>

          {/* Contact */}
          <section className="contact">
            <h2>Contact</h2>
            <p>justine@example.com</p>
          </section>
        </main>
      </div>
    </>
  );
}
