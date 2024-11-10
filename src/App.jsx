import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./screens/Login";
import DashboardLayout from "./screens/dashboard/DashboardLayout";
import { useDispatch, useSelector } from "react-redux";
import { logout, setUser } from "./features/auth/authSlice";

const App = () => {
  const [isAuthorised, setIsAuthorised] = useState(true);
  const dispatch = useDispatch();

  const { userJWT } = useSelector((state) => state?.auth);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      setIsAuthorised(true);
      dispatch(setUser({ token }));
    } else {
      setIsAuthorised(false);
      dispatch(logout());
    }
  }, [dispatch, userJWT]);

  return (
    <Router>
      {!isAuthorised ? (
        <Routes>
          <Route path="*" element={<Login />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="*" element={<DashboardLayout />} />
        </Routes>
      )}
    </Router>
  );
};

export default App;
