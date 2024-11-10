import React, { useState } from "react";
import "./Header.css";
import logo from "../../assets/images/rag-logo.png";
import { BRAND_NAME } from "../../constants";
import plusIcon from "../../assets/images/plus_icon.png";
import bellIcon from "../../assets/images/bell_icon.png";
import profilePic from "../../assets/images/tempProfile.jpg";
import { Button, Popover } from "antd";
import { useNavigate } from "react-router-dom";

const RoundedButton = ({ icon, onClickBtn }) => {
  return (
    <div onClick={onClickBtn} className="rounded-button-conatiner">
      <img src={icon} alt="" className="rounded-icon" />
    </div>
  );
};

const Avatar = ({}) => {
  return <img src={profilePic} alt="" className="avatar" />;
};

const Header = () => {
  const navigate = useNavigate();

  const [popOverOpen, setPopOverOpen] = useState(false);

  const onClickHide = () => {
    setPopOverOpen(false);
  };

  const handleOpenChange = () => {
    setPopOverOpen(true);
  };

  const onClickProperty = () => {
    onClickHide();
    navigate("/properties/add-property");
  };

  const onClickFloor = () => {
    onClickHide();
  };

  const onClickRoom = () => {
    onClickHide();
  };

  const onClickTenant = () => {
    onClickHide();
    navigate("/people/add");
  };

  const onClickProfile = () => {
    navigate("/profile");
  };

  const content = (
    <div className="content-add-property">
      <div onClick={onClickProperty} className="prop-sm-card">
        Property
      </div>
      <div onClick={onClickFloor} className="prop-sm-card">
        Floor
      </div>
      <div onClick={onClickRoom} className="prop-sm-card">
        Room
      </div>
      <div onClick={onClickTenant} className="prop-sm-card">
        Tenant
      </div>
    </div>
  );
  return (
    <div className="header-container">
      <div className="logo-name-continer">
        <img src={logo} alt="" className="rag-logo" />
        <div className="ragalia-title">{BRAND_NAME}</div>
      </div>
      <div className="header-action-buttons">
        <Popover
          trigger={"click"}
          content={content}
          placement="bottom"
          title={<div className="pop-over-title">Add New</div>}
          arrow={false}
          open={popOverOpen}
          onOpenChange={handleOpenChange}
        >
          <div className="rounded-button-conatiner">
            <img src={plusIcon} alt="" className="rounded-icon" />
          </div>
        </Popover>

        <RoundedButton icon={bellIcon} onClickBtn={() => {}} />
        <div onClick={onClickProfile}>
          <Avatar />
        </div>
      </div>
    </div>
  );
};

export default Header;
