import React, { Component }  from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import About from "./components/pages/about";
import Home from "./components/pages/home";
import Register from "./components/pages/register";
import Login from "./components/pages/login";
import Help from "./components/pages/help";
//import OpenAI from "./components/pages/api/openai";

class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/register" element={<Register />} />
                <Route path="/help" element={<Help />} />
                <Route path="/" element={<Login />} />
                {/*<Route path="/api/openai" element={<OpenAI />} />*/}
        </Routes>
      </Router>
    );
  }
}
export default App;