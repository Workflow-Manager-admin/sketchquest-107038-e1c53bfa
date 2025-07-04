import React, { useState } from "react";

// PUBLIC_INTERFACE
export default function Login({ onLogin }) {
  const [name, setName] = useState("");
  const [error, setError] = useState(null);

  function randomName() {
    const animals = [
      "Fox", "Lynx", "Otter", "Crane", "Panda", "Jaguar", "Finch", "Penguin", "Badger", "Swan",
      "Iguana", "Falcon", "Bat", "Frog", "Python", "Hawk", "Lizard", "Moose", "Coral", "Dove",
      "Koala", "Wolf", "Heron", "Rhino", "Emu", "Pelican", "Gecko", "Koi", "Cobra", "Bison",
      "Beetle", "Peacock", "Duck", "Crow", "Moth"
    ];
    const color = [
      "Blue", "Emerald", "Sunny", "Wild", "Brave", "Shadow", "Rapid", "Fuzzy", "Magic", "Happy",
      "Tiny", "Big", "Swift", "Glowing", "Thunder", "Vivid", "Sneaky", "Lucky", "Sky", "Neon",
      "Icy", "Ruby", "Golden"
    ];
    const r = () => Math.floor(Math.random() * 999);
    return `${color[Math.floor(Math.random()*color.length)]}${animals[Math.floor(Math.random()*animals.length)]}${r()}`;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (name.trim().length < 3 || name.length > 20) {
      setError("Name must be 3-20 characters");
      return;
    }
    onLogin(name.trim());
  }

  // Sketch mascot SVG (pencil+bird hybrid, placeholder)
  function Mascot() {
    return (
      <svg
        width="85"
        height="85"
        viewBox="0 0 185 185"
        style={{
          marginBottom: "0.29em",
          filter: "drop-shadow(0 6px 21px #d0dcfd73)",
          animation: "mascotPop 1.16s cubic-bezier(.18,2.1,.77,.95)"
        }}
        aria-label="SketchQuest Mascot"
      >
        {/* Pencil Body */}
        <rect x="82" y="27" width="20" height="90" rx="11" fill="#ffe29e" stroke="#e6b13c" strokeWidth="6"/>
        {/* Eraser cap */}
        <rect x="81" y="27" width="22" height="14" rx="9" fill="#e8d3fa" stroke="#8d62ff" strokeWidth="4"/>
        {/* Pencil tip */}
        <polygon points="92,120 110,120 101,163" fill="#a77a46" stroke="#775627" strokeWidth="4"/>
        <polygon points="94,134 108,134 101,163" fill="#fff" opacity="0.55"/>
        {/* Bird "head" */}
        <ellipse cx="92" cy="39" rx="19" ry="17" fill="#61dafb" stroke="#4093b6" strokeWidth="4" />
        {/* Beak */}
        <polygon points="75,42 60,46 74,50" fill="#fbbf24" stroke="#c89203" strokeWidth="2"/>
        {/* Eye */}
        <ellipse cx="87" cy="38" rx="3.3" ry="3.2" fill="#283248" />
        {/* Feather "wing" */}
        <ellipse cx="112" cy="62" rx="11" ry="18" fill="#fcb7f8" stroke="#c079b6" strokeWidth="3" style={{transform:"rotate(-34deg)",transformOrigin:"112px 62px"}} />
        {/* Artistic doodle lines */}
        <path d="M122 20 Q130 17 135 21 Q140 28 134 30"
          stroke="#6ad6fd" fill="none" strokeDasharray="7,5" strokeWidth="2"/>
      </svg>
    );
  }

  // Fun doodles for BG
  function BgDoodles() {
    return (
      <svg width="640" height="440" viewBox="0 0 640 440" style={{
        position: "fixed",
        bottom: "0", left: "53vw", zIndex: 0, pointerEvents: "none", opacity: 0.64,
        filter: "blur(2.5px)"
      }}>
        <ellipse cx="122" cy="400" rx="95" ry="19" fill="#ffefbccc"/>
        <ellipse cx="600" cy="320" rx="49" ry="12" fill="#a5fbd3aa"/>
        <ellipse cx="530" cy="400" rx="55" ry="16" fill="#ffc7e6da"/>
        <path d="M210 335 Q217 315 268 298 Q324 289 413 310"
          stroke="#d1d7ff" fill="none" strokeWidth="9" strokeDasharray="28,15"/>
        <ellipse cx="432" cy="274" rx="28" ry="8" fill="#bce7ff9a"/>
        <ellipse cx="89" cy="315" rx="18" ry="7" fill="#ffd2fc"/>
        <ellipse cx="310" cy="388" rx="115" ry="29" fill="#e4f0ff"/>
      </svg>
    );
  }

  return (
    <div className="skq-login-modal" style={{
      minHeight: "100vh", width: "100vw",
      background: "linear-gradient(126deg, #f6fff9 60%, #e7eaff 100%)",
      display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column",
      position: "relative", zIndex: 5, overflow: "hidden"
    }}>
      <BgDoodles />
      <form className="skq-login-box"
        onSubmit={handleSubmit}
        autoComplete="off"
        style={{
          fontFamily: "'Nunito', 'Poppins', 'Fredoka', cursive",
          background: "linear-gradient(117deg, #fff 80%, #f5f3ff 100%)",
          boxShadow: "0 7px 34px #ebf4ff52, 0 1.5px 18px #e8c3f941",
          border: "2.2px solid #b7eaff",
          borderRadius: "2.95em",
          padding: "2.95rem 2.4rem 2.2rem 2.4rem",
          minWidth: 265, textAlign: "center", zIndex: 7,
          animation: "floatInPop 1.28s cubic-bezier(.35,1.8,.52,1.1)", position: "relative"
        }}>
        <Mascot />
        <div style={{
          fontWeight: 900,
          fontSize: "2.02em",
          letterSpacing: "1.2px",
          marginBottom: "0.05em",
          color: "#4e73df",
          textShadow: "0 2.5px 24px #e4f0ff72",
          fontFamily: "'Fredoka', 'Nunito', 'Poppins', cursive"
        }}>
          SketchQuest
        </div>
        <div style={{
          marginTop: "0.22em",
          color: "#283248",
          fontWeight: 500,
          letterSpacing: "0.02em",
          fontFamily: "'Quicksand', 'Inter', sans-serif",
          fontSize: "1.13em"
        }}>Draw. Guess. Laugh. <span role="img" aria-label="wand">🪄</span>
        </div>
        <div style={{
          marginTop: "1.01em", color: "#6366f1",
          fontFamily: "'Nunito', 'Open Sans', cursive", fontWeight: 700, fontSize: "1.15em"
        }}>Pick a fun username:</div>
        <input
          type="text"
          value={name}
          placeholder="e.g. EmeraldOtter297"
          spellCheck="false"
          maxLength={20}
          onChange={e => {
            setName(e.target.value);
            setError(null);
          }}
          required
          autoFocus
          style={{
            borderRadius: "2em",
            border: "2.2px solid #d0e6fa",
            outline: "none",
            fontSize: "1.25em",
            fontFamily: "'Quicksand', 'Poppins', 'Inter'",
            padding: "0.68em 1.8em",
            width: "84%",
            margin: "1.25em auto 0.55em auto",
            boxShadow: "0 2px 11px #aee7fa1a",
            background: "#ffffffb6",
            letterSpacing: "0.04em",
            fontWeight: 600
          }}
        />
        <button
          type="submit"
          style={{
            background: "linear-gradient(94deg,#4e73df 75%,#fbbf24 130%)",
            color: "#fff",
            fontFamily: "'Nunito', 'Poppins'",
            fontWeight: 800,
            padding: "0.62em 2em",
            fontSize: "1.24em",
            borderRadius: "1.22em",
            marginTop: "0.93em",
            border: "none",
            boxShadow: "0 2.5px 17px #dad8fd24",
            cursor: "pointer",
            transition: "background 0.21s, transform .15s"
          }}
        >Enter</button>
        <button
          style={{
            background: "linear-gradient(94deg, #fbbf24 75%, #ff6b81 130%)",
            color: "#fff",
            marginTop: "0.45em",
            fontSize: "1.04em",
            fontFamily: "'Quicksand', 'Nunito'",
            border: "none",
            padding: "0.39em 1.19em",
            borderRadius: "1.27em",
            marginLeft: "12px",
            fontWeight: 800,
            boxShadow: "0 2.5px 10px #ffd4ee21",
            cursor: "pointer",
            transition: "background 0.19s, transform .12s"
          }}
          type="button"
          onClick={() => setName(randomName())}
        >
          Random Name
        </button>
        {error && <div
          style={{
            color: "#ff0066",
            marginTop: ".88em",
            fontWeight: 700,
            fontFamily: "'Quicksand','Nunito'",
            fontSize: "1.17em"
          }}>{error}</div>}
        <div
          style={{
            marginTop: "2.7em",
            fontSize: "0.94em",
            color: "#9dc5fa",
            textAlign: "center"
          }}>
          <span style={{
            fontFamily: "'Press Start 2P', 'Bungee', cursive, sans-serif",
            color: "#e64fa5", fontSize: "1em"
          }}>🐦</span>{" "}
          Friendly doodle animals greet you!
        </div>
        {/* Quick mascot bounce animation */}
        <style>
          {`
            @keyframes mascotPop {
              0% {transform:scale(0.4) rotate(-30deg); opacity:0;}
              54% {transform:scale(1.16) rotate(4deg);}
              95% {transform:scale(0.95);}
              100% {transform:scale(1) rotate(0); opacity:1;}
            }
            @keyframes floatInPop {
              from {opacity:0; transform:scale(0.75) translateY(65px);}
              75% {transform:scale(1.09) translateY(-3px);}
              to {opacity:1; transform:scale(1) translateY(0);}
            }
          `}
        </style>
      </form>
    </div>
  );
}
