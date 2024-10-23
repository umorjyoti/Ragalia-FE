import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./screens/Login";
import DashboardLayout from "./screens/dashboard/DashboardLayout";

function App() {
  const isAuthorised = false;

  return (
    <Router>
      {isAuthorised ? (
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="*" element={<DashboardLayout />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
