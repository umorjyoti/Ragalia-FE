import React from "react";
import "./Dashboard.css";
import waterIcon from "../../assets/images/water_icon.png";
import powerIcon from "../../assets/images/power_icon.png";

const DataReportCard = () => {
  return (
    <div className="report-card">
      <div className="dashboard-top-content report-content">
        <div className="report-title">Payments</div>
        {/* Add drop down component here */}
      </div>
      <div className="report-details-container">
        <div className="total-container">
          <div className="total-subtitle">Total</div>
          <div className="report-data-title">Rs. 40L</div>
        </div>
        <div className="report-color-data">
          <div className="color-data-block">
            <div className="report-color-blue" />
            <div className="color-data-text">Collected</div>
          </div>
          <div className="report-data-title">Rs. 40L</div>
        </div>
        <div className="report-color-data">
          <div className="color-data-block">
            <div className="report-color-green" />
            <div className="color-data-text">Due</div>
          </div>
          <div className="report-data-title">Rs. 40L</div>
        </div>
      </div>
      <div className="btn-submit-report">Send Rent Reminder</div>
    </div>
  );
};

const IssueCard = () => {
  return (
    <div className="issue-card">
      <div className="issue-icon-container">
        <img src={waterIcon} alt="" className="issue-icon" />
      </div>

      <div className="issue-detail">
        <div className="issue-title">Water Issue</div>
        <div className="issue-detail-desc">2 min ago - Complex, Unit 67.</div>
      </div>
    </div>
  );
};

const InformationCard = () => {
  return (
    <div className="information-card">
      <div className="dashboard-top-content">
        <div className="info-title">Updates</div>
        <div className="view-all-info">
          View All <span>{`>`}</span>
        </div>
      </div>
      <div className="issues-container">
        <IssueCard />
        <IssueCard />
        <IssueCard />
        <IssueCard />
      </div>
    </div>
  );
};

const ResidentBoard = () => {
  return (
    <div className="resident-board-container">
      <div className="resident-title">Dashboard</div>
    </div>
  );
};

const Dashboard = () => {
  return (
    <div className="dashboard-content-container">
      <div className="dashboard-top-content">
        <div className="dashboard-title">Dashboard</div>
        {/* Add drop down component here */}
      </div>
      <div className="report-card-container">
        <DataReportCard />
        <DataReportCard />
        <InformationCard />
      </div>
      <ResidentBoard />
    </div>
  );
};

export default Dashboard;
