import React, { useState } from "react";
import { Steps, Input, Select, Radio, Button, Form } from "antd";
import "./AddProperty.css";
import { useNavigate } from "react-router-dom";

const { Step } = Steps;
const { Option } = Select;

const AddProperty = () => {
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const [formData, setFormData] = useState({
    propertyName: "",
    propertyType: "",
    lockinDetails: "",
    noticePeriod: "",
    managerPhone: "",
    securityPhone: "",
    tenantType: "Both",
    electricityIncluded: "Not included",
  });

  const onClickNext = () => {
    navigate("/properties/add-address");
  };

  const handleInputChange = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const isNextDisabled = !(
    formData.propertyName &&
    formData.propertyType &&
    formData.noticePeriod &&
    formData.managerPhone
  );

  return (
    <div className="form-container">
      <Steps current={0} className="steps-container">
        <Step />
        <Step />
        <Step />
        <Step />
      </Steps>

      <div className="add-prop-header">
        <div className="add-property-text">Add Property</div>
        <Button className="save-exit-button">Save & Exit</Button>
      </div>

      <Form form={form} layout="vertical" className="form-layout">
        <div className="form-section">
          <Form.Item
            label="Property Name"
            required
            name="propertyName"
            rules={[
              { required: true, message: "Please enter the property name" },
            ]}
            className="form-item-full-width"
          >
            <Input
              placeholder="Enter name"
              onChange={(e) =>
                handleInputChange("propertyName", e.target.value)
              }
            />
          </Form.Item>

          <Form.Item
            label="Property Type"
            required
            name="propertyType"
            rules={[
              { required: true, message: "Please select the property type" },
            ]}
            className="form-item-full-width"
          >
            <Select
              placeholder="Select"
              onChange={(value) => handleInputChange("propertyType", value)}
            >
              <Option value="2bhk">2bhk</Option>
              <Option value="3bhk">3bhk</Option>
              <Option value="StandAlonePG">StandAlonePG</Option>
            </Select>
          </Form.Item>
        </div>

        <div className="form-section">
          <Form.Item
            label="Lock-in Period"
            name="lockinDetails"
            className="form-item-full-width"
          >
            <Input
              placeholder="Enter period"
              onChange={(e) =>
                handleInputChange("lockinDetails", e.target.value)
              }
            />
          </Form.Item>

          <Form.Item
            label="Notice Period"
            required
            name="noticePeriod"
            rules={[
              { required: true, message: "Please select the notice period" },
            ]}
            className="form-item-full-width"
          >
            <Select
              placeholder="Select"
              onChange={(value) => handleInputChange("noticePeriod", value)}
            >
              <Option value="1 month">1 month</Option>
              <Option value="3 months">3 months</Option>
            </Select>
          </Form.Item>
        </div>

        <div className="form-section">
          <Form.Item
            label="Property Manager"
            required
            name="managerPhone"
            rules={[
              { required: true, message: "Please enter the manager contact" },
            ]}
            className="form-item-full-width"
          >
            <Input
              placeholder="Enter contact"
              onChange={(e) =>
                handleInputChange("managerPhone", e.target.value)
              }
            />
          </Form.Item>

          <Form.Item
            label="Security Guard"
            name="securityPhone"
            className="form-item-full-width"
          >
            <Input
              placeholder="Enter contact"
              onChange={(e) =>
                handleInputChange("securityPhone", e.target.value)
              }
            />
          </Form.Item>
        </div>

        <div className="form-section">
          <Form.Item
            label="Preferred Tenant Type"
            className="form-item-full-width"
          >
            <Radio.Group
              defaultValue="Both"
              onChange={(e) => handleInputChange("tenantType", e.target.value)}
            >
              <Radio value="Both">Both</Radio>
              <Radio value="Boys">Boys</Radio>
              <Radio value="Girls">Girls</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="Electricity Bill" className="form-item-full-width">
            <Radio.Group
              defaultValue="Not included"
              onChange={(e) =>
                handleInputChange("electricityIncluded", e.target.value)
              }
            >
              <Radio value="Included">Included</Radio>
              <Radio value="Not included">Not included</Radio>
            </Radio.Group>
          </Form.Item>
        </div>

        <div className="button-group">
          <Button className="back-btn" >Back</Button>
          <Button
            className="active-btn"
            type="primary"
            disabled={isNextDisabled}
            onClick={onClickNext}
          >
            Next
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddProperty;
