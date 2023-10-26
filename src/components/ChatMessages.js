const ChatMessages = ({ messages, messagesEndRef }) => (
  <div className="chat-messages">
    {messages.map((message, index) => (
      <div key={index} className={`chat-message ${message.sender}`}>
        {message.text}
      </div>
    ))}
    <div ref={messagesEndRef} />
  </div>
);

export default ChatMessages;
