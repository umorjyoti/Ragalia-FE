import React from "react";
import "./Navbar.css";

//inactive icons
import peopleIcon from "../../assets/images/people_icon.png";
import dashboardIcon from "../../assets/images/dashboard_icon.png";
import settingsIcon from "../../assets/images/settings_icon.png";
import logoutIcon from "../../assets/images/logout_icon.png";

//active icon
import propertiesIconActive from "../../assets/images/properties_icon_active.png";

const NavButton = ({ icon, onClickBtn, btnName, active = false }) => {
  return (
    <div
      onClick={onClickBtn}
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
  return (
    <div className="navbar-container">
      <div className="nav-actions">
        <NavButton
          icon={dashboardIcon}
          onClickBtn={() => {}}
          btnName={"Dashboard"}
        />
        <NavButton
          icon={propertiesIconActive}
          onClickBtn={() => {}}
          btnName={"Properties"}
          active={true}
        />
        <NavButton icon={peopleIcon} onClickBtn={() => {}} btnName={"People"} />
      </div>
      <div className="nav-actions">
        <NavButton
          icon={settingsIcon}
          onClickBtn={() => {}}
          btnName={"Settings"}
        />
        <NavButton icon={logoutIcon} onClickBtn={() => {}} btnName={"Logout"} />
      </div>
    </div>
  );
};

export default Navbar;
