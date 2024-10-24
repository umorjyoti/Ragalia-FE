import React, { useState } from "react";
import "./Navbar.css";

//inactive icons
import peopleIcon from "../../assets/images/people_icon.png";
import dashboardIcon from "../../assets/images/dashboard_icon.png";
import settingsIcon from "../../assets/images/settings_icon.png";
import logoutIcon from "../../assets/images/logout_icon.png";

//active icon
import propertiesIconActive from "../../assets/images/properties_icon_active.png";
import { useNavigate } from "react-router-dom";

const NavButton = ({ icon, onClickBtn, btnName, active = false }) => {
  return (
    <div
      onClick={() => onClickBtn(btnName)}
      className={
        active ? "nav-button-container btn-active" : "nav-button-container"
      }
    >
      <img src={icon} alt="" className="nav-button-icon" />
      <div
        className={active ? "nav-button-title text-active" : "nav-button-title"}
      >
        {btnName}
      </div>
    </div>
  );
};

const Navbar = () => {
  const navigate = useNavigate();

  const [activeBtn, setActiveBtn] = useState("Dashboard");

  const onClickNavBtn = (btnName) => {
    setActiveBtn(btnName);
    navigate(`/${btnName?.toLowerCase()}`);
  };
  return (
    <div className="navbar-container">
      <div className="nav-actions">
        <NavButton
          icon={dashboardIcon}
          onClickBtn={onClickNavBtn}
          btnName={"Dashboard"}
          active={activeBtn === "Dashboard"}
        />
        <NavButton
          icon={propertiesIconActive}
          onClickBtn={onClickNavBtn}
          btnName={"Properties"}
          active={activeBtn === "Properties"}
        />
        <NavButton
          icon={peopleIcon}
          onClickBtn={onClickNavBtn}
          btnName={"People"}
          active={activeBtn === "People"}
        />
      </div>
      <div className="nav-actions">
        <NavButton
          icon={settingsIcon}
          onClickBtn={onClickNavBtn}
          btnName={"Settings"}
          active={activeBtn === "Settings"}
        />
        <NavButton
          icon={logoutIcon}
          onClickBtn={onClickNavBtn}
          btnName={"Logout"}
          active={activeBtn === "Logout"}
        />
      </div>
    </div>
  );
};

export default Navbar;
