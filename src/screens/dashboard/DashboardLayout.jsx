import React from "react";
import "./DashboardLayout.css";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import NotFound from "../notFound/NotFound";
import Dashboard from "./Dashboard";
import AddProperty from "../property/AddProperty";
import AddAddress from "../property/AddAddress";
import PropertyDetails from "../property/Properties";
import PeopleDashboard from "../people/PeopleDashboard";
import PeopleDetails from "../people/PeopleDetail";
import EditPeople from "../people/EditPeople";
import PeoplePreview from "../people/PeoplePreview";
import SettingLanding from "../settings/SettingLanding";
import Profile from "../profile/Profile";

const DashboardLayout = () => {
  return (
    <>
      <Header />
      <div className="content-part">
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/properties" element={<PropertyDetails />} />
          <Route path="/properties/add-property" element={<AddProperty />} />
          <Route path="/properties/add-address" element={<AddAddress />} />
          <Route path="/properties/add-structure" element={<Dashboard />} />
          <Route path="/properties/add-others" element={<Dashboard />} />

          <Route path="/people" element={<PeopleDashboard />} />
          <Route path="/people/:name" element={<PeopleDetails />} />
          <Route path="/people/edit/:name" element={<EditPeople />} />
          <Route
            path="/people/edit/preview/:tenantid"
            element={<PeoplePreview />}
          />
          <Route path="/people/add" element={<EditPeople />} />
          <Route path="/people/preview/:tenantid" element={<PeoplePreview />} />

          <Route path="/settings" element={<SettingLanding />} />

          <Route path="/profile" element={<Profile />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
};

export default DashboardLayout;
