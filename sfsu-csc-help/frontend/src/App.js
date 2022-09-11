import React, { Component }  from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import About from "./components/homepage/about.component";

class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<About />} />
        </Routes>
      </Router>
    );
  }
}
export default App;