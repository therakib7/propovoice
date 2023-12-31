import React, { useState, useEffect } from 'react';
import api from 'api';
import moment from 'moment';

import Action from './Action';

const NotificationDropdown = (props) => {
  const [userNotifications, setUserNotifications] = useState();

  const [activeTab, setActiveTab] = useState('all');


  useEffect(() => {
    get_user_notifications();
  }, [props.dropdown, props.countNew]);

  const get_user_notifications = (filter = "all") => {
    api.get(`notifications/users/${ndpv.profile.id}`, `filter=${filter}`, "pro").then(resp => {
      setUserNotifications(resp.data);
    });
  }
  const handleFilterOnClick = (filter) => {
    setActiveTab(filter);
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

  const dropdownWraperStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    width: "260px",
    height: "482px",
    zIndex: "9",
    position: 'absolute',
    top: "55px",
    right: "0",
    background: "#FFFFFF",
    border: "1px solid #E2E8F0",
    boxShadow: "0px 4.95074px 6.60099px rgba(32, 29, 67, 0.07)",
    borderRadius: "10px",
  }
  const listStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    overflow: "auto",
    marginRight: "4px",
    padding: "16px"
  }

  const listItmeStyle = {
    display: "flex",
    gap: "4px",
    alignItems: 'center'
  }
  const blueCircleStyle = {
    height: "6px",
    width: "6px",
    marginLeft: "6px",
    backgroundColor: "#4C6FFF",
    borderRadius: "50%",
    display: "inline-block"
  }

  const howLongStyle = {
    fontFamily: 'Inter',
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "10px",
    lineHeight: "100%",
    color: "#4C6FFF",
  }

  return (
    <>
      <div className="" style={dropdownWraperStyle}>
        <h3 style={{
          padding: "16px 16px 0 16px",
          fontSize: '16px',
          color: '#2D3748',
          fontWeight: 500,
          display: 'flex',
          justifyContent: 'space-between'
        }}>Notifications <Action markAllAsRead={handleMarkAllAsReadOnClick} /></h3>

        <div style={{ display: 'inline-flex', gap: '8px', padding: "0 16px" }}>
          <button
            className={"pv-btn pv-btn-small pv-bg-hover-shadow"}
            style={{
              color: (activeTab == 'all'
                ? "#2D3748"
                : "#718096")
            }}
            onClick={() => { handleFilterOnClick("all") }}>All</button>
          <button
            className={"pv-btn pv-btn-small pv-bg-hover-shadow"}
            style={{
              color: (activeTab == 'unseen'
                ? "#2D3748"
                : "#718096")
            }}
            onClick={() => { handleFilterOnClick("unseen") }}>Unread</button>
        </div>

        < ul style={listStyle}>
          {userNotifications && userNotifications.map((item, index) => {
            const isSeen = parseInt(item.is_seen);
            return (
              <li style={listItmeStyle} key={index} onClick={() => { handleNotificationOnClick(item.notification_id) }}>
                <div style={{
                  display: "flex", flexDirection: 'column', gap: "4px", flexGrow: "1", paddingTop: '14px', borderTop: '1px solid #EDF2F7'
                }}>
                  <div style={{

                  }} dangerouslySetInnerHTML={{ __html: item.message }}></div>
                  <div style={!isSeen ? howLongStyle : { ...howLongStyle, color: '#A0AEC0' }}>
                    {moment.utc(item.created_at).local().startOf('seconds').fromNow()}
                  </div>
                </div>

                {
                  (< div style={!isSeen ? blueCircleStyle : { ...blueCircleStyle, visibility: 'hidden' }}></div>)
                }
              </li>
            )
          })}
        </ul>
      </div>
    </>
  );
}

export default NotificationDropdown;
