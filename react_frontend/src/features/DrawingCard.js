import React, { useState } from "react";

// PUBLIC_INTERFACE
export default function DrawingCard({ drawing, onGuess }) {
  const [showForm, setShowForm] = useState(false);
  const [guess, setGuess] = useState("");
  const [feedback, setFeedback] = useState(""); // for local feedback

  function handleGuessSubmit(e) {
    e.preventDefault();
    // Simulate exact-match check (case-insensitive)
    if (guess.trim().toLowerCase() === (drawing.prompt || "").toLowerCase()) {
      setFeedback("🎉 Correct!");
      setTimeout(() => setShowForm(false), 1050);
      onGuess(true, drawing.id, guess.trim());
    } else {
      setFeedback("❌ Nope!");
      onGuess(false, drawing.id, guess.trim());
    }
  }

  return (
    <div className="skq-card" title="Guess this drawing!">
      {drawing.img ? (
        <img src={drawing.img} alt="Drawing" className="drawing-img" />
      ) : (
        <div
          className="drawing-img"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "2.24rem",
            background: "#f7fbfa"
          }}
        >
          <span role="img" aria-label="drawing">🖼️</span>
        </div>
      )}
      <div className="drawing-meta">{drawing.prompt || "???"}</div>
      <button
        className="draw-btn"
        style={{
          fontSize: "0.97em",
          marginTop: "0.41em",
          padding: "0.38em 1em",
          borderRadius: "0.95em"
        }}
        onClick={() => setShowForm((v) => !v)}
      >
        Guess
      </button>
      {showForm && (
        <form
          onSubmit={handleGuessSubmit}
          style={{
            padding: "0.6em 0.1em",
            textAlign: "center"
          }}>
          <input
            type="text"
            value={guess}
            placeholder="Your guess"
            autoFocus
            style={{
              borderRadius: "0.9em",
              border: "1px solid #cbe8e4",
              fontSize: "0.98em",
              padding: "0.31em 1.1em",
              marginBottom: ".22em"
            }}
            onChange={e => setGuess(e.target.value)}
            required
          />
          <button
            type="submit"
            style={{
              fontSize: "1em",
              marginLeft: "0.78em",
              borderRadius: "1.1em",
              background: "#08c4a3"
            }}
          >Go</button>
          {feedback && (
            <div style={{
              fontWeight: 600,
              color: feedback.startsWith("🎉") ? "#19d979" : "#e34251",
              marginTop: "0.37em"
            }}>{feedback}</div>
          )}
        </form>
      )}
    </div>
  );
}
