const ChatHeader = ({ toggleChat }) => (
  <div className="chat-header">
    <h2 className="chat-title">Neo</h2>
    <button className="close-button" onClick={toggleChat}>
      &times;
    </button>
  </div>
);

export default ChatHeader;
