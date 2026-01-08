import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RatesPage from "./pages/RatesPage";
import Converter from './pages/Converter';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/convert" element={<Converter />} />
        <Route path="/rates" element={<RatesPage />} />
      </Routes>
    </Router>
  );
}

export default App;