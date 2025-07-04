import React, { useState } from "react";

// EASIER, CLEARER PROMPTS
const PROMPT_LIST = [
  // Keep them short, visual, for all ages, more explicit actions or fun animal objects
  "A cat with a big hat", "A smiling turtle", "A dog chasing a ball", "A bird singing", "A snake with glasses",
  "A frog on a lily pad", "An elephant in a bathtub", "A panda eating bamboo", "A whale jumping", "A rabbit in boots",
  "A duck with an umbrella", "A monkey eating a banana", "A horse with wheels", "A lion wearing a crown",
  "A penguin on ice", "A camel in the desert", "A bear with a honey pot", "A parrot on a pirate ship",
  "A mouse with cheese", "A giraffe wearing shoes", "A zebra with sunglasses", "A hippo in the pool",
  "A squirrel with nuts", "A crab playing drums", "An octopus with books", "A fox reading", "A bison in snow",
  "A lizard on a skateboard", "A crocodile brushing teeth", "A flamingo with scarf", "A beetle lifting weights"
];

// Fun color palette for wheel sectors
const SECTOR_COLORS = [
  "#FF90BC", "#70D6FF", "#FFD670", "#FF9770", "#B5F6B9", "#EFB8FC",
  "#89F8C0", "#A0C4FF", "#FFF3B0", "#F1AC88", "#F6D6AD", "#FFD6F6"
];

// Generates a fun confetti effect
function launchConfetti(targetId) {
  const container = document.getElementById(targetId);
  if (!container) return;
  let count = 36;
  for (let i = 0; i < count; i++) {
    const el = document.createElement("div");
    el.style.position = "absolute";
    el.style.left = (50 + 32*Math.cos((2*Math.PI/count)*i)) + "%";
    el.style.top = (44 + 32*Math.sin((2*Math.PI/count)*i)) + "%";
    el.style.width = "14px";
    el.style.height = "9px";
    el.style.borderRadius = "8px";
    el.style.background = SECTOR_COLORS[i % SECTOR_COLORS.length];
    el.style.zIndex = "101";
    el.style.opacity = "0.75";
    el.style.transform = "scale(1)";
    el.style.transition = "all 0.8s cubic-bezier(.67,1.48,.22,.87)";
    container.appendChild(el);
    setTimeout(() => {
      el.style.transform = `translate(${Math.cos(i * 2*Math.PI/count) * 48}px,${Math.sin(i*2*Math.PI/count) * 52}px) scale(0.5)`;
      el.style.opacity = 0;
      setTimeout(() => container.removeChild(el), 750);
    }, 10);
  }
}

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
      launchConfetti('skq-spin-wheel-root');
      if (onSpin) onSpin(randomPrompt);
    }, 1200); // longer to match big spin animation
  }

  // Number of visible sectors (max 12 colors)
  const sectorCount = PROMPT_LIST.length > 12 ? 12 : PROMPT_LIST.length;
  const wheelSectors = Array(sectorCount).fill(null).map((_, i) => ({
    color: SECTOR_COLORS[i % SECTOR_COLORS.length],
    label: PROMPT_LIST[i]
  }));

  // Spinning animation
  const wheelStyle = {
    transition: isSpinning ? "transform 1.2s cubic-bezier(.8,2.3,.62,1.06)" : "transform 0.17s",
    transform: isSpinning
      ? `rotate(${360 * 3 + Math.floor(Math.random()*60)}deg)`
      : "rotate(0deg)",
    filter: isSpinning ? "drop-shadow(0 0 36px #fff8)" : ""
  };

  return (
    <div className="skq-spin-wheel" style={{
      flexDirection: "column",
      gap: "0.5em",
      width: "100%"
    }}>
      <div
        id="skq-spin-wheel-root"
        style={{
          position: "relative",
          width: 180,
          maxWidth: "68vw",
          height: 180,
          marginBottom: ".55em",
          marginLeft: "auto", marginRight: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* The color wheel */}
        <svg
          viewBox="0 0 200 200"
          width="180"
          height="180"
          style={{
            borderRadius: "50%",
            boxShadow: "0 4px 18px 0 #b3ffef44,0 0px 1.5px #b3ffef55",
            background: "#fff"
          }}
        >
          {wheelSectors.map((sector, i) => {
            const startAngle = (i * 360) / sectorCount;
            const endAngle = ((i + 1) * 360) / sectorCount;
            const largeArc = endAngle - startAngle > 180 ? 1 : 0;
            // Polar to cartesian
            const x1 = 100 + 100 * Math.cos(Math.PI * startAngle / 180);
            const y1 = 100 + 100 * Math.sin(Math.PI * startAngle / 180);
            const x2 = 100 + 100 * Math.cos(Math.PI * endAngle / 180);
            const y2 = 100 + 100 * Math.sin(Math.PI * endAngle / 180);

            const d = `
              M 100 100
              L ${x1} ${y1}
              A 100 100 0 ${largeArc} 1 ${x2} ${y2}
              Z
            `;
            return (
              <path
                key={i}
                d={d}
                fill={sector.color}
                opacity="0.89"
                style={wheelStyle}
              />
            );
          })}
        </svg>
        {/* Pointer */}
        <div style={{
          position: "absolute",
          top: "-18px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
        }}>
          <svg width="34" height="34" viewBox="0 0 32 32" aria-label="Pointer">
            <polygon
              points="16,0 22,15 16,11 10,15"
              fill="#ffb90b"
              stroke="#1abc9c"
              strokeWidth="1.5"
              filter="drop-shadow(0 1.5px 1px #1abc9c33)"
            />
          </svg>
        </div>
      </div>
      <button
        className="skq-spin-btn"
        onClick={handleSpin}
        type="button"
        disabled={isSpinning}
        aria-busy={isSpinning}
        style={{
          fontSize: "1.25em",
          fontWeight: "900",
          letterSpacing: "0.4px",
          background: "linear-gradient(81deg, #13e0b5 67%, #b6fff1 109%)",
          color: "#0a834b",
          border: "none",
          padding: "0.74em 2.44em",
          // Larger, touch/desktop friendly
          boxShadow: "0 2px 14px 0 #1abc9c22, 0 1.5px 7px 0 #fabc995a"
        }}
      >
        {isSpinning ? (
          <span
            style={{
              display: "inline-block",
              animation: "spinPromptAnim 1.1s linear infinite",
              fontSize: "1.01em",
              color: "#13cab1",
              textShadow: "0 2px 8px #fff8, 0 1.5px 4px #60e5a6a2"
            }}
          >Spinning…</span>
        ) : (
          <span>Spin for Prompt&ensp;🎡</span>
        )}
      </button>
      {/* Prompt result */}
      {prompt && (
        <span className="skq-spin-prompt" aria-live="polite" style={{
          display: "block",
          marginTop: ".8em",
          fontSize: "1.23em",
          color: "#16b590",
          fontWeight: "900",
          background: "#eafdff",
          borderRadius: "1.2em",
          padding: "0.32em 1.45em",
          boxShadow: "0 2px 18px #b4ffef33"
        }}>{prompt}</span>
      )}
    </div>
  );
}
