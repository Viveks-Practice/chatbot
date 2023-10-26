const React = require("react");
const { createRoot } = require("react-dom");
const { useState, useEffect, useRef } = require("react");
require("./Chatbot.css");

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false); // State to manage if chat is open or closed
  const [messages, setMessages] = useState([]); // State to keep track of messages
  const [input, setInput] = useState(""); // State to keep track of input field

  const messagesEndRef = useRef(null); // Creates a ref to scroll into view after rendering

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]); // Added isOpen as a dependency

  const toggleChat = () => setIsOpen(!isOpen); // Function to toggle chat open/close

  const handleSend = () => {
    if (input.trim() === "") return;
    setMessages([...messages, { text: input, sender: "user" }]); // new message at the end
    setInput("");
  };

  return (
    <div className="chat-interface">
      <button
        className={`chat-button ${isOpen ? "hide" : ""}`}
        onClick={toggleChat}
        aria-label="Toggle Chat"
      >
        {/* You can use an emoji or an icon library like Font Awesome for a chat icon here */}
        💬
      </button>

      <div className={`chat-container ${isOpen ? "open" : "closed"}`}>
        {isOpen && (
          <div className="chat-header">
            <h2 className="chat-title">Neo</h2>
            <button className="close-button" onClick={toggleChat}>
              &times;
            </button>
          </div>
        )}
        {isOpen && (
          <div className="chat-messages">
            {messages.map((message, index) => (
              <div key={index} className={`chat-message ${message.sender}`}>
                {message.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
        {isOpen && (
          <div className="chat-input">
            <form
              onSubmit={(e) => {
                e.preventDefault(); // Prevents the default form submission behavior
                if (input.trim() !== "") {
                  handleSend();
                }
              }}
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && input.trim() !== "") {
                    handleSend();
                    e.preventDefault(); // Prevents the default behavior
                  }
                }}
                placeholder="Type your message..."
              />
              <button type="submit">Send</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

window.ChatbotWidget = class {
  constructor() {
    const chatbotElement = document.createElement("div");
    chatbotElement.id = "chatbot-widget-container";
    document.body.appendChild(chatbotElement);

    const root = createRoot(chatbotElement); // Using createRoot as per React 18 changes
    root.render(<Chatbot />);
  }
};

new window.ChatbotWidget();

export default Chatbot; // comment out when bundling to inject into a customer's website
