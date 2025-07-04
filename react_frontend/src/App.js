import React, { useState } from "react";
import "./App.css";
import Header from "./features/Header";
import Login from "./features/Login";
import Dashboard from "./features/Dashboard";
import DrawingModal from "./features/DrawingModal";
import GuessBar from "./features/GuessBar";

// PUBLIC_INTERFACE
function App() {
  // App-level UI state
  const [username, setUsername] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [drawings, setDrawings] = useState([]);
  const [topDrawing, setTopDrawing] = useState(null);
  const [wrongGuesses, setWrongGuesses] = useState([]);
  const [dashboardRefreshKey, setDashboardRefreshKey] = useState(0);

  // Handler for "login" (anonymous username)
  const handleLogin = (user) => setUsername(user);

  // Handler for finishing a drawing
  const handleDrawingComplete = (drawing) => {
    setDrawings((prev) => [drawing, ...prev]);
    setShowModal(false);
    setDashboardRefreshKey((k) => k + 1);
  };

  // Handler for opening drawing modal
  const handleDrawClick = () => setShowModal(true);

  // Handler for when a guess is made
  const handleGuessResult = (guessedCorrectly, drawingId, guess) => {
    if (!guessedCorrectly) {
      setWrongGuesses((arr) => [...arr, guess]);
    }
    // No-op for correct guesses; real update would be with backend.
  };

  // Handler to set Top Drawing (could be repopulated in a real app)
  const handleHighlightTopDrawing = (drawing) => setTopDrawing(drawing);

  // Handler for closing the drawing modal
  const handleModalClose = () => setShowModal(false);

  return (
    <div className="skq-app">
      {!username ? (
        <Login onLogin={handleLogin} />
      ) : (
        <>
          <Header
            username={username}
            onDrawClick={handleDrawClick}
          />
          <main className="skq-main">
            <Dashboard
              drawings={drawings}
              topDrawing={topDrawing}
              onGuess={handleGuessResult}
              onHighlightTopDrawing={handleHighlightTopDrawing}
              key={dashboardRefreshKey}
            />
            <GuessBar
              wrongGuesses={wrongGuesses}
              setWrongGuesses={setWrongGuesses}
            />
          </main>
          {showModal && (
            <DrawingModal
              onDrawingComplete={handleDrawingComplete}
              onClose={handleModalClose}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;
