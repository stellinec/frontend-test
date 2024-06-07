import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavBar } from './components/NavBar';
import { Ideas } from './components/Ideas';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <Router>
    <div className="App">
      <NavBar />
        <Routes>
          <Route path="/ideas" element={<Ideas />} />
        </Routes>
    </div>
  </Router>
  );
}

export default App;