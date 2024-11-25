// src/context/StreamContext.tsx
import React, { createContext, useContext, ReactNode, useState } from "react";
import { CreateMessage, useChat } from "ai/react";

import Anthropic from "@anthropic-ai/sdk";
import { ChatRequestOptions, generateId, Message } from "ai";
import useAnthropicModel from "@sentient/hooks/useModelConfig";
import { Metrics, StreamContextProps } from "@sentient/types";

export const StreamContext = createContext<StreamContextProps | undefined>(
  undefined
);

const anthropic = new Anthropic({
  apiKey: process.env.AI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const anthropicModelFetch = async (
  messages: Message[],
  append: (
    message: Message | CreateMessage,
    chatRequestOptions?: ChatRequestOptions
  ) => Promise<string | null | undefined>,
  setMessages: (
    messages: Message[] | ((messages: Message[]) => Message[])
  ) => void
): Promise<any> => {
  const messageId = generateId();

  const { config } = useAnthropicModel(messages);

  const stream: any = anthropic.messages.stream(config);

  const botMessage = {
    role: "assistant",
    content: "",
    id: messageId,
  } as Message;
  try {
    let isNewEntry = true;
    if (stream) {
      for await (const event of stream) {
        const delta = event?.delta?.text || "";
        botMessage.content += delta;

        setMessages((messages: Message[]) => {
          if (botMessage.content == "") {
            return [...messages];
          }
          if (isNewEntry) {
            isNewEntry = false;
            return [...messages, botMessage];
          }
          return [
            ...messages.slice(0, messages.length - 1),
            { ...messages[messages.length - 1], content: botMessage.content },
          ];
        });
      }
    }
  } catch (error) {
    console.log("ERROR", error);
    append({
      role: "assistant",
      content: "An error occurred during the response.",
      id: messageId,
    });
  }
};

export const StreamProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [metrics, setMetrics] = useState<Metrics>({
    tokensPerSecond: 0,
    totalTokens: 0,
  });

  const {
    messages,
    input,
    handleSubmit,
    isLoading,
    handleInputChange,
    append,
    setInput,
    setMessages,
  } = useChat({
    fetch: (_, { body }: RequestInit | undefined) => {
      return anthropicModelFetch(
        JSON.parse(body).messages,
        append,
        setMessages
      );
    },
  });

  const sendMessage = async (input: string) => {
    const startTime = performance.now();

    if (!input.trim()) return;

    setInput("");

    handleSubmit();
    const endTime = performance.now();
    const tokenCount = input.split(" ").length;

    setMetrics((prev) => ({
      tokensPerSecond: tokenCount / ((endTime - startTime) / 1000),
      totalTokens: prev.totalTokens + tokenCount,
    }));
  };

  return (
    <StreamContext.Provider
      value={{
        messages,
        sendMessage,
        isLoading,
        metrics,
        input,
        handleSubmit,
        handleInputChange,
        setInput,
      }}
    >
      {children}
    </StreamContext.Provider>
  );
};
