import React, { useState } from "react";

const PROMPT_LIST = [
  "Cat balancing", "Sunbathing turtle", "Sneaky raccoon", "Sleepy fox", "Parrot in sunglasses",
  "Dancing crocodile", "Happy chameleon", "Biking ostrich", "Surfing pelican", "Bearded iguana",
  "Jumping frog", "King cobra", "Singing canary", "Elegant heron", "Lion drumming", "Flamingo ice skating",
  "Basketball owl", "Disco pangolin", "Fox in scarf", "Space gecko", "Rhino on skateboard",
  "Otter reading", "Ferret diving", "Starfish gymnast", "Dragon in hat", "Penguin chef",
  "Corgi wizard", "Squirrel in boots", "Moth lantern", "Rabbit astronaut", "Shy bison"
];

// PUBLIC_INTERFACE
export default function SpinWheel({ onSpin }) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [prompt, setPrompt] = useState(null);

  function handleSpin() {
    setIsSpinning(true);
    setPrompt(null);
    setTimeout(() => {
      const randomPrompt = PROMPT_LIST[Math.floor(Math.random() * PROMPT_LIST.length)];
      setPrompt(randomPrompt);
      setIsSpinning(false);
      onSpin(randomPrompt);
    }, 700); // match animation
  }

  return (
    <div className="skq-spin-wheel">
      <button
        className="skq-spin-btn"
        onClick={handleSpin}
        type="button"
        disabled={isSpinning}
        aria-busy={isSpinning}
      >
        {isSpinning ? (
          <span style={{ display: 'inline-block', animation: "spinPromptAnim 0.7s" }}>Spinning…</span>
        ) : (
          <span>Spin for Prompt&ensp;🎯</span>
        )}
      </button>
      {prompt && (
        <span className="skq-spin-prompt" aria-live="polite">{prompt}</span>
      )}
    </div>
  );
}
