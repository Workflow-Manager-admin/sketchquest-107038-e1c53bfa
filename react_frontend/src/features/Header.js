import React from "react";

// PUBLIC_INTERFACE
export default function Header({ username, onDrawClick }) {
  return (
    <header className="skq-header">
      <div className="logo">
        <span role="img" aria-label="quest">🗺️</span> SketchQuest
      </div>
      <div className="header-actions">
        <div>Hi <strong>{username}</strong>!</div>
        <button className="draw-btn" onClick={onDrawClick}>
          <span role="img" aria-label="pencil">✏️</span> Draw
        </button>
      </div>
    </header>
  );
}
