const ChatInput = ({ input, setInput, handleSend }) => (
  <div className="chat-input">
    <form
      onSubmit={(e) => {
        e.preventDefault();
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
            e.preventDefault();
          }
        }}
        placeholder="Type your message..."
      />
      <button type="submit">Send</button>
    </form>
  </div>
);

export default ChatInput;
