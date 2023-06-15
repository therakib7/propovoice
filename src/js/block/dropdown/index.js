import React, { useRef, useState, useEffect } from 'react';
import api from 'api';

const Dropdown = (props) => {
  const dropdownRef = useRef(null);
  const [dropdown, setDropdown] = useState(false);
  const [userNotifications, setUserNotifications] = useState();
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
    if (props.purpose === "notification") {
      get_user_notifications();
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
    }
  }, [props.purpose, dropdown, countNew]);

  const get_user_notifications = (filter = "all") => {
    api.get(`notifications/users/${ndpv.profile.id}`, `filter=${filter}`, "pro").then(resp => {
      setUserNotifications(resp.data);
    });
  }

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
  const markAllAsRead = () => {
    api.get(`notifications/users/${ndpv.profile.id}/mark-all-as-read`, "", "pro").then(resp => {
      setCountNew(resp.data);
    });
  }

  const handleNotificationOnClick = (notificationId) => {
    api.get(`notifications/${notificationId}/mark-as-read`, "", "pro").then(resp => {
      setDropdown(false);
    });
  };

  const handleFilterOnClick = (filter) => {
    get_user_notifications(filter)
  }

  const handleMarkAllAsReadOnClick = () => {
    markAllAsRead();
  }

  const blueCircleStyle = {
    height: "6px",
    width: "6px",
    backgroundColor: "#4C6FFF",
    borderRadius: "50%",
    display: "inline-block"
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
        {props.purpose === "notification" && countNew > 0 && (countNew)}
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

      {dropdown && (<div >

        {
          props.purpose === "notification" && (
            <div style={{ display: "inline-block" }}>
              <button onClick={() => { handleFilterOnClick("all") }}>All</button>
              <button onClick={() => { handleFilterOnClick("unseen") }}>Unread</button>
              <button onClick={() => { handleMarkAllAsReadOnClick() }}>Mark all as read</button>
            </div>
          )
        }
        < ul className="pv-dropdown-content pv-show">

          {userNotifications && userNotifications.map((item, index) => {
            const isSeen = parseInt(item.is_seen);
            return (<li key={index} onClick={() => { handleNotificationOnClick(item.notification_id) }}><div style={{ display: "inline-block" }} dangerouslySetInnerHTML={{ __html: item.message }}></div>{!isSeen && (< div style={blueCircleStyle}></div>)
            }</li>)
          })}

          {props.list.length > 0 && (props.list.map((item, index) => (
            <a key={index} href={item.url}>{item.label}</a>
          )))}
          {!userNotifications && !props.list.length && (<a>No content</a>)}


        </ul>
      </div>
      )
      }
    </div >
  );
};

export default Dropdown;
