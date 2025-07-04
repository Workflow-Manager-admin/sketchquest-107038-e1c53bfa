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
    <nav className="skq-guessbar" aria-label="Guess input bar">
      <form className="skq-guess-form" onSubmit={handleWrongGuessSubmit}>
        <input
          type="text"
          value={guess}
          placeholder="Take a guess..."
          onChange={e => setGuess(e.target.value)}
          maxLength={40}
        />
        <button type="submit">Guess</button>
      </form>
      {wrongGuesses && wrongGuesses.length > 0 && (
        <div className="skq-wrong-guesses">
          {wrongGuesses.slice(-8).map((g, i) => (
            <span key={i} className="skq-wrong-guess">{g}</span>
          ))}
        </div>
      )}
    </nav>
  );
}
