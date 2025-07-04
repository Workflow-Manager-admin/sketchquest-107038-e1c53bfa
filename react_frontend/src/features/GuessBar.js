import React, { useState } from "react";

// PUBLIC_INTERFACE
export default function GuessBar({ wrongGuesses, setWrongGuesses }) {
  const [guess, setGuess] = useState("");
  function handleWrongGuessSubmit(e) {
    e.preventDefault();
    if (guess && guess.trim().length > 0) {
      setWrongGuesses(arr => [...arr, guess.trim()]);
      setGuess("");
    }
  }
  return (
    <nav className="skq-guessbar" aria-label="Guess input bar" style={{
      background: "linear-gradient(90deg,#1abc9c 80%,#b4ffe8 190%)",
      padding: "1.02em 4vw 0.91em 4vw",
      boxShadow: "0 -5px 32px #1abc9c33"
    }}>
      <form className="skq-guess-form" onSubmit={handleWrongGuessSubmit}>
        <input
          type="text"
          value={guess}
          placeholder="Take a guess…"
          onChange={e => setGuess(e.target.value)}
          maxLength={40}
          style={{
            borderRadius: "1.45em",
            border: "2px solid #57f6d5",
            fontSize: "1.16em",
            fontWeight: 700,
            color: "#07a898",
            background: "#edfff7",
            padding: ".64em 1.7em",
            boxShadow: "0 2.2px 10px #7effe033",
            marginRight: "2px"
          }}
        />
        <button
          type="submit"
          style={{
            background: "linear-gradient(90deg, #fff, #09bca9 120%)",
            color: "#10ada0",
            borderRadius: "1.18em",
            fontWeight: 800,
            fontSize: "1.17em",
            padding: ".62em 1.24em",
            border: "none",
            boxShadow: "0 2px 6px #51eafc22"
          }}
        >
          <span role="img" aria-label="eye">🔍</span> Guess
        </button>
      </form>
      {wrongGuesses && wrongGuesses.length > 0 && (
        <div className="skq-wrong-guesses" style={{
          marginTop: "0.58em"
        }}>
          {wrongGuesses.slice(-8).map((g, i) => (
            <span key={i} className="skq-wrong-guess" style={{
              fontSize: "1.02em",
              background: "#ffd5e7",
              color: "#e6466e",
              padding: "0.29em 1.07em",
              borderRadius: "1.24em",
              border: "1.6px solid #ffeaf4",
              fontWeight: 800,
              margin: "0 4px"
            }}>{g}</span>
          ))}
        </div>
      )}
    </nav>
  );
}
