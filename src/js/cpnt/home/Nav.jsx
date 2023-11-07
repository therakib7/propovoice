import { NavLink } from "react-router-dom";
// import { useState } from 'react';

export default (props) => {
  const { i18n, caps } = ndpv;
  return (
    <ul>
      {caps.includes("ndpv_dashboard") && (
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "pv-active" : "")}
          >
            <svg
              className="pv-mr-14"
              width={16}
              height={16}
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M15.6934 7.89732C15.7147 8.12293 15.6671 8.34969 15.5569 8.54771C15.4467 8.74573 15.2791 8.90571 15.0762 9.00657L9.17367 11.9574C8.80896 12.1387 8.40721 12.2331 7.99992 12.2331C7.59263 12.2331 7.19088 12.1387 6.82617 11.9574L0.923664 9.00657C0.720737 8.90571 0.553134 8.74573 0.442946 8.54771C0.332757 8.34969 0.285155 8.12293 0.306414 7.89732C0.330436 7.69782 0.40478 7.5077 0.522462 7.34482C0.640143 7.18194 0.797299 7.05165 0.979164 6.9662C1.00538 6.95295 1.03435 6.94604 1.06373 6.94604C1.0931 6.94604 1.12207 6.95295 1.14829 6.9662L6.82617 9.80457C7.19082 9.98608 7.59259 10.0805 7.99992 10.0805C8.40725 10.0805 8.80902 9.98608 9.17367 9.80457L14.8515 6.9662C14.8778 6.95295 14.9067 6.94604 14.9361 6.94604C14.9655 6.94604 14.9945 6.95295 15.0207 6.9662C15.2025 7.05165 15.3597 7.18194 15.4774 7.34482C15.5951 7.5077 15.6694 7.69782 15.6934 7.89732V7.89732ZM15.0207 9.9662C14.9945 9.95295 14.9655 9.94604 14.9361 9.94604C14.9067 9.94604 14.8778 9.95295 14.8515 9.9662L9.17367 12.8046C8.80902 12.9861 8.40725 13.0805 7.99992 13.0805C7.59259 13.0805 7.19082 12.9861 6.82617 12.8046L1.14829 9.9662C1.12207 9.95295 1.0931 9.94604 1.06373 9.94604C1.03435 9.94604 1.00538 9.95295 0.979164 9.9662C0.818634 10.0404 0.676788 10.1497 0.564062 10.286C0.451336 10.4223 0.370598 10.5821 0.327789 10.7537C0.273067 10.9989 0.302009 11.2554 0.410002 11.4823C0.517996 11.7091 0.698825 11.8933 0.923664 12.0054L6.82617 14.9563C7.19088 15.1376 7.59263 15.2319 7.99992 15.2319C8.40721 15.2319 8.80896 15.1376 9.17367 14.9563L15.0762 12.0054C15.2791 11.9046 15.4467 11.7446 15.5569 11.5466C15.6671 11.3486 15.7147 11.1218 15.6934 10.8962C15.6692 10.6969 15.5948 10.507 15.4771 10.3443C15.3595 10.1817 15.2024 10.0516 15.0207 9.9662V9.9662Z"
                fill="#CBD5E0"
              />
              <path
                d="M15.6979 5.00009C15.6987 5.20919 15.6409 5.41432 15.531 5.59222C15.4211 5.77012 15.2635 5.91367 15.0762 6.00659L9.1737 8.95746C8.80898 9.13875 8.40723 9.23309 7.99994 9.23309C7.59266 9.23309 7.19091 9.13875 6.82619 8.95746L0.923693 6.00659C0.736683 5.91321 0.579386 5.76957 0.469446 5.59179C0.359506 5.41401 0.30127 5.20912 0.30127 5.00009C0.30127 4.79106 0.359506 4.58617 0.469446 4.40839C0.579386 4.2306 0.736683 4.08697 0.923693 3.99359L6.82619 1.04272C7.19091 0.861431 7.59266 0.76709 7.99994 0.76709C8.40723 0.76709 8.80898 0.861431 9.1737 1.04272L15.0762 3.99359C15.2635 4.08651 15.4211 4.23006 15.531 4.40795C15.6409 4.58585 15.6987 4.79099 15.6979 5.00009V5.00009Z"
                fill="#718096"
              />
            </svg>
            <span>{i18n.db}</span>
          </NavLink>
        </li>
      )}
      {caps.includes("ndpv_lead") && (
        <li>
          <NavLink
            to="lead"
            className={({ isActive }) => (isActive ? "pv-active" : "")}
          >
            <svg width={20} height={18} viewBox="0 0 20 18" fill="none">
              <path
                d="M10 7.07129C11.8769 7.07129 13.3984 5.54976 13.3984 3.67285C13.3984 1.79595 11.8769 0.274414 10 0.274414C8.12309 0.274414 6.60156 1.79595 6.60156 3.67285C6.60156 5.54976 8.12309 7.07129 10 7.07129Z"
                fill="#718096"
              />
              <path
                d="M16.875 7.07129C18.0615 7.07129 19.0234 6.1094 19.0234 4.92285C19.0234 3.7363 18.0615 2.77441 16.875 2.77441C15.6885 2.77441 14.7266 3.7363 14.7266 4.92285C14.7266 6.1094 15.6885 7.07129 16.875 7.07129Z"
                fill="#CBD5E0"
              />
              <path
                d="M3.125 7.07129C4.31155 7.07129 5.27344 6.1094 5.27344 4.92285C5.27344 3.7363 4.31155 2.77441 3.125 2.77441C1.93845 2.77441 0.976562 3.7363 0.976562 4.92285C0.976562 6.1094 1.93845 7.07129 3.125 7.07129Z"
                fill="#CBD5E0"
              />
              <path
                d="M5.2418 9.0007C4.39609 8.30781 3.6302 8.39953 2.65234 8.39953C1.18984 8.39953 0 9.58234 0 11.0359V15.3019C0 15.9331 0.515234 16.4464 1.14883 16.4464C3.88422 16.4464 3.55469 16.4959 3.55469 16.3284C3.55469 13.3055 3.19664 11.0887 5.2418 9.0007Z"
                fill="#CBD5E0"
              />
              <path
                d="M10.9302 8.41523C9.22222 8.27277 7.73765 8.41687 6.45715 9.47383C4.31429 11.1902 4.72668 13.5013 4.72668 16.3285C4.72668 17.0765 5.33527 17.6965 6.09465 17.6965C14.34 17.6965 14.6682 17.9625 15.1571 16.8797C15.3175 16.5135 15.2736 16.6299 15.2736 13.127C15.2736 10.3447 12.8645 8.41523 10.9302 8.41523Z"
                fill="#718096"
              />
              <path
                d="M17.3478 8.39943C16.3646 8.39943 15.6029 8.30865 14.7583 9.0006C16.7882 11.0731 16.4454 13.1387 16.4454 16.3283C16.4454 16.4968 16.1719 16.4463 18.8103 16.4463C19.4665 16.4463 20.0001 15.9147 20.0001 15.2611V11.0358C20.0001 9.58224 18.8103 8.39943 17.3478 8.39943Z"
                fill="#CBD5E0"
              />
            </svg>
            <span>{i18n.lead}</span>
          </NavLink>
        </li>
      )}
      {caps.includes("ndpv_deal") && (
        <li>
          <NavLink
            to="deal"
            className={({ isActive }) => (isActive ? "pv-active" : "")}
          >
            <svg width={20} height={18} viewBox="0 0 20 18" fill="none">
              <path
                d="M10 7.07129C11.8769 7.07129 13.3984 5.54976 13.3984 3.67285C13.3984 1.79595 11.8769 0.274414 10 0.274414C8.12309 0.274414 6.60156 1.79595 6.60156 3.67285C6.60156 5.54976 8.12309 7.07129 10 7.07129Z"
                fill="#718096"
              />
              <path
                d="M16.875 7.07129C18.0615 7.07129 19.0234 6.1094 19.0234 4.92285C19.0234 3.7363 18.0615 2.77441 16.875 2.77441C15.6885 2.77441 14.7266 3.7363 14.7266 4.92285C14.7266 6.1094 15.6885 7.07129 16.875 7.07129Z"
                fill="#CBD5E0"
              />
              <path
                d="M3.125 7.07129C4.31155 7.07129 5.27344 6.1094 5.27344 4.92285C5.27344 3.7363 4.31155 2.77441 3.125 2.77441C1.93845 2.77441 0.976562 3.7363 0.976562 4.92285C0.976562 6.1094 1.93845 7.07129 3.125 7.07129Z"
                fill="#CBD5E0"
              />
              <path
                d="M5.2418 9.0007C4.39609 8.30781 3.6302 8.39953 2.65234 8.39953C1.18984 8.39953 0 9.58234 0 11.0359V15.3019C0 15.9331 0.515234 16.4464 1.14883 16.4464C3.88422 16.4464 3.55469 16.4959 3.55469 16.3284C3.55469 13.3055 3.19664 11.0887 5.2418 9.0007Z"
                fill="#CBD5E0"
              />
              <path
                d="M10.9302 8.41523C9.22222 8.27277 7.73765 8.41687 6.45715 9.47383C4.31429 11.1902 4.72668 13.5013 4.72668 16.3285C4.72668 17.0765 5.33527 17.6965 6.09465 17.6965C14.34 17.6965 14.6682 17.9625 15.1571 16.8797C15.3175 16.5135 15.2736 16.6299 15.2736 13.127C15.2736 10.3447 12.8645 8.41523 10.9302 8.41523Z"
                fill="#718096"
              />
              <path
                d="M17.3478 8.39943C16.3646 8.39943 15.6029 8.30865 14.7583 9.0006C16.7882 11.0731 16.4454 13.1387 16.4454 16.3283C16.4454 16.4968 16.1719 16.4463 18.8103 16.4463C19.4665 16.4463 20.0001 15.9147 20.0001 15.2611V11.0358C20.0001 9.58224 18.8103 8.39943 17.3478 8.39943Z"
                fill="#CBD5E0"
              />
            </svg>
            <span>
              {i18n.deal_pipeline}
            </span>
          </NavLink>
        </li>
      )}
      {caps.includes("ndpv_estimate") && (
        <li>
          <NavLink
            to="estimate"
            className={({ isActive }) => (isActive ? "pv-active" : "")}
          >
            <svg
              className="pv-mr-14"
              width={16}
              height={20}
              viewBox="0 0 16 20"
              fill="none"
            >
              <path
                d="M15.0312 4.375V16.5625C15.0312 17.3084 14.7349 18.0238 14.2075 18.5512C13.68 19.0787 12.9647 19.375 12.2188 19.375H3.78125C3.03533 19.375 2.31996 19.0787 1.79251 18.5512C1.26507 18.0238 0.96875 17.3084 0.96875 16.5625V4.375C0.96875 3.62908 1.26507 2.91371 1.79251 2.38626C2.31996 1.85882 3.03533 1.5625 3.78125 1.5625H5.3825C5.2561 1.77535 5.18879 2.01808 5.1875 2.26562C5.1875 2.63859 5.33566 2.99627 5.59938 3.25999C5.8631 3.52372 6.22079 3.67188 6.59375 3.67188H9.40625C9.77921 3.67188 10.1369 3.52372 10.4006 3.25999C10.6643 2.99627 10.8125 2.63859 10.8125 2.26562C10.8112 2.01808 10.7439 1.77535 10.6175 1.5625H12.2188C12.9647 1.5625 13.68 1.85882 14.2075 2.38626C14.7349 2.91371 15.0312 3.62908 15.0312 4.375Z"
                fill="#718096"
              />
              <path
                d="M9.64062 1.5625C9.82711 1.5625 10.0059 1.63658 10.1378 1.76844C10.2697 1.9003 10.3438 2.07914 10.3438 2.26562C10.3438 2.45211 10.2697 2.63095 10.1378 2.76281C10.0059 2.89467 9.82711 2.96875 9.64062 2.96875H6.35938C6.17289 2.96875 5.99405 2.89467 5.86219 2.76281C5.73033 2.63095 5.65625 2.45211 5.65625 2.26562C5.65625 2.07914 5.73033 1.9003 5.86219 1.76844C5.99405 1.63658 6.17289 1.5625 6.35938 1.5625H9.64062ZM9.64062 0.625H6.35938C5.92425 0.625 5.50695 0.797851 5.19928 1.10553C4.8916 1.4132 4.71875 1.8305 4.71875 2.26562C4.71875 2.70075 4.8916 3.11805 5.19928 3.42572C5.50695 3.7334 5.92425 3.90625 6.35938 3.90625H9.64062C10.0757 3.90625 10.493 3.7334 10.8007 3.42572C11.1084 3.11805 11.2812 2.70075 11.2812 2.26562C11.2812 1.8305 11.1084 1.4132 10.8007 1.10553C10.493 0.797851 10.0757 0.625 9.64062 0.625Z"
                fill="#718096"
              />
              <path
                d="M11.2812 8.59375H4.71875C4.59443 8.59375 4.4752 8.54436 4.38729 8.45646C4.29939 8.36855 4.25 8.24932 4.25 8.125C4.25 8.00068 4.29939 7.88145 4.38729 7.79354C4.4752 7.70564 4.59443 7.65625 4.71875 7.65625H11.2812C11.4056 7.65625 11.5248 7.70564 11.6127 7.79354C11.7006 7.88145 11.75 8.00068 11.75 8.125C11.75 8.24932 11.7006 8.36855 11.6127 8.45646C11.5248 8.54436 11.4056 8.59375 11.2812 8.59375ZM11.75 11.4062C11.75 11.2819 11.7006 11.1627 11.6127 11.0748C11.5248 10.9869 11.4056 10.9375 11.2812 10.9375H4.71875C4.59443 10.9375 4.4752 10.9869 4.38729 11.0748C4.29939 11.1627 4.25 11.2819 4.25 11.4062C4.25 11.5306 4.29939 11.6498 4.38729 11.7377C4.4752 11.8256 4.59443 11.875 4.71875 11.875H11.2812C11.4056 11.875 11.5248 11.8256 11.6127 11.7377C11.7006 11.6498 11.75 11.5306 11.75 11.4062ZM8.9375 14.6875C8.9375 14.5632 8.88811 14.444 8.80021 14.356C8.7123 14.2681 8.59307 14.2188 8.46875 14.2188H4.71875C4.59443 14.2188 4.4752 14.2681 4.38729 14.356C4.29939 14.444 4.25 14.5632 4.25 14.6875C4.25 14.8118 4.29939 14.931 4.38729 15.019C4.4752 15.1069 4.59443 15.1562 4.71875 15.1562H8.46875C8.59307 15.1562 8.7123 15.1069 8.80021 15.019C8.88811 14.931 8.9375 14.8118 8.9375 14.6875Z"
                fill="white"
              />
            </svg>
            <span>{i18n.est}</span>
          </NavLink>
        </li>
      )}
      {caps.includes("ndpv_invoice") && (
        <li>
          <NavLink
            to="invoice"
            className={({ isActive }) => (isActive ? "pv-active" : "")}
          >
            <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
              <path
                d="M16.0547 0.343262V3.90643H19.6176L16.0547 0.343262Z"
                fill="#CBD5E0"
              />
              <path
                d="M15.4688 5.07812C15.1452 5.07812 14.8828 4.81578 14.8828 4.49219V0H6.48438C5.51512 0 4.72656 0.788555 4.72656 1.75781V8.30816C4.91961 8.29066 5.11496 8.28125 5.3125 8.28125C7.30969 8.28125 9.09754 9.19438 10.2807 10.625H16.6406C16.9642 10.625 17.2266 10.8873 17.2266 11.2109C17.2266 11.5345 16.9642 11.7969 16.6406 11.7969H11.0527C11.4189 12.5116 11.6551 13.3033 11.7309 14.1406H16.6406C16.9642 14.1406 17.2266 14.403 17.2266 14.7266C17.2266 15.0502 16.9642 15.3125 16.6406 15.3125H11.7309C11.5557 17.2476 10.5218 18.9385 9.01398 20H18.2031C19.1724 20 19.9609 19.2114 19.9609 18.2422V5.07812H15.4688ZM16.6406 8.28125H8.04688C7.72328 8.28125 7.46094 8.01891 7.46094 7.69531C7.46094 7.37172 7.72328 7.10938 8.04688 7.10938H16.6406C16.9642 7.10938 17.2266 7.37172 17.2266 7.69531C17.2266 8.01891 16.9642 8.28125 16.6406 8.28125Z"
                fill="#718096"
              />
              <path
                d="M5.3125 9.45312C2.40473 9.45312 0.0390625 11.8188 0.0390625 14.7266C0.0390625 17.6343 2.40473 20 5.3125 20C8.22027 20 10.5859 17.6343 10.5859 14.7266C10.5859 11.8188 8.22027 9.45312 5.3125 9.45312ZM4.98699 14.1406H5.63805C6.32008 14.1406 6.875 14.6955 6.875 15.3776V16.0286C6.875 16.6214 6.45586 17.1179 5.89844 17.2378V17.4609C5.89844 17.7845 5.63609 18.0469 5.3125 18.0469C4.98891 18.0469 4.72656 17.7845 4.72656 17.4609V17.2378C4.16914 17.1179 3.75 16.6214 3.75 16.0286C3.75 15.705 4.01234 15.4427 4.33594 15.4427C4.65953 15.4427 4.92188 15.705 4.92188 16.0286C4.92188 16.0645 4.95109 16.0938 4.98699 16.0938H5.63805C5.67395 16.0938 5.70316 16.0645 5.70316 16.0286V15.3776C5.70316 15.3417 5.67395 15.3125 5.63805 15.3125H4.98699C4.30492 15.3125 3.75 14.7576 3.75 14.0755V13.4245C3.75 12.8318 4.16914 12.3353 4.72656 12.2153V11.9922C4.72656 11.6686 4.98891 11.4062 5.3125 11.4062C5.63609 11.4062 5.89844 11.6686 5.89844 11.9922V12.2153C6.45586 12.3353 6.875 12.8318 6.875 13.4245C6.875 13.7481 6.61266 14.0104 6.28906 14.0104C5.96547 14.0104 5.70312 13.7481 5.70312 13.4245C5.70312 13.3886 5.67391 13.3594 5.63801 13.3594H4.98695C4.95105 13.3594 4.92184 13.3886 4.92184 13.4245V14.0755C4.92188 14.1114 4.95109 14.1406 4.98699 14.1406Z"
                fill="#CBD5E0"
              />
            </svg>
            <span>{i18n.inv}</span>
          </NavLink>
        </li>
      )}
      {caps.includes("ndpv_client") && (
        <li>
          <NavLink
            to="client"
            className={({ isActive }) => (isActive ? "pv-active" : "")}
          >
            <svg width={20} height={18} viewBox="0 0 20 18" fill="none">
              <path
                d="M10 7.07129C11.8769 7.07129 13.3984 5.54976 13.3984 3.67285C13.3984 1.79595 11.8769 0.274414 10 0.274414C8.12309 0.274414 6.60156 1.79595 6.60156 3.67285C6.60156 5.54976 8.12309 7.07129 10 7.07129Z"
                fill="#718096"
              />
              <path
                d="M16.875 7.07129C18.0615 7.07129 19.0234 6.1094 19.0234 4.92285C19.0234 3.7363 18.0615 2.77441 16.875 2.77441C15.6885 2.77441 14.7266 3.7363 14.7266 4.92285C14.7266 6.1094 15.6885 7.07129 16.875 7.07129Z"
                fill="#CBD5E0"
              />
              <path
                d="M3.125 7.07129C4.31155 7.07129 5.27344 6.1094 5.27344 4.92285C5.27344 3.7363 4.31155 2.77441 3.125 2.77441C1.93845 2.77441 0.976562 3.7363 0.976562 4.92285C0.976562 6.1094 1.93845 7.07129 3.125 7.07129Z"
                fill="#CBD5E0"
              />
              <path
                d="M5.2418 9.0007C4.39609 8.30781 3.6302 8.39953 2.65234 8.39953C1.18984 8.39953 0 9.58234 0 11.0359V15.3019C0 15.9331 0.515234 16.4464 1.14883 16.4464C3.88422 16.4464 3.55469 16.4959 3.55469 16.3284C3.55469 13.3055 3.19664 11.0887 5.2418 9.0007Z"
                fill="#CBD5E0"
              />
              <path
                d="M10.9302 8.41523C9.22222 8.27277 7.73765 8.41687 6.45715 9.47383C4.31429 11.1902 4.72668 13.5013 4.72668 16.3285C4.72668 17.0765 5.33527 17.6965 6.09465 17.6965C14.34 17.6965 14.6682 17.9625 15.1571 16.8797C15.3175 16.5135 15.2736 16.6299 15.2736 13.127C15.2736 10.3447 12.8645 8.41523 10.9302 8.41523Z"
                fill="#718096"
              />
              <path
                d="M17.3478 8.39943C16.3646 8.39943 15.6029 8.30865 14.7583 9.0006C16.7882 11.0731 16.4454 13.1387 16.4454 16.3283C16.4454 16.4968 16.1719 16.4463 18.8103 16.4463C19.4665 16.4463 20.0001 15.9147 20.0001 15.2611V11.0358C20.0001 9.58224 18.8103 8.39943 17.3478 8.39943Z"
                fill="#CBD5E0"
              />
            </svg>
            <span>{i18n.client}</span>
          </NavLink>
        </li>
      )}
      {caps.includes("ndpv_project") && (
        <li>
          <NavLink
            to="project"
            className={({ isActive }) => (isActive ? "pv-active" : "")}
          >
            <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
              <g clipPath="url(#clip0_3933_8475)">
                <path
                  d="M16.2745 5.97661H9.05882L7.62353 4.27073C7.57525 4.21269 7.50289 4.18014 7.42745 4.18249H1.60588C0.717059 4.18896 0 4.91132 0 5.80014V16.2923C0.00107843 17.1842 0.723823 17.9069 1.61569 17.908H16.2745C17.1664 17.9069 17.8891 17.1842 17.8902 16.2923V7.59229C17.8891 6.70043 17.1664 5.97769 16.2745 5.97661Z"
                  fill="#718096"
                />
                <path
                  d="M18.3941 3.88627H11.1765L9.74117 2.1804C9.69289 2.12236 9.62053 2.08981 9.54509 2.09216H3.72548C2.91901 2.09348 2.23705 2.68927 2.12744 3.48824H7.43529C7.71362 3.48755 7.97788 3.61039 8.15686 3.82353L9.38235 5.28039H16.2745C17.5493 5.28255 18.5822 6.31544 18.5843 7.59019V15.8019C19.3925 15.7011 19.9994 15.0145 20 14.2V5.5C19.9979 4.6127 19.2814 3.89275 18.3941 3.88627Z"
                  fill="#CBD5E0"
                />
              </g>
              <defs>
                <clipPath id="clip0_3933_8475">
                  <rect width={20} height={20} fill="white" />
                </clipPath>
              </defs>
            </svg>
            <span>{i18n.project}</span>
          </NavLink>
        </li>
      )}
      {caps.includes("ndpv_task") && !caps.includes("ndpv_client_role") && (
        <li>
          <NavLink
            to="task"
            className={({ isActive }) => (isActive ? "pv-active" : "")}
          >
            <svg
              className="pv-mr-14"
              width={16}
              height={16}
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M15.6934 7.89732C15.7147 8.12293 15.6671 8.34969 15.5569 8.54771C15.4467 8.74573 15.2791 8.90571 15.0762 9.00657L9.17367 11.9574C8.80896 12.1387 8.40721 12.2331 7.99992 12.2331C7.59263 12.2331 7.19088 12.1387 6.82617 11.9574L0.923664 9.00657C0.720737 8.90571 0.553134 8.74573 0.442946 8.54771C0.332757 8.34969 0.285155 8.12293 0.306414 7.89732C0.330436 7.69782 0.40478 7.5077 0.522462 7.34482C0.640143 7.18194 0.797299 7.05165 0.979164 6.9662C1.00538 6.95295 1.03435 6.94604 1.06373 6.94604C1.0931 6.94604 1.12207 6.95295 1.14829 6.9662L6.82617 9.80457C7.19082 9.98608 7.59259 10.0805 7.99992 10.0805C8.40725 10.0805 8.80902 9.98608 9.17367 9.80457L14.8515 6.9662C14.8778 6.95295 14.9067 6.94604 14.9361 6.94604C14.9655 6.94604 14.9945 6.95295 15.0207 6.9662C15.2025 7.05165 15.3597 7.18194 15.4774 7.34482C15.5951 7.5077 15.6694 7.69782 15.6934 7.89732V7.89732ZM15.0207 9.9662C14.9945 9.95295 14.9655 9.94604 14.9361 9.94604C14.9067 9.94604 14.8778 9.95295 14.8515 9.9662L9.17367 12.8046C8.80902 12.9861 8.40725 13.0805 7.99992 13.0805C7.59259 13.0805 7.19082 12.9861 6.82617 12.8046L1.14829 9.9662C1.12207 9.95295 1.0931 9.94604 1.06373 9.94604C1.03435 9.94604 1.00538 9.95295 0.979164 9.9662C0.818634 10.0404 0.676788 10.1497 0.564062 10.286C0.451336 10.4223 0.370598 10.5821 0.327789 10.7537C0.273067 10.9989 0.302009 11.2554 0.410002 11.4823C0.517996 11.7091 0.698825 11.8933 0.923664 12.0054L6.82617 14.9563C7.19088 15.1376 7.59263 15.2319 7.99992 15.2319C8.40721 15.2319 8.80896 15.1376 9.17367 14.9563L15.0762 12.0054C15.2791 11.9046 15.4467 11.7446 15.5569 11.5466C15.6671 11.3486 15.7147 11.1218 15.6934 10.8962C15.6692 10.6969 15.5948 10.507 15.4771 10.3443C15.3595 10.1817 15.2024 10.0516 15.0207 9.9662V9.9662Z"
                fill="#CBD5E0"
              />
              <path
                d="M15.6979 5.00009C15.6987 5.20919 15.6409 5.41432 15.531 5.59222C15.4211 5.77012 15.2635 5.91367 15.0762 6.00659L9.1737 8.95746C8.80898 9.13875 8.40723 9.23309 7.99994 9.23309C7.59266 9.23309 7.19091 9.13875 6.82619 8.95746L0.923693 6.00659C0.736683 5.91321 0.579386 5.76957 0.469446 5.59179C0.359506 5.41401 0.30127 5.20912 0.30127 5.00009C0.30127 4.79106 0.359506 4.58617 0.469446 4.40839C0.579386 4.2306 0.736683 4.08697 0.923693 3.99359L6.82619 1.04272C7.19091 0.861431 7.59266 0.76709 7.99994 0.76709C8.40723 0.76709 8.80898 0.861431 9.1737 1.04272L15.0762 3.99359C15.2635 4.08651 15.4211 4.23006 15.531 4.40795C15.6409 4.58585 15.6987 4.79099 15.6979 5.00009V5.00009Z"
                fill="#718096"
              />
            </svg>
            <span>{i18n.task}</span>
          </NavLink>
        </li>
      )}
      {caps.includes("ndpv_contact") && (
        <li>
          <NavLink
            to="contact"
            className={({ isActive }) => (isActive ? "pv-active" : "")}
          >
            <svg width={20} height={18} viewBox="0 0 20 18" fill="none">
              <path
                d="M10 7.07129C11.8769 7.07129 13.3984 5.54976 13.3984 3.67285C13.3984 1.79595 11.8769 0.274414 10 0.274414C8.12309 0.274414 6.60156 1.79595 6.60156 3.67285C6.60156 5.54976 8.12309 7.07129 10 7.07129Z"
                fill="#718096"
              />
              <path
                d="M16.875 7.07129C18.0615 7.07129 19.0234 6.1094 19.0234 4.92285C19.0234 3.7363 18.0615 2.77441 16.875 2.77441C15.6885 2.77441 14.7266 3.7363 14.7266 4.92285C14.7266 6.1094 15.6885 7.07129 16.875 7.07129Z"
                fill="#CBD5E0"
              />
              <path
                d="M3.125 7.07129C4.31155 7.07129 5.27344 6.1094 5.27344 4.92285C5.27344 3.7363 4.31155 2.77441 3.125 2.77441C1.93845 2.77441 0.976562 3.7363 0.976562 4.92285C0.976562 6.1094 1.93845 7.07129 3.125 7.07129Z"
                fill="#CBD5E0"
              />
              <path
                d="M5.2418 9.0007C4.39609 8.30781 3.6302 8.39953 2.65234 8.39953C1.18984 8.39953 0 9.58234 0 11.0359V15.3019C0 15.9331 0.515234 16.4464 1.14883 16.4464C3.88422 16.4464 3.55469 16.4959 3.55469 16.3284C3.55469 13.3055 3.19664 11.0887 5.2418 9.0007Z"
                fill="#CBD5E0"
              />
              <path
                d="M10.9302 8.41523C9.22222 8.27277 7.73765 8.41687 6.45715 9.47383C4.31429 11.1902 4.72668 13.5013 4.72668 16.3285C4.72668 17.0765 5.33527 17.6965 6.09465 17.6965C14.34 17.6965 14.6682 17.9625 15.1571 16.8797C15.3175 16.5135 15.2736 16.6299 15.2736 13.127C15.2736 10.3447 12.8645 8.41523 10.9302 8.41523Z"
                fill="#718096"
              />
              <path
                d="M17.3478 8.39943C16.3646 8.39943 15.6029 8.30865 14.7583 9.0006C16.7882 11.0731 16.4454 13.1387 16.4454 16.3283C16.4454 16.4968 16.1719 16.4463 18.8103 16.4463C19.4665 16.4463 20.0001 15.9147 20.0001 15.2611V11.0358C20.0001 9.58224 18.8103 8.39943 17.3478 8.39943Z"
                fill="#CBD5E0"
              />
            </svg>
            <span>{i18n.ct}</span>
          </NavLink>
        </li>
      )}
      {caps.includes("ndpv_setting") && (
        <li>
          <NavLink
            to="setting/general"
            className={({ isActive }) => (isActive ? "pv-active" : "")}
          >
            <svg width={20} height={18} viewBox="0 0 20 18" fill="none">
              <path
                d="M18.2563 6.40005C17.8916 6.34708 17.5435 6.21252 17.238 6.00638C16.9325 5.80025 16.6775 5.52785 16.4919 5.20949C16.3063 4.89112 16.1949 4.53498 16.166 4.16759C16.1371 3.8002 16.1914 3.43102 16.325 3.08755C16.4099 2.86301 16.4224 2.61752 16.3608 2.38551C16.2991 2.1535 16.1664 1.94659 15.9813 1.7938C15.1638 1.10734 14.2333 0.568081 13.2313 0.200054C13.0031 0.115293 12.754 0.104703 12.5194 0.169792C12.2849 0.234881 12.0769 0.372329 11.925 0.562554C11.6964 0.854837 11.4043 1.09123 11.0708 1.25381C10.7372 1.41639 10.3711 1.50088 10 1.50088C9.62896 1.50088 9.26279 1.41639 8.92925 1.25381C8.59572 1.09123 8.30359 0.854837 8.07501 0.562554C7.92315 0.372329 7.71513 0.234881 7.48058 0.169792C7.24604 0.104703 6.99693 0.115293 6.76876 0.200054C5.84355 0.53983 4.97851 1.0251 4.20626 1.63755C4.0116 1.79166 3.87139 2.00403 3.80616 2.24359C3.74093 2.48314 3.75411 2.73728 3.84376 2.9688C3.98798 3.32136 4.04757 3.70281 4.01774 4.08255C3.98792 4.4623 3.86951 4.82977 3.67201 5.15548C3.47452 5.4812 3.20343 5.75609 2.88051 5.95812C2.55758 6.16015 2.1918 6.28368 1.81251 6.3188C1.56627 6.34513 1.33498 6.44983 1.15271 6.61748C0.970433 6.78512 0.846801 7.00687 0.800013 7.25005C0.683637 7.82612 0.625014 8.41235 0.625014 9.00005C0.624158 9.49207 0.663876 9.98332 0.743763 10.4688C0.783523 10.7198 0.904855 10.9507 1.089 11.1258C1.27315 11.3009 1.50985 11.4105 1.76251 11.4376C2.15013 11.4739 2.5234 11.6026 2.85108 11.8129C3.17875 12.0231 3.4513 12.3088 3.64591 12.646C3.84051 12.9832 3.95152 13.3621 3.96963 13.751C3.98774 14.1399 3.91244 14.5275 3.75001 14.8813C3.64372 15.1115 3.61735 15.3705 3.6751 15.6174C3.73285 15.8642 3.8714 16.0847 4.06876 16.2438C4.88133 16.9178 5.80287 17.4483 6.79376 17.8126C6.92047 17.8564 7.05342 17.8797 7.18751 17.8813C7.37137 17.8809 7.55245 17.8364 7.71557 17.7516C7.87869 17.6668 8.01909 17.5441 8.12501 17.3938C8.34777 17.0693 8.64638 16.804 8.99491 16.621C9.34344 16.438 9.73137 16.3429 10.125 16.3438C10.5064 16.3443 10.8824 16.4338 11.2232 16.6053C11.5639 16.7767 11.8598 17.0253 12.0875 17.3313C12.239 17.5349 12.4535 17.6827 12.6976 17.7516C12.9418 17.8206 13.2019 17.8068 13.4375 17.7126C14.3436 17.3479 15.1871 16.8439 15.9375 16.2188C16.126 16.0629 16.2602 15.8513 16.3209 15.6144C16.3815 15.3774 16.3655 15.1273 16.275 14.9001C16.128 14.552 16.0639 14.1746 16.0878 13.7976C16.1116 13.4206 16.2228 13.0542 16.4125 12.7275C16.6023 12.4008 16.8653 12.1227 17.1809 11.9151C17.4966 11.7075 17.8561 11.5761 18.2313 11.5313C18.4745 11.4977 18.7007 11.3875 18.8771 11.2167C19.0536 11.0459 19.171 10.8233 19.2125 10.5813C19.3129 10.06 19.3673 9.53088 19.375 9.00005C19.3751 8.44015 19.3228 7.88146 19.2188 7.3313C19.1766 7.09462 19.0608 6.87725 18.8881 6.71007C18.7153 6.5429 18.4942 6.43442 18.2563 6.40005ZM13.125 9.00005C13.125 9.61812 12.9417 10.2223 12.5984 10.7362C12.255 11.2501 11.7669 11.6507 11.1959 11.8872C10.6249 12.1237 9.99654 12.1856 9.39035 12.065C8.78416 11.9444 8.22734 11.6468 7.7903 11.2098C7.35326 10.7727 7.05563 10.2159 6.93506 9.60971C6.81448 9.00352 6.87636 8.37519 7.11289 7.80417C7.34941 7.23315 7.74995 6.74509 8.26385 6.40171C8.77776 6.05833 9.38194 5.87505 10 5.87505C10.8288 5.87505 11.6237 6.20429 12.2097 6.79035C12.7958 7.3764 13.125 8.17125 13.125 9.00005Z"
                fill="#718096"
              />
            </svg>
            <span>{i18n.settings}</span>
          </NavLink>
        </li>
      )}
      {!caps.includes("ndpv_client_role") && <li className="pv-mt-35">
        <a href="https://propovoice.com/docs" target="_blank">
          <svg width={20} height={18} viewBox="0 0 20 18" fill="none">
            <path
              d="M10 7.07129C11.8769 7.07129 13.3984 5.54976 13.3984 3.67285C13.3984 1.79595 11.8769 0.274414 10 0.274414C8.12309 0.274414 6.60156 1.79595 6.60156 3.67285C6.60156 5.54976 8.12309 7.07129 10 7.07129Z"
              fill="#718096"
            />
            <path
              d="M16.875 7.07129C18.0615 7.07129 19.0234 6.1094 19.0234 4.92285C19.0234 3.7363 18.0615 2.77441 16.875 2.77441C15.6885 2.77441 14.7266 3.7363 14.7266 4.92285C14.7266 6.1094 15.6885 7.07129 16.875 7.07129Z"
              fill="#CBD5E0"
            />
            <path
              d="M3.125 7.07129C4.31155 7.07129 5.27344 6.1094 5.27344 4.92285C5.27344 3.7363 4.31155 2.77441 3.125 2.77441C1.93845 2.77441 0.976562 3.7363 0.976562 4.92285C0.976562 6.1094 1.93845 7.07129 3.125 7.07129Z"
              fill="#CBD5E0"
            />
            <path
              d="M5.2418 9.0007C4.39609 8.30781 3.6302 8.39953 2.65234 8.39953C1.18984 8.39953 0 9.58234 0 11.0359V15.3019C0 15.9331 0.515234 16.4464 1.14883 16.4464C3.88422 16.4464 3.55469 16.4959 3.55469 16.3284C3.55469 13.3055 3.19664 11.0887 5.2418 9.0007Z"
              fill="#CBD5E0"
            />
            <path
              d="M10.9302 8.41523C9.22222 8.27277 7.73765 8.41687 6.45715 9.47383C4.31429 11.1902 4.72668 13.5013 4.72668 16.3285C4.72668 17.0765 5.33527 17.6965 6.09465 17.6965C14.34 17.6965 14.6682 17.9625 15.1571 16.8797C15.3175 16.5135 15.2736 16.6299 15.2736 13.127C15.2736 10.3447 12.8645 8.41523 10.9302 8.41523Z"
              fill="#718096"
            />
            <path
              d="M17.3478 8.39943C16.3646 8.39943 15.6029 8.30865 14.7583 9.0006C16.7882 11.0731 16.4454 13.1387 16.4454 16.3283C16.4454 16.4968 16.1719 16.4463 18.8103 16.4463C19.4665 16.4463 20.0001 15.9147 20.0001 15.2611V11.0358C20.0001 9.58224 18.8103 8.39943 17.3478 8.39943Z"
              fill="#CBD5E0"
            />
          </svg>
          <span>Doc &amp; Tutorial</span>
        </a>
      </li>}
    </ul>
  );
};
