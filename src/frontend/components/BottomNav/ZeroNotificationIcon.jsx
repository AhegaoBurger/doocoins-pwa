import React from "react";

const ZeroNotificationIcon = ({ activeColor }) => {
  return (
    <svg
      width="30"
      height="31"
      viewBox="0 0 30 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.3125 14.771C4.3125 8.86846 9.09746 4.0835 15 4.0835C20.9025 4.0835 25.6875 8.86845 25.6875 14.771V23.6946C25.6875 24.523 25.0159 25.1946 24.1875 25.1946H5.8125C4.98407 25.1946 4.3125 24.523 4.3125 23.6946V14.771Z"
        stroke={activeColor ? activeColor : "white"}
        stroke-width="3"
      />
      <ellipse cx="15" cy="2.58333" rx="2.8125" ry="2.58333" fill={activeColor ? activeColor : "white"} />
      <ellipse cx="2.8125" cy="24.1112" rx="2.8125" ry="2.58333" fill={activeColor ? activeColor : "white"} />
      <ellipse
        cx="27.1875"
        cy="24.1112"
        rx="2.8125"
        ry="2.58333"
        fill={activeColor ? activeColor : "white"}
      />
      <path
        d="M11.8125 25.6113H18.1875V27.0002C18.1875 28.3809 17.0682 29.5002 15.6875 29.5002H14.3125C12.9318 29.5002 11.8125 28.3809 11.8125 27.0002V25.6113Z"
        stroke={activeColor ? activeColor : "white"}
        stroke-width="3"
      />
    </svg>
  );
};

export default ZeroNotificationIcon;
