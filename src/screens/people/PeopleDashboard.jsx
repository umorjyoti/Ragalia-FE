import React, { useState } from "react";
import { Select, Tabs, Button, Input, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import "./PeopleDashboard.css";

const { Option } = Select;
const { TabPane } = Tabs;

const dummyData = {
  "Shri Lakshmi PG": {
    tenants: [
      {
        id: 1,
        name: "Siddharth Roy",
        unit: "001",
        payment: "Paid",
        due: 0,
        moveIn: "9/9/24",
      },
      {
        id: 2,
        name: "S. Indra",
        unit: "002",
        payment: "Paid",
        due: 0,
        moveIn: "15/8/24",
      },
      {
        id: 3,
        name: "V. Simha Reddy",
        unit: "003",
        payment: "Unpaid",
        due: 10000,
        moveIn: "13/1/24",
      },
      {
        id: 4,
        name: "Pavitr Prabhakar",
        unit: "004",
        payment: "Paid",
        due: 0,
        moveIn: "14/10/23",
      },
      {
        id: 5,
        name: "G. Singh",
        unit: "005",
        payment: "Unpaid",
        due: 10000,
        moveIn: "1/9/24",
      },
      {
        id: 6,
        name: "---",
        unit: "006",
        payment: "Vacant",
        due: "-",
        moveIn: "-",
      },
    ],
    leads: [
      {
        id: 1,
        name: "Siddharth Roy",
        unit: "001",
        moveIn: "20/9/24",
        contact: "+91-9876543210",
        status: "Payment Pending",
      },
      {
        id: 2,
        name: "S. Indra",
        unit: "003",
        moveIn: "21/9/24",
        contact: "+91-9876543210",
        status: "Accept",
      },
      {
        id: 3,
        name: "G. Singh",
        unit: "105",
        moveIn: "22/9/24",
        contact: "+91-9876543210",
        status: "Accept",
      },
      {
        id: 4,
        name: "V. Simha Reddy",
        unit: "201",
        moveIn: "23/9/24",
        contact: "+91-9876543210",
        status: "Accept",
      },
      {
        id: 5,
        name: "Pavitr Prabhakar",
        unit: "004",
        moveIn: "24/9/24",
        contact: "+91-9876543210",
        status: "Accept",
      },
    ],
  },
};

const PeopleDashboard = () => {
  const [selectedProperty, setSelectedProperty] = useState("Shri Lakshmi PG");
  const [activeTab, setActiveTab] = useState("tenants");
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const navigate = useNavigate();

  const handlePropertyChange = (value) => {
    setSelectedProperty(value);
    setSearchTerm("");
  };

  const handleTenantClick = (tenantName) => {
    navigate(`/people/${tenantName}`);
  };

  const handleLeadClick = (leadName) => {
    navigate(`/people/lead/${leadName}`);
  };

  const onClickAccept = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };
  const onClickReject = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const tenants = dummyData[selectedProperty]?.tenants || [];
  const leads = dummyData[selectedProperty]?.leads || [];

  const filteredTenants = tenants.filter((tenant) => {
    if (filter !== "All" && tenant.payment !== filter) return false;
    return tenant.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="people-dashboard-container">
      <div className="header">
        <div className="title">People</div>
        <Select
          defaultValue={selectedProperty}
          onChange={handlePropertyChange}
          className="property-dropdown"
        >
          <Option value="Shri Lakshmi PG">Shri Lakshmi PG</Option>
          <Option value="Shri Venkateshwara PG">Shri Venkateshwara PG</Option>
        </Select>
      </div>

      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane tab="Tenants" key="tenants">
          <div className="filter-section">
            <div className="tags">
              {["All", "Paid", "Unpaid", "Vacant"].map((tag) => (
                <Tag
                  key={tag}
                  className={
                    filter === tag ? "filter-tag active-tag" : "filter-tag"
                  }
                  onClick={() => setFilter(tag)}
                >
                  {tag}
                </Tag>
              ))}
            </div>
            <Input
              placeholder="Search tenant..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-bar"
            />
          </div>

          <div className="table-header">
            <div>S/N</div>
            <div>Name</div>
            <div>Unit</div>
            <div>Payment</div>
            <div>Due (Rs.)</div>
            <div>Move-In</div>
          </div>

          <div className="table">
            {filteredTenants?.map((tenant) => (
              <div
                key={tenant.id}
                className="table-row"
                onClick={() => handleTenantClick(tenant.name)}
              >
                <div>{tenant.id}.</div>
                <div>{tenant.name}</div>
                <div>{tenant.unit}</div>
                <div className={tenant?.payment?.toLowerCase()}>
                  {tenant?.payment}
                </div>
                <div>{tenant.due}</div>
                <div>{tenant.moveIn}</div>
              </div>
            ))}
          </div>
        </TabPane>

        <TabPane tab="Leads" key="leads">
          <div className="table-header">
            <div>S/N</div>
            <div>Name</div>
            <div>Unit</div>
            <div>Move-In</div>
            <div>Contact</div>
            <div>Status</div>
          </div>

          <div className="table">
            {leads?.map((lead) => (
              <div
                key={lead.id}
                className="table-row"
                onClick={() => handleLeadClick(lead.name)}
              >
                <div>{lead.id}.</div>
                <div>{lead.name}</div>
                <div>{lead.unit}</div>
                <div>{lead.moveIn}</div>
                <div>{lead.contact}</div>
                <div>
                  {lead.status === "Payment Pending" ? (
                    <Button className="pay-pending-btn" disabled>
                      {lead.status}
                    </Button>
                  ) : (
                    <div className="lead-btn-holder">
                      <Button
                        className="accept-btn-lead"
                        onClick={onClickAccept}
                      >
                        Accept
                      </Button>
                      <Button
                        className="reject-btn-lead"
                        onClick={onClickReject}
                      >
                        Reject
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default PeopleDashboard;
