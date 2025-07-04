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
    <div className="skq-card" title="Guess this drawing!" style={{
      boxShadow: "0 5px 20px #0ae9aa19, 0 1.5px 8px #d3ffcb19",
      border: "2.5px solid #a2ffe5",
      borderRadius: "1.5em"
    }}>
      {drawing.img ? (
        <img src={drawing.img} alt="Drawing" className="drawing-img"
          style={{border: "3.5px solid #94ffda", background: "#eafffb"}}
        />
      ) : (
        <div
          className="drawing-img"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "2.40rem",
            background: "#eafdff",
            border: "3.5px solid #eafffb"
          }}
        >
          <span role="img" aria-label="drawing">🎨</span>
        </div>
      )}
      <div className="drawing-meta" style={{
        fontSize: "1.13em",
        fontWeight: 800,
        color: "#15a188",
        marginTop: "0.23em"
      }}>{drawing.prompt || "???"}</div>
      <button
        className="draw-btn"
        style={{
          fontSize: "1.17em",
          marginTop: "0.65em",
          padding: "0.46em 1.22em",
          borderRadius: "1.18em",
          background: "linear-gradient(90deg, #fff 40%, #96ffd6 100%)",
          color: "#0bbd9b",
          boxShadow: "0 2px 7px #abffe622"
        }}
        onClick={() => setShowForm((v) => !v)}
      >
        Guess!
      </button>
      {showForm && (
        <form
          onSubmit={handleGuessSubmit}
          style={{
            padding: "0.8em 0.18em",
            textAlign: "center",
            background: "#edfff7",
            borderRadius: "1.1em",
            marginTop: ".18em"
          }}>
          <input
            type="text"
            value={guess}
            placeholder="Your guess"
            autoFocus
            style={{
              borderRadius: "0.99em",
              border: "2px solid #a1f5e0",
              fontSize: "1.02em",
              padding: "0.36em 1.19em",
              marginBottom: ".29em",
              background: "#f3fffc"
            }}
            onChange={e => setGuess(e.target.value)}
            required
          />
          <button
            type="submit"
            style={{
              fontSize: "1.12em",
              marginLeft: "0.8em",
              borderRadius: "1.2em",
              background: "linear-gradient(90deg, #08c4a3 80%, #fff 120%)",
              color: "#fff",
              fontWeight: 900,
              border: "none",
              padding: "0.36em 1.08em",
            }}
          >Go</button>
          {feedback && (
            <div style={{
              fontWeight: 600,
              color: feedback.startsWith("🎉") ? "#19d979" : "#e34251",
              marginTop: "0.37em",
              fontSize: "1.1em"
            }}>{feedback}</div>
          )}
        </form>
      )}
    </div>
  );
}
