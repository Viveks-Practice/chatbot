import ChatButton from "./components/ChatButton";
import ChatHeader from "./components/ChatHeader";
import ChatMessages from "./components/ChatMessages";
import ChatInput from "./components/ChatInput";
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
      <ChatButton isOpen={isOpen} toggleChat={toggleChat} />
      <div className={`chat-container ${isOpen ? "open" : "closed"}`}>
        {isOpen && <ChatHeader toggleChat={toggleChat} />}
        {isOpen && (
          <ChatMessages messages={messages} messagesEndRef={messagesEndRef} />
        )}
        {isOpen && (
          <ChatInput
            input={input}
            setInput={setInput}
            handleSend={handleSend}
          />
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
