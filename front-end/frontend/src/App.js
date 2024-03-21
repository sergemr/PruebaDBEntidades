import logo from "./logo.svg";
import "./App.css";
import Home from "./components/home/home";
import About from "./components/about/about";
import Login from "./components/login/login";
import Register from "./components/register/register";
import Users from "./components/users/users";
import Arrays from "./components/Arrays/Arrays";

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
            <a href="/arrays">Arrays</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/login">Login</a>
          </li>
          <li>
            <a href="/register">Register</a>
          </li>
          <li>
            <a href="/users">Users</a>
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
            <Route path="/register" element={<Register />} />
            <Route path="/users" element={<Users />} />
            <Route path="/arrays" element={<Arrays />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
