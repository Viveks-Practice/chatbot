import React from "react";

const ChatMessages = ({ messages, messagesEndRef }) => (
  <div className="chat-messages">
    {messages.map((message, index) => (
      <div key={index} className={`chat-message ${message.role}`}>
        {message.content}
      </div>
    ))}
    <div ref={messagesEndRef} />
  </div>
);

export default ChatMessages;
