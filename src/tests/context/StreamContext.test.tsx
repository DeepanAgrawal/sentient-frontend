// src/context/StreamContext.test.tsx
import { render, screen, fireEvent, act } from "@testing-library/react";
import { StreamProvider, StreamContext } from "@sentient/context/StreamContext";
import * as aiReact from "ai/react"; // Import the whole module
import * as anthropicSdk from "@anthropic-ai/sdk"; // Mocking Anthropic SDK
import * as modelConfig from "@sentient/hooks/useModelConfig"; // Mocking `useAnthropicModel`

jest.mock("ai/react"); // Mock the entire module
jest.mock("@anthropic-ai/sdk");
jest.mock("@sentient/hooks/useModelConfig");

// Test setup for mocking
const mockSetMessages = jest.fn();
const mockSetInput = jest.fn();
const mockHandleSubmit = jest.fn();
const mockAppend = jest.fn();
const mockStream = jest.fn();

// Mocking `useChat`
aiReact.useChat = jest.fn(() => ({
  messages: [],
  input: "",
  handleSubmit: mockHandleSubmit,
  isLoading: false,
  handleInputChange: jest.fn(),
  append: mockAppend,
  setInput: mockSetInput,
  setMessages: mockSetMessages,
}));

// Mocking `Anthropic` SDK
anthropicSdk.Anthropic = jest.fn().mockImplementation(() => ({
  messages: {
    stream: mockStream,
  },
}));

// Mocking `useAnthropicModel`
modelConfig.default = jest.fn(() => ({
  config: { model: "mock-model-config" },
}));

describe("StreamContext", () => {
  test("provides initial context values", () => {
    render(
      <StreamProvider>
        <StreamContext.Consumer>
          {(context) => {
            expect(context).toHaveProperty("messages");
            expect(context).toHaveProperty("sendMessage");
            expect(context).toHaveProperty("isLoading");
            expect(context).toHaveProperty("metrics");
            expect(context).toHaveProperty("input");
            return null;
          }}
        </StreamContext.Consumer>
      </StreamProvider>
    );
  });

  test("calls sendMessage and updates metrics", async () => {
    const mockSetMetrics = jest.fn();
    const { result } = render(
      <StreamProvider>
        <StreamContext.Consumer>
          {(context) => {
            return (
              <button onClick={() => context.sendMessage("Test message")}>
                Send
              </button>
            );
          }}
        </StreamContext.Consumer>
      </StreamProvider>
    );

    // Simulate user clicking the button to send a message
    const button = screen.getByText("Send");
    await act(async () => fireEvent.click(button));

    // Check if `sendMessage` was called
    expect(mockSetMetrics).toHaveBeenCalled();
  });

  test("fetch function calls anthropicModelFetch and handles response", async () => {
    const mockSetMessages = jest.fn();
    const mockAppend = jest.fn();
    const mockAnthropicModelFetch = jest.fn().mockResolvedValueOnce({});

    // Overriding the fetch function in useChat to use the mock
    aiReact.useChat = jest.fn(() => ({
      messages: [],
      input: "",
      handleSubmit: mockHandleSubmit,
      isLoading: false,
      handleInputChange: jest.fn(),
      append: mockAppend,
      setInput: mockSetInput,
      setMessages: mockSetMessages,
    }));

    render(
      <StreamProvider>
        <StreamContext.Consumer>
          {(context) => {
            return (
              <button onClick={() => context.sendMessage("Test message")}>
                Send
              </button>
            );
          }}
        </StreamContext.Consumer>
      </StreamProvider>
    );

    const button = screen.getByText("Send");
    await act(async () => fireEvent.click(button));

    // Check if `anthropicModelFetch` was called
    expect(mockAnthropicModelFetch).toHaveBeenCalled();
  });
});
