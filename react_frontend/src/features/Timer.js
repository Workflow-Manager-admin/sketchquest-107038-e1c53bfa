import React, { useState, useEffect } from "react";

// PUBLIC_INTERFACE
export default function Timer({ active, seconds = 45, onDone }) {
  const [time, setTime] = useState(seconds);

  useEffect(() => {
    if (!active) {
      setTime(seconds);
      return;
    }
    setTime(seconds);
    const interval = setInterval(() => {
      setTime(t => {
        if (t <= 1) {
          clearInterval(interval);
          if (onDone) onDone();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [active, seconds]);

  const pct = ((time / seconds) * 100).toFixed(1);

  return (
    <div className="skq-timer-box">
      <span style={{
        fontSize: "1em",
        fontWeight: 700,
        color: "#1abc9c"
      }}>Time Left</span>
      <div className="skq-timer-clock">{time}s</div>
      <div className="skq-timer-bar">
        <div
          className="skq-timer-fill"
          style={{
            width: `${pct}%`,
            background: pct < 40 ? "#fc766a" : "#1abc9c"
          }}
        />
      </div>
    </div>
  );
}
