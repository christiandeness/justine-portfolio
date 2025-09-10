import React from "react";
import "../component-styles/AchievementCard.css";

export default function AchievementCard({ title, description, image }) {
  return (
    <div className="achievement-card">
      {image && <img src={image} alt={title} className="achievement-image" />}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

