import React from "react";

const WhiteTickMark = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_234_303)">
        <mask
          id="mask0_234_303"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="20"
          height="20"
        >
          <path d="M20 0H0V20H20V0Z" fill="white" />
        </mask>
        <g mask="url(#mask0_234_303)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M18.125 10C18.125 14.4874 14.4874 18.125 10 18.125C5.51269 18.125 1.875 14.4874 1.875 10C1.875 5.51269 5.51269 1.875 10 1.875C14.4874 1.875 18.125 5.51269 18.125 10ZM10 20C15.5229 20 20 15.5229 20 10C20 4.47715 15.5229 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5229 4.47715 20 10 20ZM14.3986 8.55163C14.7725 8.19338 14.7851 7.59991 14.4269 7.2261C14.0686 6.85227 13.4751 6.83965 13.1014 7.19789L8.8587 11.2638L6.89866 9.38539C6.52484 9.02715 5.93139 9.03977 5.57314 9.4136C5.21489 9.78741 5.22751 10.3809 5.60134 10.7391L8.21004 13.2391C8.57266 13.5866 9.14474 13.5866 9.50736 13.2391L14.3986 8.55163Z"
            fill="white"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_234_303">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default WhiteTickMark;
