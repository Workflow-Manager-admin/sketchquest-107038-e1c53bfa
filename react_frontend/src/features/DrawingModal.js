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
    <div className="skq-modal-backdrop" onClick={onClose} style={{
      backdropFilter: "blur(2px)",
      animation: "fadeInBackdrop 0.38s cubic-bezier(.47,1.3,.77,1.12) backwards"
    }}>
      <div
        className="skq-modal-content"
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        tabIndex="-1"
        style={{
          background: "linear-gradient(127deg, #fff 88%, #eafffd 100%)",
          boxShadow: "0 10px 35px 0 rgba(26,188,156,0.14),0 3px 36px #fafae8",
          border: "2.4px solid #eafbfa",
          minWidth: 0,
          position: "relative"
        }}
      >
        <button
          className="skq-modal-close-btn"
          aria-label="Close"
          type="button"
          onClick={onClose}
          style={{
            position:"absolute", 
            borderRadius: "2em", 
            border: "1.8px solid #edfffc",
            background: "#e7fffa",
            color: "#1abc9c",
            top: "18px",
            right: "22px",
            zIndex: 7,
          }}
        >
          ×
        </button>
        <h2 style={{
          color: "#08c4a3",
          marginBottom: "0.52em",
          fontWeight: 900,
          letterSpacing: ".7px",
          textAlign: "center",
          fontFamily: "'Quicksand', 'Segoe UI', cursive",
          fontSize: "2em",
          textShadow: "0 2.5px 10px #17ffc233"
        }}>
          Draw &amp; Share!
        </h2>
        {!promptLocked ? (
          <SpinWheel onSpin={handleSpinPrompt} />
        ) : (
          <div style={{
            marginBottom: "1.14em",
            textAlign: "center",
            fontWeight: 900,
            fontSize: "1.19em",
            color: "#1abc9c"
          }}>
            <span role="img" aria-label="pencil" style={{marginRight: ".6em"}}>✏️</span>
            Prompt: <span className="skq-spin-prompt">{prompt}</span>
          </div>
        )}
        <div className="skq-canvas-container" style={{marginTop:"0.43em", background:"#e9f8f6"}}>
          <DrawingCanvas
            ref={canvasRef}
            locked={!promptLocked || timerDone}
            onChangeImg={setImg}
          />
        </div>
        <div className="skq-canvas-toolbar" style={{marginTop:"0.21em", gap:"1.95em"}}>
          <button
            onClick={handleResetCanvas}
            style={{
              background: "#d9fbff",
              color: "#15a188",
              border: "2px solid #9ef9ed",
              fontWeight: 700,
              fontSize: "1em",
              borderRadius: "1.1em"
            }}
            type="button"
          >
            Reset
          </button>
          <button
            onClick={handleFinish}
            style={{
              background: timerDone && img ? "linear-gradient(90deg, #1abc9c 60%, #75ffc6 100%)" : "#bfe5de",
              color: "#fff",
              pointerEvents: timerDone && img ? "auto" : "none",
              opacity: timerDone && img ? 1 : 0.54,
              border: "2px solid #96f8e5",
              borderRadius: "1.2em",
              fontWeight: 900,
              fontSize: "1.09em",
              boxShadow: "0 2px 7px #1abc9c19"
            }}
            type="button"
            disabled={!(timerDone && img)}
          >
            Finish&nbsp;
            <span role="img" aria-label="check">✅</span>
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
