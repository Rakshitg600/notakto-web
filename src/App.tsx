import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import GamePageDuo from "./pages/GamePageDuo";
import GamePageSolo from "./pages/GamePageSolo";
import LiveMode from "./pages/LivePage";
import './index.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/solo" element={<GamePageSolo />} />
          <Route path="/duo" element={<GamePageDuo />} />
          <Route path="/live" element={<LiveMode />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;



