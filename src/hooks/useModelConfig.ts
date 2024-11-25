import { Message } from "ai";
import {
  MessageCreateParamsBase,
  MessageParam,
} from "@anthropic-ai/sdk/resources/messages.mjs";

const useAnthropicModel = (messages: Message[]) => {
  // Create the model config when messages are received

  const config: MessageCreateParamsBase = {
    model: "claude-3-opus-20240229", // Static model name
    max_tokens: 1024, // Define max_tokens based on your requirements
    messages: messages.map((msg) => ({
      role: msg.role,
      content: msg.content,
    })) as MessageParam[],
    stream: true, // Streaming is enabled
  };

  return { config };
};

export default useAnthropicModel;
