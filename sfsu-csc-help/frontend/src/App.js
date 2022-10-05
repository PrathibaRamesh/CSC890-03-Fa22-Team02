import React, { Component }  from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import About from "./components/pages/about.component";
import Register from "./components/pages/register";
import Login from "./components/pages/login";

class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
                <Route path="/home" element={<About />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    );
  }
}
export default App;