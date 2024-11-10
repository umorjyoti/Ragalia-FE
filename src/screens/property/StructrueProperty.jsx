import React, { useState } from "react";
import {
  Button,
  Input,
  Select,
  DatePicker,
  Radio,
  Checkbox,
  Modal,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import "./StructureProperty.css";

const StructureProperty = () => {
  const [floors, setFloors] = useState([
    {
      floorNumber: 0,
      rooms: [
        {
          roomNumber: "001",
          type: "",
          sharing: "",
          rent: "",
          deposit: "",
          lateFee: "",
          availability: "",
          tenantType: "All",
          amenities: [],
        },
      ],
    },
  ]);
  const [selectedFloor, setSelectedFloor] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState(0);
  const [isFloorModalVisible, setIsFloorModalVisible] = useState(false);
  const [isRoomModalVisible, setIsRoomModalVisible] = useState(false);
  const [floorToDelete, setFloorToDelete] = useState(null);
  const [roomToDelete, setRoomToDelete] = useState(null);

  // Handle adding a new floor
  const addFloor = () => {
    const newFloorNumber = floors.length;
    setFloors([
      ...floors,
      {
        floorNumber: newFloorNumber,
        rooms: [
          {
            roomNumber: `${newFloorNumber}01`,
            type: "",
            sharing: "",
            rent: "",
            deposit: "",
            lateFee: "",
            availability: "",
            tenantType: "All",
            amenities: [],
          },
        ],
      },
    ]);
  };

  // Handle duplicating a floor
  const duplicateFloor = (floorNumber) => {
    const newFloorNumber = floors.length;
    const duplicatedRooms = floors[floorNumber].rooms.map((room) => ({
      ...room,
      roomNumber: `${newFloorNumber}${String(room.roomNumber).slice(1)}`,
    }));
    setFloors([
      ...floors,
      { floorNumber: newFloorNumber, rooms: duplicatedRooms },
    ]);
  };

  // Handle adding a new room
  const addRoom = () => {
    const newRoomNumber = `${selectedFloor}${String(
      floors[selectedFloor].rooms.length + 1
    ).padStart(2, "0")}`;
    const newRoom = {
      roomNumber: newRoomNumber,
      type: "",
      sharing: "",
      rent: "",
      deposit: "",
      lateFee: "",
      availability: "",
      tenantType: "All",
      amenities: [],
    };
    const updatedFloors = floors.map((floor, index) =>
      index === selectedFloor
        ? { ...floor, rooms: [...floor.rooms, newRoom] }
        : floor
    );
    setFloors(updatedFloors);
    setSelectedRoom(floors[selectedFloor].rooms.length); // Select the newly added room
  };

  // Handle room details change
  const handleRoomChange = (index, field, value) => {
    const updatedRooms = floors[selectedFloor].rooms.map((room, i) =>
      i === index ? { ...room, [field]: value } : room
    );
    const updatedFloors = floors.map((floor, i) =>
      i === selectedFloor ? { ...floor, rooms: updatedRooms } : floor
    );
    setFloors(updatedFloors);
  };

  // Handle room number change with prefix validation
  const handleRoomNumberChange = (index, value) => {
    if (value.startsWith(String(selectedFloor))) {
      handleRoomChange(index, "roomNumber", value);
    }
  };

  // Show delete floor modal with check
  const showDeleteFloorModal = (floorIndex) => {
    if (floors.length > 1) {
      setFloorToDelete(floorIndex);
      setIsFloorModalVisible(true);
    }
  };

  // Delete floor after confirmation
  const deleteFloor = () => {
    const updatedFloors = floors.filter((_, index) => index !== floorToDelete);
    setFloors(updatedFloors);
    setSelectedFloor(0); // Reset to first floor if current floor is deleted
    setIsFloorModalVisible(false);
  };

  // Show delete room modal with check
  const showDeleteRoomModal = (roomIndex) => {
    if (floors[selectedFloor].rooms.length > 1) {
      setRoomToDelete(roomIndex);
      setIsRoomModalVisible(true);
    }
  };

  // Delete room after confirmation
  const deleteRoom = () => {
    const updatedRooms = floors[selectedFloor].rooms.filter(
      (_, index) => index !== roomToDelete
    );
    const updatedFloors = floors.map((floor, index) =>
      index === selectedFloor ? { ...floor, rooms: updatedRooms } : floor
    );
    setFloors(updatedFloors);
    setSelectedRoom(0); // Reset to first room if current room is deleted
    setIsRoomModalVisible(false);
  };

  return (
    <div className="structure-property-container">
      <div className="floor-tabs">
        {floors.map((floor, index) => (
          <div key={index} className="floor-tab">
            <Button
              type={index === selectedFloor ? "primary" : "default"}
              onClick={() => setSelectedFloor(index)}
            >
              Floor {floor.floorNumber}
            </Button>
            {floors.length > 1 && (
              <Button
                type="text"
                danger
                onClick={() => showDeleteFloorModal(index)}
              >
                <DeleteOutlined />
              </Button>
            )}
          </div>
        ))}
        <Button onClick={addFloor}>+ Add Floor</Button>
      </div>

      <div className="floor-actions">
        <Select
          onChange={(value) => duplicateFloor(value)}
          placeholder="Duplicate Floor"
        >
          {floors.map((floor) => (
            <Select.Option key={floor.floorNumber} value={floor.floorNumber}>
              Floor {floor.floorNumber}
            </Select.Option>
          ))}
        </Select>
      </div>

      <div className="room-list">
        {floors[selectedFloor].rooms.map((room, index) => (
          <div key={index} className="room-tab">
            <Button
              type={index === selectedRoom ? "primary" : "dashed"}
              onClick={() => setSelectedRoom(index)}
            >
              Room {room.roomNumber}
            </Button>
            {floors[selectedFloor].rooms.length > 1 && (
              <Button
                type="text"
                danger
                onClick={() => showDeleteRoomModal(index)}
              >
                <DeleteOutlined />
              </Button>
            )}
          </div>
        ))}
        <Button onClick={addRoom}>+ Add Room</Button>
      </div>

      <div className="room-detail">
        <Input
          placeholder="Room Number"
          value={floors[selectedFloor].rooms[selectedRoom].roomNumber}
          onChange={(e) => handleRoomNumberChange(selectedRoom, e.target.value)}
        />
        <Select
          placeholder="Room Type"
          onChange={(value) => handleRoomChange(selectedRoom, "type", value)}
        >
          <Select.Option value="Single">Single</Select.Option>
          <Select.Option value="Double">Double</Select.Option>
        </Select>
        <Select
          placeholder="Sharing Type"
          onChange={(value) => handleRoomChange(selectedRoom, "sharing", value)}
        >
          <Select.Option value="Private">Private</Select.Option>
          <Select.Option value="Shared">Shared</Select.Option>
        </Select>
        <Input
          placeholder="Rent Amount"
          onChange={(e) =>
            handleRoomChange(selectedRoom, "rent", e.target.value)
          }
        />
        <Input
          placeholder="Security Deposit"
          onChange={(e) =>
            handleRoomChange(selectedRoom, "deposit", e.target.value)
          }
        />
        <Input
          placeholder="Late Fee"
          onChange={(e) =>
            handleRoomChange(selectedRoom, "lateFee", e.target.value)
          }
        />
        <DatePicker
          placeholder="Room Availability"
          onChange={(date, dateString) =>
            handleRoomChange(selectedRoom, "availability", dateString)
          }
        />

        <Radio.Group
          onChange={(e) =>
            handleRoomChange(selectedRoom, "tenantType", e.target.value)
          }
          defaultValue="All"
        >
          <Radio value="All">All</Radio>
          <Radio value="Boys">Boys</Radio>
          <Radio value="Girls">Girls</Radio>
          <Radio value="Other">Other</Radio>
        </Radio.Group>

        <div className="room-amenities">
          {[
            "T.V.",
            "A.C.",
            "Bed",
            "Washroom",
            "Geyser",
            "Furniture",
            "Laundry",
            "Balcony",
          ].map((amenity) => (
            <Checkbox
              key={amenity}
              onChange={(e) =>
                handleRoomChange(
                  selectedRoom,
                  "amenities",
                  e.target.checked
                    ? [
                        ...floors[selectedFloor].rooms[selectedRoom].amenities,
                        amenity,
                      ]
                    : floors[selectedFloor].rooms[
                        selectedRoom
                      ].amenities.filter((a) => a !== amenity)
                )
              }
            >
              {amenity}
            </Checkbox>
          ))}
        </div>
      </div>

      <div className="navigation-buttons">
        <Button type="default">Back</Button>
        <Button type="primary">Next</Button>
      </div>

      <Modal
        title={`Are you sure you want to delete Floor ${floorToDelete}?`}
        visible={isFloorModalVisible}
        onCancel={() => setIsFloorModalVisible(false)}
        onOk={deleteFloor}
      >
        <Button type="default" onClick={() => setIsFloorModalVisible(false)}>
          Cancel
        </Button>
        <Button type="primary" danger onClick={deleteFloor}>
          Delete
        </Button>
      </Modal>

      <Modal
        title={`Are you sure you want to delete Room ${
          roomToDelete !== null
            ? floors[selectedFloor].rooms[roomToDelete].roomNumber
            : ""
        }?`}
        visible={isRoomModalVisible}
        onCancel={() => setIsRoomModalVisible(false)}
        onOk={deleteRoom}
      >
        <Button type="default" onClick={() => setIsRoomModalVisible(false)}>
          Cancel
        </Button>
        <Button type="primary" danger onClick={deleteRoom}>
          Delete
        </Button>
      </Modal>
    </div>
  );
};

export default StructureProperty;
