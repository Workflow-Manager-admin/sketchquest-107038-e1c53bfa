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

  return (
    <div className="skq-login-modal">
      <form className="skq-login-box" onSubmit={handleSubmit} autoComplete="off">
        <div style={{fontWeight: 700, fontSize:"1.34em", letterSpacing:"1.5px"}}>
          Welcome to <span role="img" aria-label="draw">🎨</span> SketchQuest!
        </div>
        <div style={{marginTop:"0.72em"}}>Pick a fun username:</div>
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
        />
        <button type="submit">Enter</button>
        <button
          style={{
            background: "#0bbd9b",
            color: "#f5f5f5",
            marginTop: "0.35em",
            fontSize: "0.98em",
            border: "none",
            padding: "0.37em 0.97em",
            borderRadius: "1.1em",
            marginLeft: "10px",
          }}
          type="button"
          onClick={() => setName(randomName())}
        >
          Random Name
        </button>
        {error && <div style={{ color: "#ff0066", marginTop: ".6em", fontWeight: 600 }}>{error}</div>}
      </form>
    </div>
  );
}
