import React, { useEffect } from "react";
import DrawingCard from "./DrawingCard";

export default function Dashboard({
  drawings = [],
  topDrawing,
  onGuess,
  onHighlightTopDrawing
}) {
  // Highlight top drawing (simulate with first if none)
  useEffect(() => {
    if ((!topDrawing || !drawings.length) && drawings.length) {
      onHighlightTopDrawing(drawings[0]);
    }
    // eslint-disable-next-line
  }, [drawings, topDrawing]);

  return (
    <div className="skq-dashboard" style={{marginTop: "2.6vw"}}>
      {topDrawing && (
        <div
          className="skq-top-banner"
          role="banner"
          style={{
            fontSize: "clamp(1.1rem, 1.7vw, 1.40rem)",
            border: "3px solid #82ffe1",
            boxShadow: "0 2px 18px 0 #9ff8ee34, 0 1.5px 8px #8af8ef62",
            marginBottom: "2.6em",
            letterSpacing: "0.7px",
            background: "linear-gradient(90deg, #18dbc0 59%, #aefaf8 100%)"
          }}>
          <span role="img" aria-label="star" style={{fontSize: "2em", marginRight: "0.5em"}}>🌟</span>
          <span>
            <span style={{
              textShadow: "0 1px 7px #fff",
              color: "#fff",
              fontWeight: 800,
            }}>Top Drawing Today:</span>
            <span style={{
              background: "#fff",
              color: "#18dcaa",
              borderRadius: "1.7em",
              padding: "0.3em 1.3em",
              marginLeft: "0.9em",
              fontWeight: 900,
              boxShadow: "0 2px 16px 0 #1abc9c25, 0 1.5px 8px #eafecf32",
            }}>
              {topDrawing.prompt || "Mystery Prompt"}
            </span>
          </span>
        </div>
      )}
      <div className="skq-grid" style={{
        gap: "1.6em",
        marginTop: "-0.3em"
      }}>
        {drawings.map((d, idx) => (
          <DrawingCard
            key={d.id || idx}
            drawing={d}
            onGuess={onGuess}
          />
        ))}
        {!drawings.length && (
          <div style={{
            padding: "3.5em 0.7em",
            gridColumn: "1/-1",
            color: "#b1ccc5",
            background: "#eafeff",
            borderRadius: "2.5em",
            boxShadow: "0 2px 16px #bbfff946"
          }}>
            <span role="img" aria-label="mag">🔎</span> No drawings uploaded yet.<br />Be the <b>first</b> to show your art!
          </div>
        )}
      </div>
    </div>
  );
}
