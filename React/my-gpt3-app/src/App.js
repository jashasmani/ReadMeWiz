import React from "react";
import Login from "./Components/Login/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SidebarItems from "./Components/Navbar/Navbar";

const App = () => {
  return (
    <Router>
      <>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<SidebarItems />} />
        </Routes>
      </>
    </Router>
  );
};

export default App;
