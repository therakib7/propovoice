import React, { useState, useEffect } from 'react';
import api from 'api';
import moment from 'moment';

const NotificationDropdown = (props) => {
  const [userNotifications, setUserNotifications] = useState();


  useEffect(() => {
    get_user_notifications();
  }, [props.dropdown]);

  const get_user_notifications = (filter = "all") => {
    api.get(`notifications/users/${ndpv.profile.id}`, `filter=${filter}`, "pro").then(resp => {
      setUserNotifications(resp.data);
    });
  }
  const handleFilterOnClick = (filter) => {
    get_user_notifications(filter)
  }

  const markAllAsRead = () => {
    api.get(`notifications/users/${ndpv.profile.id}/mark-all-as-read`, "", "pro").then(resp => {
      get_user_notifications();
    });
  }
  const handleMarkAllAsReadOnClick = () => {
    markAllAsRead();
  }



  const handleNotificationOnClick = (notificationId) => {
    api.get(`notifications/${notificationId}/mark-as-read`, "", "pro").then(resp => {
      props.updateDropdown(false);
    });
  };

  const blueCircleStyle = {
    height: "6px",
    width: "6px",
    backgroundColor: "#4C6FFF",
    borderRadius: "50%",
    display: "inline-block"
  }


  return (
    <>
      <div style={{ display: "inline-block" }}>
        <button onClick={() => { handleFilterOnClick("all") }}>All</button>
        <button onClick={() => { handleFilterOnClick("unseen") }}>Unread</button>
        <button onClick={() => { handleMarkAllAsReadOnClick() }}>Mark all as read</button>
      </div>

      < ul className="pv-dropdown-content pv-show">
        {userNotifications && userNotifications.map((item, index) => {
          const isSeen = parseInt(item.is_seen);
          return (
            <li key={index} onClick={() => { handleNotificationOnClick(item.notification_id) }}><div style={{ display: "inline-block" }} dangerouslySetInnerHTML={{ __html: item.message }}></div>{!isSeen && (< div style={blueCircleStyle}></div>)

            }<p>
                {moment.utc(item.created_at).local().startOf('seconds').fromNow()}
              </p>
            </li>
          )
        })}
      </ul>
    </>
  );
}

export default NotificationDropdown;
