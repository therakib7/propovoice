import React, { useRef, useState, useEffect } from 'react';
import api from 'api';
import NotificationDropdown from './NotificationDropdown';

const Dropdown = (props) => {
  const dropdownRef = useRef(null);
  const [dropdown, setDropdown] = useState(false);
  const [countNew, setCountNew] = useState(0);

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
    count_new_notifications();
    if (dropdown && countNew > 0) {
      markAsOld();
    }

    const interval = setInterval(() => {
      count_new_notifications();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [dropdown, countNew]);


  const count_new_notifications = () => {
    api.get(`notifications/users/${ndpv.profile.id}/count-new`, "", "pro").then(resp => {
      setCountNew(resp.data);
    });
  }
  const markAsOld = () => {
    api.get(`notifications/users/${ndpv.profile.id}/mark-as-old`, "", "pro").then(resp => {
      setCountNew(resp.data);
    });
  }

  const iconStyle = {
    position: 'relative',
    background: "rgba(76, 111, 255, 0.1)",
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center", /* Horizontal centering */
    alignItems: "center" /* Vertical centering */
  };
  const countStyle = {
    // position: 'absolute',
    minWidth: '12px',
    minHeight: '12px',
    background: '#FF267F',
    padding: "2px",
    display: "flex",
    justifyContent: "center", /* Horizontal centering */
    alignItems: "center", /* Vertical centering */
    borderRadius: "50%",
    position: 'absolute',
    top: '0px',
    right: '0px',
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '9px',
    lineHeight: '100%',
    color: '#FFFFFF',

  }

  const iconContent = props.isSvgIcon ? (
    <>
      <div style={iconStyle}>{props.icon}

        {props.purpose === "notification" && countNew > 0 && (<div style={countStyle}>{countNew}</div>)}
      </div>

    </>
  ) : (
    <img src={props.icon} alt={props.label} />
  );


  return (
    <div className="pv-dropdown" ref={dropdownRef}>
      <button className="pv-dropbtn" onClick={toggleDropdown}>
        {iconContent}
        {props.label}
        {props.purpose !== "notification" && (<svg className="pv-dropdown-angle" width="12" height="7" viewBox="0 0 12 7" fill="none">
          <path
            d="M10.375 1.25L6 5.625L1.625 1.25"
            stroke="#718096"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>)}

      </button>

      {dropdown && (<div >

        {
          props.purpose === "notification" &&
          <NotificationDropdown
            dropdown={dropdown}
            updateDropdown={setDropdown}
            countNew={countNew}
            updateCount={setCountNew}
          />
        }
        < ul className="pv-dropdown-content pv-show">

          {props.list.length > 0 && (props.list.map((item, index) => (
            <a key={index} href={item.url}>{item.label}</a>
          )))}
          {props.purpose !== "notification" && !props.list.length && (<a>No content</a>)}


        </ul>
      </div>
      )
      }
    </div >
  );
};

export default Dropdown;
