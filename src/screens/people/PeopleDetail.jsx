import React, { useState } from "react";
import { Button, Table } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import "./PeopleDetail.css";
import { DownOutlined, UpOutlined } from "@ant-design/icons";

const dummyTenantData = {
  profile: {
    name: "Siddharth Roy",
    phone: "+91-9876543210",
    gender: "Male",
    status: "Student",
    guardianName: "Gaurav Roy",
    guardianPhone: "+91-9876543210",
    profilePic: "https://via.placeholder.com/300x200", // Updated placeholder image
  },
  stayDetails: {
    property: "Shri Venkateshwara PG",
    unit: "1st/101",
    moveIn: "14/7/24",
    moveOut: "N/A",
    lockInPeriod: "N/A",
    noticePeriod: "N/A",
  },
  rentDetails: {
    rentAmount: 10000,
    securityDeposit: 10000,
    lateFee: 200,
    electricityBill: "Included",
  },
  paymentHistory: [
    { key: 1, month: "July", paid: 10000, due: 0, paymentMode: "Online" },
    { key: 2, month: "August", paid: 10000, due: 0, paymentMode: "Offline" },
    { key: 3, month: "September", paid: 0, due: 10000, paymentMode: "Pending" },
  ],
};

const PeopleDetails = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [payment, setPayment] = useState(false);
  const { profile, stayDetails, rentDetails, paymentHistory } = dummyTenantData;

  const paymentColumns = [
    {
      title: "S/N",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Month",
      dataIndex: "month",
      key: "month",
    },
    {
      title: "Paid (Rs.)",
      dataIndex: "paid",
      key: "paid",
    },
    {
      title: "Due (Rs.)",
      dataIndex: "due",
      key: "due",
    },
    {
      title: "Payment",
      dataIndex: "paymentMode",
      key: "paymentMode",
      render: (text) =>
        text === "Pending" ? (
          <span className="pending-status">{text}</span>
        ) : (
          text
        ),
    },
  ];

  const handleEditClick = () => {
    navigate(`/people/edit/${params?.name}`);
  };

  const onClickPayment = () => {
    setPayment(!payment);
  };

  return (
    <div className="people-details-container">
      {/* Page Header */}
      <div className="page-header">People</div>

      {/* Profile Section */}
      <div className="profile-section">
        <img
          src={profile.profilePic}
          alt="Profile"
          className="profile-picture"
        />
        <div className="profile-info">
          <div className="profile-info-name">{profile.name}</div>
          <div className="profile-info-others">
            {profile.phone} • {profile.gender} • {profile.status}
          </div>

          <Button className="edit-button" onClick={handleEditClick}>
            Edit Profile
          </Button>
        </div>
      </div>

      {/* Guardian Details */}

      <div className="section-title-detail">Guardian Details</div>

      <div className="details-section">
        <div className="details-row">
          <div>Name</div>
          <div>{profile.guardianName}</div>
        </div>
        <div className="details-row">
          <div>Phone Number</div>
          <div>{profile.guardianPhone}</div>
        </div>
      </div>

      {/* Stay Details */}
      <div className="section-title-detail">Stay Details</div>
      <div className="details-section">
        <div className="details-row">
          <div>Property</div>
          <div>{stayDetails.property}</div>
        </div>
        <div className="details-row">
          <div>Floor/Unit</div>
          <div>{stayDetails.unit}</div>
        </div>
        <hr />
        <div className="details-row">
          <div>Move-In</div>
          <div>{stayDetails.moveIn}</div>
        </div>
        <div className="details-row">
          <div>Move-Out</div>
          <div>{stayDetails.moveOut}</div>
        </div>
        <hr />
        <div className="details-row">
          <div>Lock-In Period</div>
          <div>{stayDetails.lockInPeriod}</div>
        </div>
        <div className="details-row">
          <div>Notice Period</div>
          <div>{stayDetails.noticePeriod}</div>
        </div>
      </div>

      {/* Rent Details */}
      <div className="section-title-detail">Rent Details</div>
      <div className="details-section">
        <div className="details-row">
          <div>Rent Amount</div>
          <div>Rs. {rentDetails.rentAmount}</div>
        </div>
        <div className="details-row">
          <div>Security Deposit</div>
          <div>Rs. {rentDetails.securityDeposit}</div>
        </div>
        <hr />
        <div className="details-row">
          <div>Late Fee</div>
          <div>Rs. {rentDetails.lateFee}</div>
        </div>
        <div className="details-row">
          <div>Electricity Bill</div>
          <div>{rentDetails.electricityBill}</div>
        </div>
      </div>

      {/* Payment History */}
      <div className="payment-history-section">
        <div className="payment-history-header">
          <div className="section-title-detail-payment">Payment History</div>
          <div style={{ cursor: "pointer" }} onClick={onClickPayment}>
            {payment ? (
              <UpOutlined style={{ color: "#fff" }} />
            ) : (
              <DownOutlined style={{ color: "#fff" }} />
            )}
          </div>
        </div>
        {payment && (
          <Table
            columns={paymentColumns}
            dataSource={paymentHistory}
            pagination={false}
            bordered
          />
        )}
      </div>
    </div>
  );
};

export default PeopleDetails;
