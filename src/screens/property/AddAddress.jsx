import React, { useState, useEffect } from "react";
import { Steps, Input, Select, Button, Form, Tag, message } from "antd";
import "./AddAddress.css";

const { Step } = Steps;
const { Option } = Select;

const states = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

const amenities = ["WIFI", "CCTV", "Elevator", "Terrace", "Garden", "Parking"];

const AddAddress = () => {
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({
    state: "",
    pinCode: "",
    address: "",
    locationUrl: "",
    commonAmenities: [],
  });
  const [isValidUrl, setIsValidUrl] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const { state, pinCode, address, locationUrl, commonAmenities } = formData;
    const allFieldsFilled =
      state &&
      pinCode &&
      address &&
      locationUrl &&
      commonAmenities.length > 0 &&
      isValidUrl;
    setIsFormValid(allFieldsFilled);
  }, [formData, isValidUrl]);

  const handleFieldChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleLocationUrlChange = (e) => {
    const url = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      locationUrl: url,
    }));

    const isGoogleMapsUrl = url.includes("google.com/maps");
    setIsValidUrl(isGoogleMapsUrl);

    // Convert the URL for embedding if it's a Google Maps link
    if (isGoogleMapsUrl) {
      const embedUrl = url.replace("/maps", "/maps/embed");
      setFormData((prevData) => ({
        ...prevData,
        locationUrl: embedUrl,
      }));
    }
  };

  const handleAmenityClick = (amenity) => {
    setFormData((prevData) => {
      const updatedAmenities = prevData.commonAmenities.includes(amenity)
        ? prevData.commonAmenities.filter((item) => item !== amenity)
        : [...prevData.commonAmenities, amenity];
      return { ...prevData, commonAmenities: updatedAmenities };
    });
  };

  return (
    <div className="form-container">
      <Steps current={1} className="steps-container">
        <Step />
        <Step />
        <Step />
        <Step />
      </Steps>

      <h2>Add Address & Amenities</h2>

      <Form form={form} layout="vertical" className="form-layout">
        <div className="form-row">
          <Form.Item
            label="State"
            name="state"
            rules={[{ required: true, message: "Please select a state" }]}
            className="form-item-half-width"
          >
            <Select
              placeholder="Select"
              onChange={(value) => handleFieldChange("state", value)}
            >
              {states.map((state) => (
                <Option key={state} value={state}>
                  {state}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Pin code"
            name="pinCode"
            rules={[{ required: true, message: "Please enter a pin code" }]}
            className="form-item-half-width"
          >
            <Input
              placeholder="Enter code"
              onChange={(e) => handleFieldChange("pinCode", e.target.value)}
            />
          </Form.Item>
        </div>

        <Form.Item
          label="Enter address"
          name="address"
          rules={[{ required: true, message: "Please enter the address" }]}
          className="form-item-full-width"
        >
          <Input
            placeholder="House no., street, locality, city"
            onChange={(e) => handleFieldChange("address", e.target.value)}
          />
        </Form.Item>

        <h3>Location</h3>
        <Form.Item
          label="Google Maps URL"
          name="locationUrl"
          className="form-item-full-width"
        >
          <Input
            placeholder="Enter Google Maps URL"
            onChange={handleLocationUrlChange}
          />
        </Form.Item>
        {formData.locationUrl && isValidUrl ? (
          <div className="map-preview">
            <iframe
              src={formData.locationUrl}
              width="100%"
              height="300"
              style={{ border: 0, borderRadius: "8px" }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        ) : (
          !isValidUrl && (
            <p className="error-text">
              Invalid URL, please enter a correct Google Maps link
            </p>
          )
        )}

        <h3>Common amenities</h3>
        <div className="amenities-container">
          {amenities.map((amenity) => (
            <Tag.CheckableTag
              key={amenity}
              checked={formData.commonAmenities.includes(amenity)}
              onChange={() => handleAmenityClick(amenity)}
              className="amenity-tag"
            >
              {amenity}
            </Tag.CheckableTag>
          ))}
        </div>

        <div className="button-group">
          <Button className="back-btn">Back</Button>
          <Button
            className="active-btn"
            type="primary"
            disabled={!isFormValid}
            // onClick={onClickNext}
          >
            Next
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddAddress;
