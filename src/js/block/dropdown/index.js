import React, { useRef, useState, useEffect } from 'react';
import api from 'api';

const Dropdown = (props) => {
  const dropdownRef = useRef(null);
  const [dropdown, setDropdown] = useState(false);
  const [userNotifications, setUserNotifications] = useState();
  const [svgCode, setSvgCode] = useState(null);

  const toggleDropdown = () => {
    setDropdown((prevDropdown) => !prevDropdown);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdown(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [dropdownRef]);

  useEffect(() => {
    if (props.purpose === "notification") {
      get_user_notifications();
    }
  }, []);

  const get_user_notifications = () => {
    api.get(`users/${ndpv.profile.id}/notifications`, "", "pro").then(resp => {
      setUserNotifications(resp.data);
    })

  }

  const iconContent = props.isSvgIcon ? (
    props.icon
  ) : (
    <img src={props.icon} alt={props.label} />
  );


  return (
    <div className="pv-dropdown" ref={dropdownRef}>
      <button className="pv-dropbtn" onClick={toggleDropdown}>
        {iconContent}
        {props.label}
        <svg className="pv-dropdown-angle" width="12" height="7" viewBox="0 0 12 7" fill="none">
          <path
            d="M10.375 1.25L6 5.625L1.625 1.25"
            stroke="#718096"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {dropdown && (
        <div className="pv-dropdown-content pv-show">

          {userNotifications && userNotifications.map((item, index) => {
            return (< a key={index} href="#" > <div dangerouslySetInnerHTML={{ __html: item.message }}></div></a>)
          })}

          {props.list.length > 0 && (props.list.map((item, index) => (
            <a key={index} href={item.url}>{item.label}</a>
          )))}
          {!userNotifications && !props.list.length && (<a>No content</a>)}


        </div>
      )
      }
    </div >
  );
};

export default Dropdown;
