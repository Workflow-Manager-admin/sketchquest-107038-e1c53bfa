import React, { useState, useRef } from "react";
import SpinWheel from "./SpinWheel";
import DrawingCanvas from "./DrawingCanvas";
import Timer from "./Timer";

// PUBLIC_INTERFACE
export default function DrawingModal({ onDrawingComplete, onClose }) {
  // Prompt logic
  const [prompt, setPrompt] = useState(null);
  const [promptLocked, setPromptLocked] = useState(false);

  // Timer
  const [timerActive, setTimerActive] = useState(false);
  const [timerDone, setTimerDone] = useState(false);

  // Canvas image
  const [img, setImg] = useState(null);

  const canvasRef = useRef();

  function handleSpinPrompt(randomPrompt) {
    setPrompt(randomPrompt);
    setPromptLocked(true);
    setTimeout(() => setTimerActive(true), 700); // after prompt anim
  }

  function handleTimerDone() {
    setTimerDone(true);
    setTimerActive(false);
  }

  function handleFinish() {
    if (!img) return;
    // Provide a simulated drawing object
    onDrawingComplete({
      id: Date.now().toString(),
      prompt,
      img,
    });
  }

  function handleResetCanvas() {
    if (canvasRef.current) {
      canvasRef.current.reset();
      setImg(null);
    }
  }

  return (
    <div className="skq-modal-backdrop" onClick={onClose}>
      <div
        className="skq-modal-content"
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        tabIndex="-1"
      >
        <button
          className="skq-modal-close-btn"
          aria-label="Close"
          type="button"
          onClick={onClose}
          style={{position:"absolute"}}
        >
          ×
        </button>
        <h2 style={{
          color: "#1abc9c",
          marginBottom: "0.61em",
          fontWeight: 800,
          letterSpacing: ".7px"
        }}>
          Draw Mode
        </h2>
        {!promptLocked ? (
          <SpinWheel onSpin={handleSpinPrompt} />
        ) : (
          <div style={{
            marginBottom: "1.1em",
            textAlign: "center",
            fontWeight: 700
          }}>
            Prompt: <span className="skq-spin-prompt">{prompt}</span>
          </div>
        )}
        <div className="skq-canvas-container" style={{marginTop:"0.2em"}}>
          <DrawingCanvas
            ref={canvasRef}
            locked={!promptLocked || timerDone}
            onChangeImg={setImg}
          />
        </div>
        <div className="skq-canvas-toolbar" style={{marginTop:"0.1em"}}>
          <button
            onClick={handleResetCanvas}
            style={{background: "#e1f8f3", color: "#15a188"}}
            type="button"
          >
            Reset
          </button>
          <button
            onClick={handleFinish}
            style={{
              background: timerDone && img ? "#1abc9c" : "#bfe5de",
              color: "#fff",
              pointerEvents: timerDone && img ? "auto" : "none",
              opacity: timerDone && img ? 1 : 0.6
            }}
            type="button"
            disabled={!(timerDone && img)}
          >
            Finish&nbsp;<span role="img" aria-label="check">✅</span>
          </button>
        </div>
        <Timer
          active={timerActive}
          seconds={45}
          onDone={handleTimerDone}
        />
      </div>
    </div>
  );
}
