import React, { useEffect, useRef, useState } from "react";
import {
  ASK_PHONE_NUMBER,
  CONFIRM_PHONE,
  ENTER_OTP_TEXT,
  GOOGLE_SIGN_IN_TEXT,
  LOGIN_MESSAGE,
  LOGIN_OTP_TEXT,
  LOGIN_SIGNUP_TEXT,
  LOGIN_TITLE,
  OTP_LENGTH,
  PHONE_NUMBER_LENGTH,
} from "../constants";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import loginImage from "../assets/images/login-image.png";
import logo from "../assets/images/rag-logo.png";
import googleLogo from "../assets/images/google_logo.png";
import loginOtp from "../assets/images/login-otp.png";

const Login = () => {
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [enableSubmit, setEnableSubmit] = useState(false);
  const [otpData, setOtpData] = useState("");
  const [otpView, setOtpView] = useState(false);

  const onClickGetOtp = () => {
    setEnableSubmit(false);
    setOtpView(true);
  };

  const onClickSubmitOtp = () => {
    //Submit the otp to BE and check for the response
    //navigate to Dashboard page
  };

  const onClickGoBack = () => {
    setOtpData("");
    setOtpView(false);
  };

  useEffect(() => {
    if (
      (!otpView && phoneNumber?.length === PHONE_NUMBER_LENGTH) ||
      otpData?.length === OTP_LENGTH
    )
      setEnableSubmit(true);
    else setEnableSubmit(false);
  }, [phoneNumber, otpData]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef?.current]);

  return (
    <div className="login-bg">
      <div className="login-image-container">
        <img
          src={otpView ? loginOtp : loginImage}
          alt=""
          className="login-image"
        />
        <div className="login-text-title">
          {otpView ? LOGIN_OTP_TEXT : LOGIN_TITLE}
        </div>
      </div>
      <div className="login-details-container">
        {otpView ? (
          <div className="logo-data-conatiner">
            <img src={logo} alt="" className="logo" />
            <div className="login-signup-text">{CONFIRM_PHONE}</div>
            <div className="login-signup-text-desc">{ENTER_OTP_TEXT}</div>
            <div className="otp-holder-parent">
              <div className="opt-input-holder">
                <input
                  value={otpData}
                  onChange={(e) => setOtpData(e?.target?.value)}
                  className="otp-input-box"
                />
                <input
                  value={otpData}
                  onChange={(e) => setOtpData(e?.target?.value)}
                  className="otp-input-box"
                />
                <input
                  value={otpData}
                  onChange={(e) => setOtpData(e?.target?.value)}
                  className="otp-input-box"
                />
                <input
                  value={otpData}
                  onChange={(e) => setOtpData(e?.target?.value)}
                  className="otp-input-box"
                />
              </div>
              <div className="resend-btn">Resend Otp</div>
              <button
                onClick={onClickSubmitOtp}
                disabled={!enableSubmit}
                className={
                  enableSubmit
                    ? "login-btn submit-btn-enabled"
                    : "login-btn submit-btn-disabled"
                }
              >
                Confirm
              </button>
              <button
                onClick={onClickGoBack}
                disabled={!enableSubmit}
                className={"login-btn back-btn"}
              >
                Go Back
              </button>
              <div className="message-text">{LOGIN_MESSAGE}</div>
            </div>
          </div>
        ) : (
          <div className="logo-data-conatiner">
            <img src={logo} alt="" className="logo" />
            <div className="login-signup-text">{LOGIN_SIGNUP_TEXT}</div>

            <div className="phone-number-container">
              <div className="phone-number-input-title">{ASK_PHONE_NUMBER}</div>
              <input
                ref={inputRef}
                className="phone-input"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e?.target?.value)}
              />
            </div>

            <button
              onClick={onClickGetOtp}
              disabled={!enableSubmit}
              className={
                enableSubmit
                  ? "login-btn submit-btn-enabled"
                  : "login-btn submit-btn-disabled"
              }
            >
              Get OTP
            </button>
            <div className="divider">
              <span className="divider-line" />
              OR
              <span className="divider-line" />
            </div>
            <button className="google-sign-in-btn">
              <img src={googleLogo} alt="" className="google_logo" />
              <div className="google-sign-text"> {GOOGLE_SIGN_IN_TEXT}</div>
            </button>
            <div className="message-text">{LOGIN_MESSAGE}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
