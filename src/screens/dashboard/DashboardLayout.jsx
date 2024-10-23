import React from "react";
import "./DashboardLayout.css";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import { Route, Routes } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <>
      <Header />
      <div className="content-part">
        <Navbar />
        <Routes>
          <Route path="/" element={<div>hello</div>} />
        </Routes>
      </div>
    </>
  );
};

export default DashboardLayout;
