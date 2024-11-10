import React from "react";
import "./SettingLanding.css";

import notification from "../../assets/images/notification.png";
import security from "../../assets/images/security.png";
import privacy from "../../assets/images/privacy.png";
import payment from "../../assets/images/payments.png";
import language from "../../assets/images/language.png";

const SettingCard = ({ onClick, title, desc, icon }) => {
  return (
    <div onClick={onClick} className="setting-card">
      <img src={icon} alt="" className="setting-card-icon" />
      <div className="setting-card-info">
        <div className="setting-card-title">{title}</div>
        <div className="setting-info">{desc}</div>
      </div>
    </div>
  );
};

const SettingLanding = () => {
  return (
    <div className="setting-landing-container">
      <div className="setting-title">Settings</div>
      <div className="settings-card-holder">
        <SettingCard
          onClick={() => {}}
          icon={security}
          title={"Login & Security"}
          desc={"Update password and account related settings"}
        />
        <SettingCard
          onClick={() => {}}
          icon={payment}
          title={"Payment"}
          desc={"Update your password and secure your account"}
        />
        <SettingCard
          onClick={() => {}}
          icon={notification}
          title={"Notificaiton"}
          desc={"Update your password and secure your account"}
        />
        <SettingCard
          onClick={() => {}}
          icon={privacy}
          title={"Privacy"}
          desc={"Update your password and secure your account"}
        />
        <SettingCard
          onClick={() => {}}
          icon={language}
          title={"Language"}
          desc={"Update your password and secure your account"}
        />
      </div>
    </div>
  );
};

export default SettingLanding;
