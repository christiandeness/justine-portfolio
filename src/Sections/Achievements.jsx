import React from "react";
import AchievementCard from "../components/AchievementCard";
import "../section-styles/Achievements.css";

export default function Achievements({ achievements }) {
  return (
    <section className="achievements">
      <h2>Achievements 🏆</h2>
      <div className="achievements-grid">
        {achievements.map((ach, index) => (
          <AchievementCard
            key={index}
            title={ach.title}
            description={ach.description}
            image={ach.image}
          />
        ))}
      </div>
    </section>
  );
}
