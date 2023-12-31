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

import getConfig from "../config";

const handleSend = async (input, setInput, messages, setMessages) => {
  if (input.trim() === "") return;

  // Structured message format for the user's message
  const newUserMessage = { role: "user", content: input.trim() };

  // Update the state with the user's message immediately
  setMessages([...messages, newUserMessage]);

  setInput("");

  // Create a new object with all previous messages + the new user message
  const updatedMessages = [...messages, newUserMessage];

  const config = getConfig();
  // Define default values
  const defaultAiIdentifier = "ft:gpt-3.5-turbo-0613:personal::8AicazxS";
  const defaultSystemMessage =
    "You are an assistant representative of the StarMining company. Your sole purpose is to market Starmining's products and services and inform the client to hopefully get them onboard with Starmining's services. Even if they don't choose to buy our products/services now, they will ideally have us in mind and potentially refer us to another client, or come back another time to buy our services!";

  // Check and set the values conditionally
  const aiVariant =
    config.GPT_VARIANT === "ai_model_00"
      ? defaultAiIdentifier
      : config.GPT_VARIANT;
  const systemMessageValue =
    config.GPT_SYSTEM_MESSAGE === "system_message_00"
      ? defaultSystemMessage
      : config.GPT_SYSTEM_MESSAGE;

  try {
    const response = await fetch(
      //   "https://us-central1-chat-window-widget.cloudfunctions.net/chatBotGPTChatFunction3",
      "https://us-central1-chat-window-widget.cloudfunctions.net/gpt-ai-request",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 'Authorization': 'Bearer YOUR_STATIC_IDENTITY_TOKEN',
        },
        body: JSON.stringify({
          messages: updatedMessages,
          aiModel: aiVariant, // Passed as part of the request body
          systemMessage: systemMessageValue, // Passed as part of the request body
        }), // Sending the whole updatedMessages array
      }
    );

    const responseData = await response.json();

    console.log("responseData: ", responseData);
    const aiMessage = responseData.message; // Extracting the message from the responseData

    // Structured message format for the AI's response
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "assistant", content: aiMessage },
    ]);

    console.log("All messages, messages Array: ", messages);
  } catch (error) {
    console.error("Error calling GCF:", error);

    // Structured message format for the error message
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        role: "assistant",
        content: "Sorry, there was an error processing your request.",
      },
    ]);
  }
};

export default handleSend;
