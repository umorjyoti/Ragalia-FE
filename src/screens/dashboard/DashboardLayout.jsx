import React from "react";
import "./DashboardLayout.css";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import NotFound from "../notFound/NotFound";
import Dashboard from "./Dashboard";

const DashboardLayout = () => {
  return (
    <>
      <Header />
      <div className="content-part">
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
};

export default DashboardLayout;
