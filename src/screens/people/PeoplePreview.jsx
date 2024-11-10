import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Divider } from "antd";
import "./PeoplePreview.css";

const tenantData = {
  image: "https://via.placeholder.com/100", // Placeholder image URL
  propertyName: "Shri Venkateswara PG",
  room: "Room 101",
  floor: "1st Floor",
  maxOccupants: "Four People",
  name: "S. Indra",
  moveIn: "26 Sep 2024",
  moveOut: "N/A",
  lockInPeriod: "N/A",
  noticePeriod: "N/A",
  rentAmount: "10,000",
  securityDeposit: "10,000",
  lateFee: "200",
  electricityBill: "Included",
  totalAmount: "20,000",
};

const PeoplePreview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isEditMode = location.pathname.includes("edit");

  const handleBack = () => {
    navigate(-1);
  };

  const onClickDone = () => {
    navigate("/");
  };

  return (
    <div className="people-preview-container">
      <div className="people-preview-container-title">
        {isEditMode ? "Tenant Preview" : "Tenant Invite Preview"}
      </div>

      {/* Header Section */}
      <div className="people-preview-container-header">
        <img
          src={tenantData.image || "placeholder.jpg"}
          alt="PG"
          className="people-preview-container-image"
        />
        <div className="people-preview-container-info">
          <h2>{tenantData.propertyName}</h2>
          <p>{tenantData.room}</p>
          <p>
            {tenantData.floor} • Up to {tenantData.maxOccupants} People
          </p>
        </div>
      </div>

      {/* Basic Details Section */}
      <h3 className="people-preview-container-section-title">Basic Details</h3>
      <div className="people-preview-container-details">
        <div className="people-preview-container-row">
          <span className="people-preview-container-label">Name</span>
          <span>{tenantData.name || "N/A"}</span>
        </div>
        <Divider />
        <div className="people-preview-container-row">
          <span className="people-preview-container-label">Move-In</span>
          <span>{tenantData.moveIn || "N/A"}</span>
        </div>
        <div className="people-preview-container-row">
          <span className="people-preview-container-label">Move-Out</span>
          <span>{tenantData.moveOut || "N/A"}</span>
        </div>
        <Divider />
        <div className="people-preview-container-row">
          <span className="people-preview-container-label">Lock-In Period</span>
          <span>{tenantData.lockInPeriod || "N/A"}</span>
        </div>
        <div className="people-preview-container-row">
          <span className="people-preview-container-label">Notice Period</span>
          <span>{tenantData.noticePeriod || "N/A"}</span>
        </div>
      </div>

      {/* Rent Details Section */}
      <h3 className="people-preview-container-section-title">Rent Details</h3>
      <div className="people-preview-container-details">
        <div className="people-preview-container-row">
          <span className="people-preview-container-label">Rent Amount</span>
          <span>Rs. {tenantData.rentAmount || "N/A"}</span>
        </div>
        <Divider />
        <div className="people-preview-container-row">
          <span className="people-preview-container-label">
            Security Deposit
          </span>
          <span>Rs. {tenantData.securityDeposit || "N/A"}</span>
        </div>
        <div className="people-preview-container-row">
          <span className="people-preview-container-label">
            Late Fee (After Due Date)
          </span>
          <span>Rs. {tenantData.lateFee || "N/A"}</span>
        </div>
        <div className="people-preview-container-row">
          <span className="people-preview-container-label">
            Electricity Bill
          </span>
          <span>{tenantData.electricityBill || "Excluded"}</span>
        </div>
        <Divider />
        <div className="people-preview-container-row">
          <span className="people-preview-container-label">To Pay</span>
          <span>Rs. {tenantData.totalAmount || "N/A"}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="people-preview-container-actions">
        <Button
          type="default"
          className="people-preview-container-back-btn"
          onClick={handleBack}
        >
          Go Back
        </Button>
        <Button
          onClick={onClickDone}
          type="primary"
          className="people-preview-container-invite-btn"
        >
          {isEditMode ? "Done" : "Send Invite"}
        </Button>
      </div>
    </div>
  );
};

export default PeoplePreview;
