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
    <div className="app">
      <div className="sidebar">
        <h2>Users</h2>
        <ul>
          {users.map((user) => (
            <li
              key={user.id}
              onClick={() => handleUserClick(user)}
              className={user.isActive ? "active" : ""}
            >
              {user.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="chat-panel">
        <h2>{selectedUser.name}</h2>
        <ul>
          {filteredMessages.map((message) => (
            <li
              key={message.id}
              className={
                message.senderId === 1 ? "message mine" : "message other"
              }
            >
              <div className="message-text">{message.text}</div>
              <div className="message-time">{message.time}</div>
            </li>
          ))}
        </ul>
        <form onSubmit={handleMessageSubmit}>
          <input type="text" name="message" />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default App;
