import React, { useRef, useEffect, forwardRef, useImperativeHandle } from "react";

// PUBLIC_INTERFACE
const DrawingCanvas = forwardRef(function DrawingCanvas({ onChangeImg, locked }, ref) {
  const canvasRef = useRef(null);
  const drawing = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

  // Used to clear/reset
  useImperativeHandle(ref, () => ({
    reset: () => {
      const ctx = canvasRef.current.getContext("2d");
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      if (onChangeImg) onChangeImg(null);
    }
  }));

  // Mouse & Touch drawing logic
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#1abc9c";

    const getPos = e => {
      let rect = canvas.getBoundingClientRect();
      if (e.touches) {
        return {
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top
        };
      } else {
        return {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        };
      }
    };

    // Draw line on move
    function onDraw(e) {
      if (!drawing.current) return;
      e.preventDefault();
      const { x, y } = getPos(e);
      ctx.lineTo(x, y);
      ctx.stroke();
      lastPos.current = { x, y };
    }

    function onDown(e) {
      if (locked) return;
      drawing.current = true;
      const { x, y } = getPos(e);
      ctx.beginPath();
      ctx.moveTo(x, y);
      lastPos.current = { x, y };
    }
    function onUp(e) {
      drawing.current = false;
      ctx.closePath();
      // Save as image (if anything drawn)
      if (onChangeImg) {
        const imgData = canvas.toDataURL("image/png");
        onChangeImg(imgData);
      }
    }

    canvas.addEventListener("mousedown", onDown);
    canvas.addEventListener("mousemove", onDraw);
    window.addEventListener("mouseup", onUp);
    canvas.addEventListener("touchstart", onDown);
    canvas.addEventListener("touchmove", onDraw);
    window.addEventListener("touchend", onUp);
    // Prevent scrolling during touch on canvas
    canvas.addEventListener("touchmove", e => e.preventDefault(), { passive: false });

    return () => {
      canvas.removeEventListener("mousedown", onDown);
      canvas.removeEventListener("mousemove", onDraw);
      window.removeEventListener("mouseup", onUp);
      canvas.removeEventListener("touchstart", onDown);
      canvas.removeEventListener("touchmove", onDraw);
      window.removeEventListener("touchend", onUp);
    };
  }, [locked, onChangeImg]);

  // Grey out on lock
  useEffect(() => {
    const canvas = canvasRef.current;
    if (locked) {
      canvas.style.opacity = 0.8;
      canvas.style.pointerEvents = "none";
    } else {
      canvas.style.opacity = 1;
      canvas.style.pointerEvents = "auto";
    }
  }, [locked]);

  // Keep size responsive
  function calcSize() {
    let w =
      Math.min(window.innerWidth * 0.85, 295) |
      0;
    let h = w > 240 ? 210 : 150;
    return [w, h];
  }

  return (
    <canvas
      ref={canvasRef}
      width={calcSize()[0]}
      height={calcSize()[1]}
      className="skq-canvas"
      style={{
        border: locked ? "2px dashed #1abc9c55" : "1px solid #e9ecef"
      }}
      aria-label="Drawing Canvas"
      tabIndex={locked ? -1 : 0}
    />
  );
});

export default DrawingCanvas;
