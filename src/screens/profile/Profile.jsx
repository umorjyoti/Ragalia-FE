import { Button, Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import React from "react";
import "./Profile.css";

const Profile = () => {
  return (
    <div className="profile-page-container">
      <div className="profile-page-title">Profile</div>
      <Tabs defaultActiveKey="0" className="floor-tabs">
        <TabPane tab={"Personal Details"} key={"Personal Details"}>
          <div className="profile-tab-container">
            <div className="profile-tab-info">
              <div className="profile-pic">
                <div className="title-pic">Profile Photo</div>
                <img src="" alt="" className="profile-pic-photo" />
              </div>
              <div className="profile-pic">
                <div className="title-pic">Full Name</div>
                <div className="title-pic">Umor Jyoti Chetia</div>
              </div>
              <div className="profile-pic">
                <div className="title-pic">Contact</div>
                <div className="title-pic">+91 0044782322</div>
              </div>
              <div className="profile-pic">
                <div className="title-pic">Email</div>
                <div className="title-pic">ragalia@gmail.com</div>
              </div>
            </div>
            <div className="profile-tab-edit">
              <Button className="edit-btn-tab">Edit</Button>
            </div>
          </div>
        </TabPane>
        <TabPane tab={"Bank details"} key={"Bank details"}></TabPane>
        <TabPane tab={"KYC details"} key={"KYC details"}></TabPane>
      </Tabs>
    </div>
  );
};

export default Profile;
