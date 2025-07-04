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
    <div className="skq-dashboard">
      {topDrawing && (
        <div className="skq-top-banner" role="banner">
          <span role="img" aria-label="star">🌟</span>
          Top Drawing Today:
          <span style={{
            background:"#fff",
            color: "#08a68c",
            borderRadius: "1em",
            padding: "0.25em 1em",
            marginLeft: "0.8em",
            fontWeight: 700,
            boxShadow: "0 1.5px 14px 0 #1abc9c11"
          }}>
            {topDrawing.prompt || "Mystery Prompt"}
          </span>
        </div>
      )}
      <div className="skq-grid">
        {drawings.map((d, idx) => (
          <DrawingCard
            key={d.id || idx}
            drawing={d}
            onGuess={onGuess}
          />
        ))}
        {!drawings.length && (
          <div style={{
            padding: "3em .5em",
            gridColumn: "1/-1",
            color: "#ababab"
          }}>
            No drawings uploaded yet. Be the first!
          </div>
        )}
      </div>
    </div>
  );
}
