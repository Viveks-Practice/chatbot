import ChatButton from "./components/ChatButton";
import ChatHeader from "./components/ChatHeader";
import ChatMessages from "./components/ChatMessages";
import ChatInput from "./components/ChatInput";
import { createRoot } from "react-dom/client";
import React, { useState, useEffect, useRef } from "react";
import "./Chatbot.css";
import handleSendFunction from "./functions/handleSend";

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

  /**
   * Sends a user's message to a cloud function for processing and appends the AI's response to the chat.
   *
   * @param {string} input - The current input value from the user.
   * @param {function} setInput - A setter function to update the input state.
   * @param {array} messages - An array of current chat messages.
   * @param {function} setMessages - A setter function to update the messages state.
   *
   * - If the user's input is empty, the function exits without further processing.
   * - Appends the user's message to the chat.
   * - Makes an asynchronous HTTP request to the specified cloud function endpoint with the user's message.
   * - On a successful response from the cloud function, appends the AI's response to the chat.
   * - In case of an error in the HTTP request, appends an error message to the chat.
   * - Resets the user input field to an empty string.
   */
  const sendHandler = () =>
    handleSendFunction(input, setInput, messages, setMessages);

  return (
    <div className="chat-interface">
      <ChatButton isOpen={isOpen} toggleChat={toggleChat} />
      {isOpen && (
        <div className="chat-container open">
          <ChatHeader toggleChat={toggleChat} />
          <ChatMessages messages={messages} messagesEndRef={messagesEndRef} />
          <ChatInput
            input={input}
            setInput={setInput}
            handleSend={sendHandler}
          />
        </div>
      )}
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
