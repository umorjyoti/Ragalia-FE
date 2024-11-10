import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Input,
  Select,
  DatePicker,
  InputNumber,
  Radio,
  Button,
  Divider,
} from "antd";
import "./EditPeople.css";

const { Option } = Select;

const EditPeople = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isEditMode = location.pathname.includes("edit");

  const [formData, setFormData] = useState({
    tenantName: "",
    tenantPhoneNumber: "",
    floor: "",
    room: "",
    moveIn: null,
    moveOut: null,
    lockInPeriod: "",
    noticePeriod: "",
    rentAmount: "",
    securityDeposit: "",
    lateFee: "",
    electricityBill: "Excluded",
  });

  const requiredFields = isEditMode
    ? ["floor", "room", "moveIn", "rentAmount", "securityDeposit"]
    : [
        "tenantName",
        "tenantPhoneNumber",
        "floor",
        "room",
        "moveIn",
        "rentAmount",
        "securityDeposit",
      ];

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handlePreview = () => {
    console.log("Form Data:", formData);
    isEditMode
      ? navigate(`/people/edit/preview/${formData?.floor}`)
      : navigate(`/people/preview/${formData?.tenantPhoneNumber}`);
  };

  return (
    <div className="edit-tenant-container">
      <h1>{isEditMode ? "Edit Tenant" : "Add Tenant"}</h1>

      {!isEditMode && (
        <>
          <h3 className="edit-tenant-container-section-title">Basic details</h3>
          <div className="edit-tenant-container-row">
            <div className="edit-tenant-container-field">
              <label>Tenant Name</label>
              <Input
                placeholder="Enter Name"
                value={formData.tenantName}
                onChange={(e) => handleChange("tenantName", e.target.value)}
                required={requiredFields.includes("tenantName")}
              />
            </div>
            <div className="edit-tenant-container-field">
              <label>Tenant Phone Number</label>
              <Input
                placeholder="Enter Phone Number"
                value={formData.tenantPhoneNumber}
                onChange={(e) =>
                  handleChange("tenantPhoneNumber", e.target.value)
                }
                required={requiredFields.includes("tenantPhoneNumber")}
              />
            </div>
          </div>
          <Divider />
        </>
      )}

      <h3 className="edit-tenant-container-section-title">Stay details</h3>
      <div className="edit-tenant-container-row">
        <div className="edit-tenant-container-field">
          <label>Floor</label>
          <Select
            placeholder="Select"
            defaultActiveFirstOption
            value={formData.floor}
            onChange={(value) => handleChange("floor", value)}
            required={requiredFields.includes("floor")}
          >
            <Option value="1">Floor 1</Option>
            <Option value="2">Floor 2</Option>
          </Select>
        </div>
        <div className="edit-tenant-container-field">
          <label>Room</label>
          <Select
            placeholder="Select"
            defaultActiveFirstOption
            value={formData.room}
            onChange={(value) => handleChange("room", value)}
            required={requiredFields.includes("room")}
          >
            <Option value="101">Room 101</Option>
            <Option value="102">Room 102</Option>
          </Select>
        </div>
      </div>

      <div className="edit-tenant-container-row">
        <div className="edit-tenant-container-field">
          <label>Move-In</label>
          <DatePicker
            placeholder="Move-In"
            value={formData.moveIn}
            onChange={(date) => handleChange("moveIn", date)}
            required={requiredFields.includes("moveIn")}
            format="DD/MM/YY"
          />
        </div>
        <div className="edit-tenant-container-field">
          <label>Move-Out (Optional)</label>
          <DatePicker
            placeholder="Move-Out (Optional)"
            value={formData.moveOut}
            onChange={(date) => handleChange("moveOut", date)}
            format="DD/MM/YY"
          />
        </div>
      </div>

      <div className="edit-tenant-container-row">
        <div className="edit-tenant-container-field">
          <label>Lock-in Period (Optional)</label>
          <InputNumber
            placeholder="Enter in Days"
            value={formData.lockInPeriod}
            onChange={(value) => handleChange("lockInPeriod", value)}
          />
        </div>
        <div className="edit-tenant-container-field">
          <label>Notice Period (Optional)</label>
          <InputNumber
            placeholder="Enter in Days"
            value={formData.noticePeriod}
            onChange={(value) => handleChange("noticePeriod", value)}
          />
        </div>
      </div>

      <Divider />

      <h3 className="edit-tenant-container-section-title">Rent Details</h3>
      <div className="edit-tenant-container-row">
        <div className="edit-tenant-container-field">
          <label>Rent Amount</label>
          <InputNumber
            placeholder="Enter in Rupees"
            value={formData.rentAmount}
            onChange={(value) => handleChange("rentAmount", value)}
            required={requiredFields.includes("rentAmount")}
          />
        </div>
        <div className="edit-tenant-container-field">
          <label>Security Deposit</label>
          <InputNumber
            placeholder="Enter in Rupees"
            value={formData.securityDeposit}
            onChange={(value) => handleChange("securityDeposit", value)}
            required={requiredFields.includes("securityDeposit")}
          />
        </div>
      </div>

      <div className="edit-tenant-container-row">
        <div className="edit-tenant-container-field">
          <label>Late Fee</label>
          <InputNumber
            placeholder="Enter in Rupees"
            value={formData.lateFee}
            onChange={(value) => handleChange("lateFee", value)}
          />
        </div>
        <div className="edit-tenant-container-field">
          <label>Electricity Bill</label>
          <Radio.Group
            onChange={(e) => handleChange("electricityBill", e.target.value)}
            value={formData.electricityBill}
          >
            <Radio value="Excluded">Excluded</Radio>
            <Radio value="Included">Included</Radio>
          </Radio.Group>
        </div>
      </div>

      <div className="edit-tenant-container-actions">
        <Button type="default" className="edit-tenant-container-cancel-btn">
          Cancel
        </Button>
        <Button
          type="primary"
          className="edit-tenant-container-preview-btn"
          onClick={handlePreview}
        >
          See Preview
        </Button>
      </div>
    </div>
  );
};

export default EditPeople;
