import React, { useState } from "react";
import "./App.css";

function App() {
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [users, setUsers] = React.useState([
    {
      id: 1,
      name: "John Doe",
      profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
      messages: [
        { text: "Hi there!", time: "10:00 AM", mine: false },
        { text: "Hey John, how's it going?", time: "10:02 AM", mine: true },
        { text: "Pretty good, thanks!", time: "10:05 AM", mine: false },
      ],
    },
    {
      id: 2,
      name: "Jane Doe",
      profilePic: "https://randomuser.me/api/portraits/women/1.jpg",
      messages: [
        { text: "Hello!", time: "11:00 AM", mine: false },
        { text: "Hi Jane, what's up?", time: "11:02 AM", mine: true },
        { text: "Not much, just hanging out.", time: "11:05 AM", mine: false },
      ],
    },
  ]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [currentUser, setCurrentUser] = React.useState(null);
  const [newMessage, setNewMessage] = React.useState("");

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    const messageText = newMessage.trim();
    if (messageText === "") return;
    const newMessageObj = { text: messageText, time: getTime(), mine: true };
    const updatedUsers = users.map((user) => {
      if (user.id === selectedUser.id) {
        return {
          ...user,
          messages: [...user.messages, newMessageObj],
        };
      } else {
        return user;
      }
    });
    setUsers(updatedUsers);
    setNewMessage("");
  };

  const getTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  return (
    <div className="app">
      <div className="sidebar">
        <h2>Users</h2>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search users"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <ul className="users">
          {filteredUsers.map((user) => (
            <li
              key={user.id}
              className={selectedUser === user ? "active" : ""}
              onClick={() => handleUserClick(user)}
            >
              <div className="user-image">
                <img src={user.profilePic} alt={user.name} />
              </div>
              <div className="user-info">
                <h3>{user.name}</h3>
                {user.messages.length > 0 && (
                  <p className="last-message">
                    {user.messages[user.messages.length - 1].text}
                  </p>
                )}
                {user.messages.length > 0 && (
                  <span className="last-message-time">
                    {user.messages[user.messages.length - 1].time}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="chat">
        {selectedUser ? (
          <>
            <h2>{selectedUser.name}</h2>
            <ul className="chat-messages">
              {selectedUser.messages.map((message, index) => (
                <li
                  key={index}
                  className={message.sender === currentUser.id ? "sent" : "received"}
                >
                  <div className="message-content">{message.text}</div>
                  <div className="message-time">{message.time}</div>
                </li>
              ))}
            </ul>
            <form onSubmit={handleMessageSubmit}>
              <input
                type="text"
                placeholder="Type your message here"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button type="submit">Send</button>
            </form>
          </>
        ) : (
          <p>Please select a user to start chatting</p>
        )}
      </div>
    </div>
  );


}

export default App;