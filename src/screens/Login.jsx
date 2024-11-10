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
import { useDispatch, useSelector } from "react-redux";
import { postPhoneNo, verifyOtp } from "../features/auth/authActions";

const Login = () => {
  const navigate = useNavigate();
  const inputRef = useRef();
  const inputRefs = useRef([]);
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state?.auth);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [enableSubmit, setEnableSubmit] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [otpView, setOtpView] = useState(false);

  const onClickGetOtp = () => {
    dispatch(postPhoneNo({ phone: phoneNumber }))
      ?.unwrap()
      ?.then((e) => {
        setEnableSubmit(false);
        setOtpView(true);
      });
  };

  const onClickSubmitOtp = () => {
    dispatch(
      verifyOtp({
        otp: otp.join(""),
        userId: user?.data?.userId,
      })
    );
    //Submit the otp to BE and check for the response
    //navigate to Dashboard page
  };

  const onClickGoBack = () => {
    setOtp(["", "", "", ""]);
    setOtpView(false);
  };

  // Handle input change and auto-move to the next input box
  const handleInput = (e, index) => {
    const { value } = e.target;

    if (/^\d$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move focus to the next input box if available
      if (index < otp.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  // Handle backspace and navigation
  const handleKeyDown = (e, index) => {
    const { key } = e;
    const newOtp = [...otp];

    if (key === "Backspace") {
      if (newOtp[index]) {
        // Clear the current box value
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        // Move focus to the previous box if empty
        inputRefs.current[index - 1].focus();
        newOtp[index - 1] = "";
        setOtp(newOtp);
      }
    }
  };

  // Handle paste event
  const handlePaste = (e) => {
    const pastedData = e.clipboardData.getData("text").trim();
    if (/^\d{4,5}$/.test(pastedData)) {
      const newOtp = pastedData.slice(0, 4).split("");
      setOtp([...newOtp, "", "", "", ""].slice(0, 4));

      // Focus the last filled box
      inputRefs.current[Math.min(newOtp.length, 4) - 1].focus();
    }
  };

  useEffect(() => {
    if (
      (!otpView && phoneNumber?.length === PHONE_NUMBER_LENGTH) ||
      (otp[0] !== "" && otp[1] !== "" && otp[2] !== "" && otp[3] !== "")
    )
      setEnableSubmit(true);
    else setEnableSubmit(false);
  }, [phoneNumber, otp]);

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
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    value={digit}
                    maxLength={1}
                    onInput={(e) => handleInput(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={handlePaste}
                    ref={(el) => (inputRefs.current[index] = el)}
                    className="otp-input-box"
                  />
                ))}
              </div>
              <div onClick={onClickGetOtp} className="resend-btn">
                Resend Otp
              </div>
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
              <button onClick={onClickGoBack} className={"login-btn back-btn"}>
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
