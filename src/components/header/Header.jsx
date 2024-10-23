import React from "react";
import "./Header.css";
import logo from "../../assets/images/rag-logo.png";
import { BRAND_NAME } from "../../constants";
import plusIcon from "../../assets/images/plus_icon.png";
import bellIcon from "../../assets/images/bell_icon.png";
import profilePic from "../../assets/images/tempProfile.jpg";

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
  return (
    <div className="header-container">
      <div className="logo-name-continer">
        <img src={logo} alt="" className="rag-logo" />
        <div className="ragalia-title">{BRAND_NAME}</div>
      </div>
      <div className="header-action-buttons">
        <RoundedButton icon={plusIcon} onClickBtn={() => {}} />
        <RoundedButton icon={bellIcon} onClickBtn={() => {}} />
        <Avatar />
      </div>
    </div>
  );
};

export default Header;
