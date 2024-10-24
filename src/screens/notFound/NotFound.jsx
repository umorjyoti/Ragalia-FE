import React from "react";
import "./NotFound.css";
import Lottie from "react-lottie";
import notFound from "../../assets/json/not_found.json";

const NotFound = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    renderer: "svg",
    animationData: notFound,
  };

  return (
    <div className="not-found-container">
      <Lottie options={{ ...defaultOptions }} height={400} width={400} />
    </div>
  );
};

export default NotFound;
