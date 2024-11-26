import React, { useEffect, useState } from "react";
import {
  Button,
  Input,
  Select,
  DatePicker,
  Radio,
  Checkbox,
  Modal,
  Steps,
  Form,
} from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import "./StructureProperty.css";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const { Step } = Steps;
const { Option } = Select;

const RenderRoomData = ({ currentRoom, handleRoomDetailChange }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    console.log("c", currentRoom);
    if (currentRoom) {
      form.setFieldsValue({
        room_number: currentRoom.roomNumber,
        room_type: currentRoom.type,
        sharing_type: currentRoom.sharing,
        rent_amount: currentRoom.rent,
        security_deposit: currentRoom.deposit,
        late_fee: currentRoom.lateFee,
        room_availability:
          currentRoom.availability && moment(currentRoom.availability).isValid()
            ? moment(currentRoom.availability)
            : null,
        tenant_type: currentRoom.tenantType,
        room_ammenities: currentRoom.amenities,
      });
    }
  }, [currentRoom, form]);

  return (
    <Form form={form} layout="vertical" className="room-details">
      <Form.Item
        label="Room Number"
        name={"room_number"}
        className="form-item-stuct"
      >
        <Input
          placeholder="Room Number"
          value={currentRoom?.roomNumber}
          onChange={(e) =>
            handleRoomDetailChange("roomNumber", e?.target?.value)
          }
        />
      </Form.Item>
      <Form.Item
        className="form-item-stuct"
        label="Room Type"
        name={"room_type"}
      >
        <Select
          placeholder="Room Type"
          value={currentRoom?.type}
          onChange={(value) => handleRoomDetailChange("type", value)}
        >
          <Option value="Single">Single</Option>
          <Option value="Double">Double</Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Sharing Type"
        name="sharing_type"
        className="form-item-stuct"
      >
        <Select
          placeholder="Sharing Type"
          value={currentRoom?.sharing}
          onChange={(value) => handleRoomDetailChange("sharing", value)}
        >
          <Option value="Private">Private</Option>
          <Option value="Shared">Shared</Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Rent Amount"
        name={"rent_amount"}
        className="form-item-stuct"
      >
        <Input
          placeholder="Rent Amount"
          value={currentRoom?.rent}
          onChange={(e) => handleRoomDetailChange("rent", e.target.value)}
        />
      </Form.Item>
      <Form.Item
        label="Security Deposit"
        name={"security_deposit"}
        className="form-item-stuct"
      >
        <Input
          placeholder="Security Deposit"
          value={currentRoom?.deposit}
          onChange={(e) => handleRoomDetailChange("deposit", e.target.value)}
        />
      </Form.Item>
      <Form.Item label="Late Fee" name="late_fee" className="form-item-stuct">
        <Input
          placeholder="Late Fee"
          value={currentRoom?.lateFee}
          onChange={(e) => handleRoomDetailChange("lateFee", e.target.value)}
        />
      </Form.Item>
      <Form.Item
        label="Room Availability"
        name={"room_availability"}
        className="form-item-stuct"
      >
        <DatePicker
          placeholder="Room Availability"
          value={
            currentRoom?.availability ? moment(currentRoom.availability) : null
          }
          onChange={(date, dateString) =>
            handleRoomDetailChange("availability", dateString)
          }
        />
      </Form.Item>
      <Form.Item
        className="full-width-form"
        label="Available For"
        name="tenant_type"
      >
        <Radio.Group
          value={currentRoom?.tenantType}
          onChange={(e) => handleRoomDetailChange("tenantType", e.target.value)}
        >
          <Radio value="All">All</Radio>
          <Radio value="Boys">Boys</Radio>
          <Radio value="Girls">Girls</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        className="full-width-form"
        label="Room Ammenities"
        name="room_ammenities"
      >
        <Checkbox.Group
          options={[
            "TV",
            "AC",
            "Bed",
            "Washroom",
            "Geyser",
            "Furniture",
            "Laundry",
            "Balcony",
          ]}
          value={currentRoom?.amenities}
          onChange={(checkedValues) =>
            handleRoomDetailChange("amenities", checkedValues)
          }
        />
      </Form.Item>
    </Form>
  );
};

