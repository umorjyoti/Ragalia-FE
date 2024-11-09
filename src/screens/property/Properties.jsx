import React, { useState } from "react";
import { Select, Tag, Tabs, Card, Avatar, Divider } from "antd";
import {
  ArrowDownOutlined,
  DownOutlined,
  UpOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "./Properties.css";
import mapicon from "../../assets/images/map-icon.png";

const { Option } = Select;
const { TabPane } = Tabs;

// Component for Property Dropdown Selector
const PropertySelect = ({ value, onChange, options }) => (
  <Select value={value} onChange={onChange} className="property-select">
    {options.map((option) => (
      <Option key={option} value={option.name}>
        {option.name}
      </Option>
    ))}
  </Select>
);

// Property Header Component
const PropertyHeader = ({ propertyName, location, occupantTypes }) => (
  <>
    <div className="property-name">
      <div className="name-sub">{propertyName}</div>
      <Tag color="green">Active</Tag>
    </div>
    <div className="location">
      <span>
        <img src={mapicon} alt="" className="location-img" />
      </span>
      {location}
    </div>
    <div className="occupant-types">
      {occupantTypes.map((type) => (
        <Tag key={type} className="occupant-tag">
          {type}
        </Tag>
      ))}
    </div>
  </>
);

// Stat Card Component for Payments, Rooms, Beds
const StatCard = ({ title, total, score }) => (
  <div className="stat-card">
    <div className="title-holder">
      <div className="title">{title}</div>
      <div className="score">
        {score}/{total}
      </div>
    </div>

    <div className="progress-bar">
      <div
        className="progress-bar-filled"
        style={{ width: `${(score / total) * 100}%` }}
      ></div>
    </div>
  </div>
);

// Room Card Component
const RoomCard = ({ room, expandedRoom, toggleRoomExpand }) => (
  <Card
    className={`room-card ${expandedRoom === room.roomNo ? "expanded" : ""}`}
    // title={`Room ${room.roomNo}`}
    title={
      <div className="header-container-card">
        <div className="room-title-card-header">Room {room.roomNo}</div>
        {expandedRoom === room.roomNo ? <UpOutlined /> : <DownOutlined />}
      </div>
    }
    onClick={() => toggleRoomExpand(room.roomNo)}
  >
    <div className="room-details">
      <span>
        {room.roomType} <div className="point" /> {room.beds.filled}/
        {room.beds.total} - Beds <div className="point" /> {room.gender}
      </span>
    </div>
    {expandedRoom === room.roomNo && (
      <div className="occupants">
        <div className="divider-card"></div>
        {room.occupants.map((occupant) => (
          <div key={occupant.id} className="occupant-info">
            <Avatar icon={<UserOutlined />} />
            <span>{occupant.name}</span>
          </div>
        ))}
      </div>
    )}
  </Card>
);

// Main PropertyDetails Component
const PropertyDetails = () => {
  // Define properties data
  const propertiesData = [
    {
      name: "Shri Venkateshwara PG",
      location: "HSR Layout",
      occupantTypes: ["Male", "Female", "Other"],
      graphs: [
        { title: "Payments", total: 100, score: 85 },
        { title: "Rooms", total: 234, score: 188 },
        { title: "Beds", total: 648, score: 494 },
      ],
      propertyStructure: generateRandomData(5, 10),
      propertyPhotos: [
        "https://picsum.photos/200/300?random=1",
        "https://picsum.photos/200/300?random=2",
        "https://picsum.photos/200/300?random=3",
      ],
    },
    {
      name: "Sri Lakshmi PG",
      location: "Koramangala",
      occupantTypes: ["Male", "Female"],
      graphs: [
        { title: "Payments", total: 120, score: 90 },
        { title: "Rooms", total: 150, score: 130 },
        { title: "Beds", total: 300, score: 250 },
      ],
      propertyStructure: generateRandomData(7, 15),
      propertyPhotos: [
        "https://picsum.photos/200/300?random=4",
        "https://picsum.photos/200/300?random=5",
        "https://picsum.photos/200/300?random=6",
      ],
    },
  ];

  const [selectedProperty, setSelectedProperty] = useState(propertiesData[0]);
  const [expandedRoom, setExpandedRoom] = useState(null);

  const handlePropertyChange = (propertyName) => {
    const property = propertiesData.find((p) => p.name === propertyName);
    setSelectedProperty(property);
    setExpandedRoom(null); // Close expanded room on property change
  };

  const handleFloorChange = (key) => {
    setExpandedRoom(null); // Close expanded room on floor change
  };

  const toggleRoomExpand = (roomNo) => {
    setExpandedRoom(expandedRoom === roomNo ? null : roomNo);
  };

  return (
    <div className="property-details">
      {/* Top Header */}
      <div className="top-header">
        <div className="properties-header">Properties</div>
        <PropertySelect
          value={selectedProperty.name}
          onChange={handlePropertyChange}
          options={propertiesData}
        />
      </div>

      {/* Property Details Header */}
      <div className="property-header">
        <div className="sub-header">Property details</div>
        <PropertyHeader
          propertyName={selectedProperty.name}
          location={selectedProperty.location}
          occupantTypes={selectedProperty.occupantTypes}
        />
      </div>

      <Divider />

      {/* Stats Section */}
      <div className="property-stats">
        {selectedProperty.graphs.map((graph) => (
          <StatCard
            key={graph.title}
            title={graph.title}
            total={graph.total}
            score={graph.score}
          />
        ))}
      </div>

      <Divider />

      {/* Floor Tabs */}
      <Tabs
        defaultActiveKey="0"
        onChange={handleFloorChange}
        className="floor-tabs"
      >
        {selectedProperty.propertyStructure.map((floor) => (
          <TabPane tab={`Floor ${floor.floorNo + 1}`} key={floor.floorNo}>
            {/* Rooms Section */}
            <div className="rooms-container">
              {floor.rooms.map((room) => (
                <RoomCard
                  key={room.roomNo}
                  room={room}
                  expandedRoom={expandedRoom}
                  toggleRoomExpand={toggleRoomExpand}
                />
              ))}
            </div>
          </TabPane>
        ))}
      </Tabs>

      <Divider />

      {/* Photos Section */}
      <div className="property-photos">
        {selectedProperty.propertyPhotos.map((photo, index) => (
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

// Generate random data for floors and rooms
const generateRandomData = (numFloors, maxRooms) => {
  const floors = [];
  for (let i = 0; i < numFloors; i++) {
    const rooms = [];
    for (let j = 1; j <= Math.floor(Math.random() * maxRooms) + 1; j++) {
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

export default PropertyDetails;
