import React, { useState } from "react";
import { Select, Tag, Tabs, Card, Tooltip, Avatar, Divider } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./Properties.css";

const { Option } = Select;
const { TabPane } = Tabs;

const generateRandomData = () => {
  const floors = [];
  for (let i = 0; i < 10; i++) {
    const rooms = [];
    for (let j = 1; j <= Math.floor(Math.random() * 20) + 1; j++) {
      const roomTypes = ["1-BHK", "2-BHK", "3-BHK"];
      const genders = ["Male", "Female", "Both"];
      const occupants = [];
      const roomType = roomTypes[Math.floor(Math.random() * roomTypes.length)];
      const gender = genders[Math.floor(Math.random() * genders.length)];
      const totalBeds = Math.floor(Math.random() * 4) + 1;
      const filledBeds = Math.floor(Math.random() * totalBeds) + 1;

      for (let k = 0; k < filledBeds; k++) {
        occupants.push({
          id: `${i}-${j}-${k}`,
          name: `Occupant ${k + 1}`,
        });
      }

      rooms.push({
        roomNo: j,
        roomType,
        beds: { total: totalBeds, filled: filledBeds },
        gender,
        occupants,
      });
    }
    floors.push({ floorNo: i, rooms });
  }
  return floors;
};

const propertyData = {
  propertyName: "Shri Venkateshwara PG",
  location: "HSR Layout",
  occupantTypes: ["Male", "Female", "Other"],
  graphs: [
    { title: "Payments", total: 100, score: 85 },
    { title: "Rooms", total: 234, score: 188 },
    { title: "Beds", total: 648, score: 494 },
  ],
  propertyStructure: generateRandomData(),
  propertyPhotos: [
    "https://picsum.photos/200/300?random=1",
    "https://picsum.photos/200/300?random=2",
    "https://picsum.photos/200/300?random=3",
  ],
};

const PropertyDetails = () => {
  const [selectedFloor, setSelectedFloor] = useState(0);
  const [expandedRoom, setExpandedRoom] = useState(null);

  const handleFloorChange = (key) => {
    setSelectedFloor(parseInt(key));
    setExpandedRoom(null); // Close expanded room on floor change
  };

  const toggleRoomExpand = (roomNo) => {
    setExpandedRoom(expandedRoom === roomNo ? null : roomNo);
  };

  return (
    <div className="property-details">
      {/* Top Header */}
      <div className="top-header">
        <h1>Properties</h1>
        <Select defaultValue="Shri Venkateshwara PG" style={{ width: 200 }}>
          <Option value="Shri Venkateshwara PG">Shri Venkateshwara PG</Option>
          <Option value="Sri Lakshmi">Sri Lakshmi</Option>
        </Select>
      </div>

      {/* Property Details Header */}
      <div className="property-header">
        <h2>Property details</h2>
        <div className="property-name">
          <h3>{propertyData.propertyName}</h3>
          <Tag color="green">Active</Tag>
        </div>
        <p className="location">{propertyData.location}</p>
        <div className="occupant-types">
          {propertyData.occupantTypes.map((type) => (
            <Tag key={type} className="occupant-tag">
              {type}
            </Tag>
          ))}
        </div>
      </div>

      <Divider />

      {/* Stats Section */}
      <div className="property-stats">
        {propertyData.graphs.map((graph) => (
          <div className="stat-card" key={graph.title}>
            <h4>{graph.title}</h4>
            <div className="progress-bar">
              <div
                className="progress-bar-filled"
                style={{ width: `${(graph.score / graph.total) * 100}%` }}
              ></div>
            </div>
            <div className="score">
              {graph.score}/{graph.total}
            </div>
          </div>
        ))}
      </div>

      <Divider />

      {/* Floor Tabs */}
      <Tabs
        defaultActiveKey="0"
        onChange={handleFloorChange}
        className="floor-tabs"
      >
        {propertyData.propertyStructure.map((floor) => (
          <TabPane tab={`Floor ${floor.floorNo + 1}`} key={floor.floorNo}>
            {/* Rooms Section */}
            <div className="rooms-container">
              {floor.rooms.map((room) => (
                <Card
                  className={`room-card ${
                    expandedRoom === room.roomNo ? "expanded" : ""
                  }`}
                  key={room.roomNo}
                  title={`Room ${room.roomNo} - ${room.roomType}`}
                  onClick={() => toggleRoomExpand(room.roomNo)}
                >
                  <div className="room-details">
                    <span>
                      {room.gender} - {room.beds.filled}/{room.beds.total} Beds
                    </span>
                  </div>
                  {expandedRoom === room.roomNo && (
                    <div className="occupants">
                      {room.occupants.map((occupant) => (
                        <div key={occupant.id} className="occupant-info">
                          <Avatar icon={<UserOutlined />} />
                          <span>{occupant.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </TabPane>
        ))}
      </Tabs>

      <Divider />

      {/* Photos Section */}
      <div className="property-photos">
        {propertyData.propertyPhotos.map((photo, index) => (
          <img
            key={index}
            src={photo}
            alt="Property"
            className="property-photo"
          />
        ))}
      </div>
    </div>
  );
};

export default PropertyDetails;
