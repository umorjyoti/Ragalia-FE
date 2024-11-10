import React, { useEffect, useState } from "react";
import "./Navbar.css";

//inactive icons
import peopleIcon from "../../assets/images/people_icon.png";
import dashboardIcon from "../../assets/images/dashboard_icon.png";
import settingsIcon from "../../assets/images/settings_icon.png";
import logoutIcon from "../../assets/images/logout_icon.png";
import propertiesIcon from "../../assets/images/properties_icon.png";

//active icon
import propertiesIconActive from "../../assets/images/properties_icon_active.png";
import peopleIconActive from "../../assets/images/people_icon_active.png";
import settingsIconActive from "../../assets/images/settings_active.png";
import dashboardIconActive from "../../assets/images/dashboard_active.png";
import logoutIconActive from "../../assets/images/logout_active.png";

import { useLocation, useNavigate } from "react-router-dom";
import { Button, Modal } from "antd";
import Lottie from "react-lottie";

import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import door from "../../assets/json/logout.json";

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
  const location = useLocation();
  const dispatch = useDispatch();

  const [activeBtn, setActiveBtn] = useState("");
  const [logoutModal, setLogOutModal] = useState(false);

  const onClickNavBtn = (btnName) => {
    if (btnName === "Logout") {
      setLogOutModal(true);
      return;
    }
    navigate(`/${btnName?.toLowerCase()}`);
  };

  useEffect(() => {
    if (location.pathname.includes("dashboard") || location.pathname === "/")
      setActiveBtn("dashboard");
    else if (location.pathname.includes("properties"))
      setActiveBtn("properties");
    else if (location.pathname.includes("people")) setActiveBtn("people");
    else if (location.pathname.includes("settings")) setActiveBtn("settings");
    else setActiveBtn("");
  }, [location]);

  const handleLogout = () => {
    dispatch(logout());
  };

  const onClickCancel = () => {
    setLogOutModal(false);
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    renderer: "svg",
    animationData: door,
  };

  return (
    <div className="navbar-container">
      <div className="nav-actions">
        <NavButton
          icon={
            activeBtn === "Dashboard"?.toLocaleLowerCase()
              ? dashboardIconActive
              : dashboardIcon
          }
          onClickBtn={onClickNavBtn}
          btnName={"Dashboard"}
          active={activeBtn === "Dashboard"?.toLocaleLowerCase()}
        />
        <NavButton
          icon={
            activeBtn === "Properties"?.toLocaleLowerCase()
              ? propertiesIconActive
              : propertiesIcon
          }
          onClickBtn={onClickNavBtn}
          btnName={"Properties"}
          active={activeBtn === "Properties"?.toLocaleLowerCase()}
        />
        <NavButton
          icon={
            activeBtn === "People"?.toLocaleLowerCase()
              ? peopleIconActive
              : peopleIcon
          }
          onClickBtn={onClickNavBtn}
          btnName={"People"}
          active={activeBtn === "People"?.toLocaleLowerCase()}
        />
      </div>
      <div className="nav-actions">
        <NavButton
          icon={
            activeBtn === "Settings"?.toLocaleLowerCase()
              ? settingsIconActive
              : settingsIcon
          }
          onClickBtn={onClickNavBtn}
          btnName={"Settings"}
          active={activeBtn === "Settings"?.toLocaleLowerCase()}
        />
        <NavButton
          icon={activeBtn === "Logout" ? logoutIconActive : logoutIcon}
          onClickBtn={onClickNavBtn}
          btnName={"Logout"}
          active={activeBtn === "Logout"}
        />
      </div>

      <Modal
        open={logoutModal}
        footer={false}
        centered
        closeIcon={false}
        width={500}
        height={300}
      >
        <div className="logout-modal-container">
          <Lottie options={{ ...defaultOptions }} width={200} />
          <div className="logout-sure-text">
            Are you sure you want to log out?
          </div>
          <div className="btn-holder">
            <Button
              onClick={onClickCancel}
              className="logout-modal-container-cancel-btn"
            >
              Cancel
            </Button>
            <Button
              onClick={handleLogout}
              className="logout-modal-container-preview-btn"
              type="primary"
            >
              Logout
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Navbar;
