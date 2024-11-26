import React, { useState } from "react";
import "./Reservation.css";
import { Button, Steps } from "antd";
import { useNavigate } from "react-router-dom";
import {
  CheckCircleFilled,
  MessageOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const { Step } = Steps;

const Reservation = () => {
  const navigate = useNavigate();
  const [reserveActive, setReserveActive] = useState("instant");

  const onClickNext = () => {
    navigate("/");
  };

  const onClickReserve = (item) => {
    setReserveActive(item);
  };

  return (
    <div className="reservation-property-container">
      {/* Ant Design Steps */}
      <Steps current={3} className="steps-container">
        <Step />
        <Step />
        <Step />
        <Step />
      </Steps>

      <div className="add-prop-header">
        <div className="add-property-text">Add Floor & Room</div>
        <Button className="save-exit-button">Save & Exit</Button>
      </div>

      <div className="building-photos">
        <div className="building-title">Building Photos</div>
        <div className="add-photos-btn">
          <PlusOutlined />
          <div className="text-plus">Add Photos</div>
        </div>
      </div>

      <div className="building-photos building-photos-top">
        <div className="building-title">Type of Reservation</div>
        <div className="reservaton-box-container">
          <div
            onClick={() => onClickReserve("instant")}
            className={
              reserveActive === "instant"
                ? "reservation-box reservation-box-active"
                : "reservation-box"
            }
          >
            <div className="icons-container">
              <PlusOutlined />
              <CheckCircleFilled />
            </div>
            <div className="reservation-header-text">
              Instant book (default)
            </div>
            <div className="reservation-sub-text">
              Tenants can book room/bed automatically
            </div>
          </div>
          <div
            onClick={() => onClickReserve("manual")}
            className={
              reserveActive === "manual"
                ? "reservation-box reservation-box-active"
                : "reservation-box"
            }
          >
            <div className="icons-container">
              <MessageOutlined />
            </div>
            <div className="reservation-header-text">Manually approve</div>
            <div className="reservation-sub-text">
              Tenants need to wait for owners approval
            </div>
          </div>
        </div>
      </div>

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

export default Reservation;
