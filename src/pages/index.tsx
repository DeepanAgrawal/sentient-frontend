import React, { useState } from "react";
import { useStream } from "@sentient/hooks/useStream";
import MessageWindow from "../components/messages/MessageWindow";
import ParameterControl from "../components/controls/ParameterControl";
import MetricsDisplay from "../components/playground/MetricsDisplay";

const HomePage: React.FC = () => {
  const {
    messages,
    sendMessage,
    isLoading,
    metrics,
    handleInputChange,
    input,
    setInput,
  } = useStream();

  const [temperature, setTemperature] = useState(1.0);

  return (
    <div className="container mx-auto p-6 h-full w-full">
      <MessageWindow messages={messages} />
      <MetricsDisplay {...metrics} />
      <ParameterControl
        label="Temperature"
        value={temperature}
        onChange={(value) => setTemperature(value)}
      />
      <textarea
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          handleInputChange(e);
        }}
        placeholder="Type your message..."
        className="w-full p-2 mt-4 border rounded"
      />
      <button
        onClick={() => {
          sendMessage(input);
        }}
        disabled={isLoading}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
      >
        {isLoading ? "Generating..." : "Send"}
      </button>
    </div>
  );
};

export default HomePage;
