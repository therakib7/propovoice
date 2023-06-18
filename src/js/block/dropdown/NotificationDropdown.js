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
      <div className="pv-dropdown-content pv-show" >
        <h3 style={{ padding: '12px 16px' }}>Notifications</h3>

        <div style={{ display: 'inline-flex', gap: '8px', padding: '12px 16px' }}>
          <button className='pv-btn pv-btn-small pv-bg-stroke pv-bg-hover-shadow pv-active' onClick={() => { handleFilterOnClick("all") }}>All</button>
          <button className='pv-btn pv-btn-small pv-bg-stroke pv-bg-hover-shadow' onClick={() => { handleFilterOnClick("unseen") }}>Unread</button>
          <button className='pv-btn pv-btn-small pv-bg-stroke pv-bg-hover-shadow' onClick={() => { handleMarkAllAsReadOnClick() }}>Mark all as read</button>
        </div>
        < ul >

          {userNotifications && userNotifications.map((item, index) => {
            const isSeen = parseInt(item.is_seen);
            return (
              <li style={{}} key={index} onClick={() => { handleNotificationOnClick(item.notification_id) }}>
                <div style={{}}>
                  <div style={{}} dangerouslySetInnerHTML={{ __html: item.message }}></div>
                  {!isSeen &&
                    (< div style={blueCircleStyle}></div>)
                  }
                </div>
                <div >
                  {moment.utc(item.created_at).local().startOf('seconds').fromNow()}
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  );
}

export default NotificationDropdown;