const StructureProperty = () => {
  const navigate = useNavigate();

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
  const [duplicateRoomFloor, setDuplicateRoomFloor] = useState(null);
  const [duplicateRoomIndex, setDuplicateRoomIndex] = useState(null);
  const [currentRoom, setCurrentRoom] = useState();

  // Show add floor modal
  const showAddFloorModal = () => setIsFloorModalVisible(true);

  // Generate unique room number based on floor and number of rooms
  const generateRoomNumber = (floorNumber, roomCount) =>
    `${floorNumber}${String(roomCount + 1).padStart(2, "0")}`;

  // Add a new floor
  const addNewFloor = () => {
    const newFloorNumber = floors.length;
    const newFloor = {
      floorNumber: newFloorNumber,
      rooms: [
        {
          roomNumber: generateRoomNumber(newFloorNumber, 0),
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
    };
    setFloors([...floors, newFloor]);
    setSelectedFloor(newFloorNumber);
    setSelectedRoom(0);
    setIsFloorModalVisible(false);
  };

  // Duplicate an existing floor
  const duplicateFloor = (floorNumber) => {
    const newFloorNumber = floors.length;
    const duplicatedRooms = floors[floorNumber].rooms.map((room, index) => ({
      ...room,
      roomNumber: generateRoomNumber(newFloorNumber, index),
    }));
    const newFloor = { floorNumber: newFloorNumber, rooms: duplicatedRooms };
    setFloors([...floors, newFloor]);
    setSelectedFloor(newFloorNumber);
    setSelectedRoom(0);
    setIsFloorModalVisible(false);
  };

  // Add a new room
  const addNewRoom = () => {
    const roomCount = floors?.[selectedFloor]?.rooms?.length;
    const newRoomNumber = generateRoomNumber(selectedFloor, roomCount);
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
    const updatedFloors = floors?.map((floor, index) =>
      index === selectedFloor
        ? { ...floor, rooms: [...floor.rooms, newRoom] }
        : floor
    );
    setFloors(updatedFloors);
    setSelectedRoom(roomCount);
    setIsRoomModalVisible(false);
  };

  // Duplicate an existing room from a selected floor and room
  const duplicateRoom = () => {
    if (duplicateRoomFloor !== null && duplicateRoomIndex !== null) {
      const selectedRoomData =
        floors[duplicateRoomFloor]?.rooms[duplicateRoomIndex];
      const roomCount = floors?.[selectedFloor]?.rooms?.length;
      const newRoomNumber = generateRoomNumber(selectedFloor, roomCount);
      const duplicatedRoom = { ...selectedRoomData, roomNumber: newRoomNumber };
      const updatedFloors = floors?.map((floor, index) =>
        index === selectedFloor
          ? { ...floor, rooms: [...floor?.rooms, duplicatedRoom] }
          : floor
      );
      setFloors(updatedFloors);
      setSelectedRoom(roomCount);
    }
    setIsRoomModalVisible(false);
  };

  // Delete a floor
  const deleteFloor = (floorIndex) => {
    if (floors?.length > 1) {
      setFloors(floors?.filter((_, index) => index !== floorIndex));
      setSelectedFloor(0);
      setSelectedRoom(0);
    }
  };

  // Delete a room
  const deleteRoom = (floorIndex, roomIndex) => {
    if (floors?.[floorIndex]?.rooms.length > 1) {
      const updatedFloors = floors?.map((floor, index) =>
        index === floorIndex
          ? {
              ...floor,
              rooms: floor?.rooms.filter((_, rIndex) => rIndex !== roomIndex),
            }
          : floor
      );
      setFloors(updatedFloors);
      setSelectedRoom(0);
    }
  };

  // Room detail input handler
  const handleRoomDetailChange = (field, value) => {
    const updatedFloors = floors?.map((floor, floorIndex) =>
      floorIndex === selectedFloor
        ? {
            ...floor,
            rooms: floor?.rooms?.map((room, roomIndex) =>
              roomIndex === selectedRoom ? { ...room, [field]: value } : room
            ),
          }
        : floor
    );
    setFloors(updatedFloors);
  };

  const onClickNext = () => {
    navigate("/properties/reservation");
  };

  useEffect(() => {
    setCurrentRoom(floors?.[selectedFloor]?.rooms?.[selectedRoom]);
  }, [selectedFloor, selectedRoom]);

  return (
    <div className="structure-property-container">
      {/* Ant Design Steps */}
      <Steps current={2} className="steps-container">
        <Step />
        <Step />
        <Step />
        <Step />
      </Steps>

      <div className="add-prop-header">
        <div className="add-property-text">Add Floor & Room</div>
        <Button className="save-exit-button">Save & Exit</Button>
      </div>

      {/* Floors List */}
      <div className="floors-list">
        {floors?.map((floor, index) => (
          <div key={index} className="floor-item">
            <Button
              type={index === selectedFloor ? "primary" : "default"}
              onClick={() => setSelectedFloor(index)}
            >
              Floor {floor.floorNumber + 1}
            </Button>
            {floors?.length > 1 && (
              <DeleteOutlined
                style={{ color: "red" }}
                onClick={() => deleteFloor(index)}
              />
            )}
          </div>
        ))}
        <Button icon={<PlusOutlined />} onClick={showAddFloorModal}>
          Add Floor
        </Button>
      </div>
      <div className="room-data">
        {/* Rooms List */}
        <div className="rooms-list">
          {floors?.[selectedFloor]?.rooms?.map((room, index) => (
            <div key={index} className="room-item">
              <Button
                type={index === selectedRoom ? "primary" : "default"}
                onClick={() => setSelectedRoom(index)}
              >
                Room {room?.roomNumber}
              </Button>
              {floors?.[selectedFloor]?.rooms?.length > 1 && (
                <Button
                  type="danger"
                  icon={<DeleteOutlined />}
                  onClick={() => deleteRoom(selectedFloor, index)}
                >
                  Delete
                </Button>
              )}
            </div>
          ))}
          <Button
            icon={<PlusOutlined />}
            onClick={() => setIsRoomModalVisible(true)}
          >
            Add Room
          </Button>
        </div>

        {/* Room Details */}
        <RenderRoomData
          currentRoom={currentRoom}
          handleRoomDetailChange={handleRoomDetailChange}
        />
      </div>
      {/* Modals */}
      <Modal
        title="Add Floor"
        visible={isFloorModalVisible}
        onOk={addNewFloor}
        onCancel={() => setIsFloorModalVisible(false)}
      >
        <Button onClick={addNewFloor}>Create New Floor</Button>
        <Button onClick={() => duplicateFloor(selectedFloor)}>
          Duplicate Floor
        </Button>
      </Modal>

      <Modal
        title="Add Room"
        visible={isRoomModalVisible}
        onOk={addNewRoom}
        onCancel={() => setIsRoomModalVisible(false)}
      >
        <div>
          <Select
            placeholder="Select Floor for Duplication"
            onChange={(value) => setDuplicateRoomFloor(value)}
            style={{ width: "100%", marginBottom: 10 }}
          >
            {floors.map((floor, floorIndex) => (
              <Option key={floorIndex} value={floorIndex}>
                Floor {floor.floorNumber + 1}
              </Option>
            ))}
          </Select>
          {duplicateRoomFloor !== null && (
            <Select
              placeholder="Select Room for Duplication"
              onChange={(value) => setDuplicateRoomIndex(value)}
              style={{ width: "100%" }}
            >
              {floors?.[duplicateRoomFloor]?.rooms?.map((room, roomIndex) => (
                <Option key={roomIndex} value={roomIndex}>
                  Room {room.roomNumber}
                </Option>
              ))}
            </Select>
          )}
        </div>
        <Button onClick={addNewRoom}>Create New Room</Button>
        <Button onClick={duplicateRoom}>Duplicate Room</Button>
      </Modal>
      <div className="button-group">
        <Button className="back-btn">Back</Button>
        <Button
          className="active-btn"
          type="primary"
          disabled={false}
          onClick={onClickNext}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default StructureProperty;
