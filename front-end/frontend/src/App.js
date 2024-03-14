import logo from "./logo.svg";
import "./App.css";
import Home from "./components/home/home";
import About from "./components/about/about";
import Login from "./components/login/login";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/login">Login</a>
          </li>
        </ul>
      </nav>
      <Router>
        <div>
          <hr />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
