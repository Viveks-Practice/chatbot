const ChatButton = ({ isOpen, toggleChat }) => (
  <button
    className={`chat-button ${isOpen ? "hide" : ""}`}
    onClick={toggleChat}
    aria-label="Toggle Chat"
  >
    💬
  </button>
);

export default ChatButton;
