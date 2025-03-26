import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import GamePage from "./pages/GamePage";
import LiveMode from "./pages/LivePage";
import './index.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/live" element={<LiveMode />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;



