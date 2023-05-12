import React, { useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([
    { id: 1, name: "User 1", isActive: true },
    { id: 2, name: "User 2", isActive: false },
    { id: 3, name: "User 3", isActive: false },
    { id: 4, name: "User 4", isActive: false },
  ]);

  const [messages, setMessages] = useState([
    {
      id: 1,
      senderId: 1,
      receiverId: 2,
      text: "Hi there!",
      time: "10:00 AM",
    },
    { id: 2, senderId: 2, receiverId: 1, text: "Hey!", time: "10:01 AM" },
    {
      id: 3,
      senderId: 1,
      receiverId: 2,
      text: "How are you?",
      time: "10:02 AM",
    },
  ]);

  const [selectedUser, setSelectedUser] = useState(users[0]);

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setUsers(
      users.map((u) =>
        u.id === user.id ? { ...u, isActive: true } : { ...u, isActive: false }
      )
    );
  };

  const handleMessageSubmit = (event) => {
    event.preventDefault();
    const messageText = event.target.elements.message.value;
    const newMessage = {
      id: messages.length + 1,
      senderId: selectedUser.id,
      receiverId: 1,
      text: messageText,
      time: new Date().toLocaleTimeString(),
    };
    setMessages([...messages, newMessage]);
    event.target.elements.message.value = "";
  };

  const filteredMessages = messages.filter(
    (m) =>
      (m.senderId === 1 && m.receiverId === selectedUser.id) ||
      (m.senderId === selectedUser.id && m.receiverId === 1)
  );

  return (
    <>
      <h2 className="pv-page-title" style={{ marginBottom: 10 }}>
        Inbox
      </h2>
      <p className="pv-messages-sub-title">You have 2 unread messages</p>
      <div className="pv-settings-tab">
        <div className="pv-message-content">
          <div className="pv-people-list">
            <div className="pv-people-list-head">
              <svg viewBox="0 0 100 80" width={16} height={20}>
                <rect width={100} height={12} />
                <rect y={29} width={100} height={12} />
                <rect y={57} width={100} height={12} />
              </svg>
              <h4>All messsage</h4>
            </div>
            <div className="pv-search">
              <svg
                width={20}
                height={20}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.77 18.3C9.2807 18.3 7.82485 17.8584 6.58655 17.031C5.34825 16.2036 4.38311 15.0275 3.81318 13.6516C3.24325 12.2757 3.09413 10.7616 3.38468 9.30096C3.67523 7.84029 4.39239 6.49857 5.44548 5.44548C6.49857 4.39239 7.84029 3.67523 9.30096 3.38468C10.7616 3.09413 12.2757 3.24325 13.6516 3.81318C15.0275 4.38311 16.2036 5.34825 17.031 6.58655C17.8584 7.82485 18.3 9.2807 18.3 10.77C18.3 11.7588 18.1052 12.738 17.7268 13.6516C17.3484 14.5652 16.7937 15.3953 16.0945 16.0945C15.3953 16.7937 14.5652 17.3484 13.6516 17.7268C12.738 18.1052 11.7588 18.3 10.77 18.3V18.3ZM10.77 4.74999C9.58331 4.74999 8.42327 5.10189 7.43657 5.76118C6.44988 6.42046 5.68084 7.35754 5.22672 8.45389C4.77259 9.55025 4.65377 10.7566 4.88528 11.9205C5.11679 13.0844 5.68824 14.1535 6.52735 14.9926C7.36647 15.8317 8.43556 16.4032 9.59945 16.6347C10.7633 16.8662 11.9697 16.7474 13.0661 16.2933C14.1625 15.8391 15.0995 15.0701 15.7588 14.0834C16.4181 13.0967 16.77 11.9367 16.77 10.75C16.77 9.15869 16.1379 7.63257 15.0126 6.50735C13.8874 5.38213 12.3613 4.74999 10.77 4.74999Z"
                  fill="#718096"
                />
                <path
                  d="M20 20.75C19.9014 20.7505 19.8038 20.7312 19.7128 20.6935C19.6218 20.6557 19.5392 20.6001 19.47 20.53L15.34 16.4C15.2075 16.2578 15.1354 16.0698 15.1388 15.8755C15.1422 15.6812 15.2209 15.4958 15.3583 15.3584C15.4958 15.221 15.6811 15.1422 15.8754 15.1388C16.0697 15.1354 16.2578 15.2075 16.4 15.34L20.53 19.47C20.6704 19.6106 20.7493 19.8012 20.7493 20C20.7493 20.1987 20.6704 20.3894 20.53 20.53C20.4607 20.6001 20.3782 20.6557 20.2872 20.6935C20.1961 20.7312 20.0985 20.7505 20 20.75Z"
                  fill="#718096"
                />
              </svg>
              <input type="text" placeholder="Search Message" />
            </div>
            <div className="pv-button">
              <button className="pv-btn pv-btn-small pv-bg-stroke pv-btn-active">
                Index
              </button>
              <button className="pv-btn pv-btn-small pv-bg-stroke">
                Projects
              </button>
              <button className="pv-btn pv-btn-small pv-bg-stroke">
                Members
              </button>
            </div>
            <h4 className="pv-projects">Projects</h4>
            <ul className="pv-list">
              <li>
                <span className="pv-time">08:11am</span>
                <img src="assets/img/chat-people.png" alt="chat-people" />
                <div className="pv-about">
                  <div className="pv-name">Comps Mobile App</div>
                  <div className="pv-status">
                    Nabil: Habitually fact of those peop...
                  </div>
                </div>
              </li>
              <li className="pv-multi-people">
                <span className="pv-time">08:11am</span>
                <div className="pv-multi-people-img">
                  <img src="assets/img/multi-people-1.png" alt="multi-people" />
                  <img src="assets/img/multi-people-2.png" alt="multi-people" />
                  <img src="assets/img/multi-people-3.png" alt="multi-people" />
                </div>
                <div className="pv-about">
                  <div className="pv-name">Comps Mobile App</div>
                  <div className="pv-status">
                    Nabil: Habitually fact of those peop...
                  </div>
                </div>
              </li>
              <li className="pv-multi-people">
                <span className="pv-time">08:11am</span>
                <div className="pv-multi-people-img">
                  <img src="assets/img/multi-people-1.png" alt="multi-people" />
                  <img src="assets/img/multi-people-2.png" alt="multi-people" />
                  <img src="assets/img/multi-people-3.png" alt="multi-people" />
                  <span className="pv-add-img">2+</span>
                </div>
                <div className="pv-about">
                  <div className="pv-name">Comps Mobile App</div>
                  <div className="pv-status">
                    Nabil: Habitually fact of those peop...
                  </div>
                </div>
              </li>
              <li>
                <span className="pv-time">08:11am</span>
                <img src="assets/img/chat-people-2.png" alt="chat-people" />
                <div className="pv-about">
                  <div className="pv-name">Aiden Chavez</div>
                  <div className="pv-status">
                    Nabil: Habitually fact of those peop...
                  </div>
                </div>
              </li>
              <li>
                <span className="pv-time">08:11am</span>
                <img src="assets/img/chat-people-3.png" alt="chat-people" />
                <div className="pv-about">
                  <div className="pv-name">Qbyte Landing Page</div>
                  <div className="pv-status">
                    Nabil: Habitually fact of those peop...
                  </div>
                </div>
              </li>
              <li>
                <span className="pv-time">08:11am</span>
                <img src="assets/img/chat-people-4.png" alt="chat-people" />
                <div className="pv-about">
                  <div className="pv-name">Erica Hughes</div>
                  <div className="pv-status">
                    Nabil: Habitually fact of those peop...
                  </div>
                </div>
              </li>
              <li>
                <span className="pv-time">08:11am</span>
                <img src="assets/img/chat-people-5.png" alt="chat-people" />
                <div className="pv-about">
                  <div className="pv-name">Ginger Johnston</div>
                  <div className="pv-status">
                    Nabil: Habitually fact of those peop...
                  </div>
                </div>
              </li>
              <li>
                <span className="pv-time">08:11am</span>
                <img src="assets/img/chat-people-6.png" alt="chat-people" />
                <div className="pv-about">
                  <div className="pv-name">Tracy Carpenter</div>
                  <div className="pv-status">
                    <i className="fa fa-circle offline" /> left 30 mins ago
                  </div>
                </div>
              </li>
              <li>
                <span className="pv-time">08:11am</span>
                <img src="assets/img/chat-people.png" alt="chat-people" />
                <div className="pv-about">
                  <div className="pv-name">Christian Kelly</div>
                  <div className="pv-status">
                    <i className="fa fa-circle offline" /> left 10 hours ago
                  </div>
                </div>
              </li>
              <li>
                <span className="pv-time">08:11am</span>
                <img src="assets/img/chat-people-2.png" alt="chat-people" />
                <div className="pv-about">
                  <div className="pv-name">Christian Kelly</div>
                  <div className="pv-status">
                    <i className="fa fa-circle offline" /> left 10 hours ago
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="pv-chat">
            <div className="pv-chat-header clearfix">
              <div className="pv-chat-about">
                <div className="pv-chat-with">
                  Comps Mobile App Design
                  <span
                    className="pv-badge pv-ml"
                    style={{ background: "#DDFFDE", marginLeft: 10 }}
                  >
                    Project
                  </span>{" "}
                </div>
                <div className="pv-chat-num-messages">3 Members</div>
              </div>
            </div>{" "}
            {/* end pv-chat-header */}
            <div className="pv-chat-history">
              <ul>
                <li>
                  <p>
                    <span className="pv-message-data-time">
                      Monday, December 26, 2022
                    </span>
                  </p>
                  <div className="pv-message-data">
                    <img src="assets/img/chat-people-2.png" alt="chat-people" />
                    <div className="pv-about">
                      <div className="pv-name">Nabil Emon</div>
                      <div className="pv-message">
                        Hi Vincent, how are you? How is the project coming along?
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="pv-message pv-other-message">
                    Well I am not sure. The rest of the team is not here yet.
                    Maybe in an hour or so? Have you faced any problems at the
                    last phase of the project?
                  </div>
                </li>
                <li>
                  <p>
                    <span className="pv-message-data-time">
                      Monday, December 26, 2022
                    </span>
                  </p>
                  <div className="pv-message-data">
                    <img src="assets/img/chat-people-2.png" alt="chat-people" />
                    <div className="pv-about">
                      <div className="pv-name">Nabil Emon</div>
                      <div className="pv-message">
                        Hi Vincent, how are you? How is the project coming along?
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="pv-message pv-other-message">
                    Well I am not sure. The rest of the team is not here yet.
                    Maybe in an hour or so? Have you faced any problems at the
                    last phase of the project?
                  </div>
                </li>
                <li>
                  <p>
                    <span className="pv-message-data-time">
                      Monday, December 26, 2022
                    </span>
                  </p>
                  <div className="pv-message-data">
                    <img src="assets/img/chat-people-2.png" alt="chat-people" />
                    <div className="pv-about">
                      <div className="pv-name">Nabil Emon</div>
                      <div className="pv-message">
                        Hi Vincent, how are you? How is the project coming along?
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="pv-message pv-other-message">
                    Well I am not sure. The rest of the team is not here yet.
                    Maybe in an hour or so? Have you faced any problems at the
                    last phase of the project?
                  </div>
                </li>
              </ul>
            </div>{" "}
            {/* end pv-chat-history */}
            <div className="pv-chat-message">
              <div className="pv-icon">
                <span>
                  <svg
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M21.21 7.899V16.05C21.21 19.07 19.32 21.2 16.3 21.2H7.65C4.63 21.2 2.75 19.07 2.75 16.05V7.899C2.75 4.879 4.64 2.75 7.65 2.75H16.3C19.32 2.75 21.21 4.879 21.21 7.899Z"
                      stroke="#757575"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5.28125 16.4303L6.80925 14.8173C7.34025 14.2543 8.22525 14.2273 8.78925 14.7573C8.80625 14.7743 9.72625 15.7093 9.72625 15.7093C10.2813 16.2743 11.1883 16.2833 11.7533 15.7293C11.7903 15.6933 14.0872 12.9073 14.0872 12.9073C14.6792 12.1883 15.7422 12.0853 16.4622 12.6783C16.5102 12.7183 18.6803 14.9453 18.6803 14.9453"
                      stroke="#757575"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10.3127 9.13291C10.3127 10.1019 9.52769 10.8869 8.55869 10.8869C7.58969 10.8869 6.80469 10.1019 6.80469 9.13291C6.80469 8.16391 7.58969 7.37891 8.55869 7.37891C9.52769 7.37991 10.3127 8.16391 10.3127 9.13291Z"
                      stroke="#757575"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="paper-clip">
                  <svg
                    width={15}
                    height={16}
                    viewBox="0 0 15 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.5001 4.24894L3.99228 10.8661C3.77683 11.1039 3.66107 11.4154 3.66897 11.7362C3.67687 12.057 3.80782 12.3624 4.03471 12.5893C4.2616 12.8162 4.56705 12.9472 4.88783 12.9551C5.2086 12.963 5.52013 12.8472 5.75791 12.6318L13.5157 4.76457C13.9466 4.28901 14.1781 3.66595 14.1623 3.0244C14.1465 2.38286 13.8846 1.77195 13.4309 1.31817C12.9771 0.864391 12.3662 0.602491 11.7246 0.586696C11.0831 0.5709 10.46 0.802418 9.98447 1.23332L2.22666 9.10051C1.52425 9.80292 1.12964 10.7556 1.12964 11.7489C1.12964 12.7423 1.52425 13.695 2.22666 14.3974C2.92907 15.0998 3.88174 15.4944 4.8751 15.4944C5.86845 15.4944 6.82112 15.0998 7.52353 14.3974L13.9376 7.99894"
                      stroke="#2D3748"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
              <div className="pv-textarea">
                <span className="pv-smile">
                  <svg
                    width={25}
                    height={25}
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g filter="url(#filter0_dd_7949_115008)">
                      <path
                        d="M12.0313 16.5C16.1734 16.5 19.5313 13.1421 19.5313 9C19.5313 4.85786 16.1734 1.5 12.0313 1.5C7.88911 1.5 4.53125 4.85786 4.53125 9C4.53125 13.1421 7.88911 16.5 12.0313 16.5Z"
                        stroke="black"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9.03125 10.5C9.03125 10.5 10.1562 12 12.0312 12C13.9062 12 15.0312 10.5 15.0312 10.5"
                        stroke="black"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9.78125 6.75H9.789"
                        stroke="black"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M14.2812 6.75H14.289"
                        stroke="black"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                    <defs>
                      <filter
                        id="filter0_dd_7949_115008"
                        x="-0.96875"
                        y={0}
                        width={26}
                        height={26}
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                      >
                        <feFlood floodOpacity={0} result="BackgroundImageFix" />
                        <feColorMatrix
                          in="SourceAlpha"
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          result="hardAlpha"
                        />
                        <feOffset dy={4} />
                        <feGaussianBlur stdDeviation={2} />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                        />
                        <feBlend
                          mode="normal"
                          in2="BackgroundImageFix"
                          result="effect1_dropShadow_7949_115008"
                        />
                        <feColorMatrix
                          in="SourceAlpha"
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          result="hardAlpha"
                        />
                        <feOffset dy={4} />
                        <feGaussianBlur stdDeviation={2} />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                        />
                        <feBlend
                          mode="normal"
                          in2="effect1_dropShadow_7949_115008"
                          result="effect2_dropShadow_7949_115008"
                        />
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="effect2_dropShadow_7949_115008"
                          result="shape"
                        />
                      </filter>
                    </defs>
                  </svg>
                </span>
                <textarea
                  name="message-to-send"
                  id="message-to-send"
                  placeholder="Type a message"
                  rows={1}
                  defaultValue={""}
                />
                <button>Send</button>
              </div>
            </div>{" "}
            {/* end chat-message */}
          </div>{" "}
          {/* end pv-chat */}
          <div className="pv-chat-right-content">
            <div className="pv-multi-people-img">
              <img src="assets/img/multi-people-1.png" alt="multi-people" />
              <img src="assets/img/multi-people-2.png" alt="multi-people" />
              <img src="assets/img/multi-people-3.png" alt="multi-people" />
            </div>
            <h3>Comps Mobile App</h3>
            <p>3 Members</p>
            <button className="pv-btn pv-btn-medium pv-bg-shadow">
              <svg
                width={15}
                height={15}
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.5 8H13.5"
                  stroke="#2D3748"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M8 2.5V13.5"
                  stroke="#2D3748"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
              Add Lead
            </button>
            <div className="pv-add-members">
              <h4>Project Members</h4>
              <div className="pv-add-people-list">
                <img src="assets/img/avatar.png" alt="avatar" />
                <h4>Nabil Ahmed</h4>
              </div>
            </div>
          </div>
        </div>{" "}
        {/* end pv-container */}
        {/* ./ pv-tabs */}
      </div>
      {/* ./ pv-payment-tab */}
    </>
  );
}

export default App;
