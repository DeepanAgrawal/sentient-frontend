// src/components/playground/MessageWindow.test.tsx
import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import MessageWindow from "@sentient/components/messages/MessageWindow";
import { Message } from "ai";

// Mocked messages for testing
const messages: Message[] = [
  { id: "1", role: "user", content: "Hello!" },
  { id: "2", role: "assistant", content: "Hi! How can I help you?" },
];

describe("MessageWindow", () => {
  test("renders the message content correctly", () => {
    render(<MessageWindow messages={messages} />);

    // Check if the user's message is displayed
    expect(screen.getByText("user : Hello!")).toBeInTheDocument();

    // Check if the assistant's message is displayed
    expect(
      screen.getByText("assistant : Hi! How can I help you?")
    ).toBeInTheDocument();
  });

  test("displays no messages when the messages array is empty", () => {
    render(<MessageWindow messages={[]} />);

    // Check for the "No messages yet" message
    expect(
      screen.getByText("No messages yet. Start a conversation!")
    ).toBeInTheDocument();
  });

  test("scrolls to the bottom when new messages are added", async () => {
    const { rerender } = render(<MessageWindow messages={messages} />);

    // Get the scrollable container
    const container = screen.getByRole("div", {
      name: /message window/i,
    }) as HTMLDivElement;

    // Check initial scroll position
    const initialScrollTop = container.scrollTop;

    // Add a new message
    const newMessage: Message = {
      id: "3",
      role: "user",
      content: "What is the time?",
    };
    rerender(<MessageWindow messages={[...messages, newMessage]} />);

    // Wait for the component to re-render
    await waitFor(() =>
      expect(container.scrollTop).toBeGreaterThan(initialScrollTop)
    );
  });

  test("applies correct styling for user and assistant messages", () => {
    render(<MessageWindow messages={messages} />);

    // Check if user message has correct styles
    const userMessage = screen.getByText("user : Hello!");
    expect(userMessage.parentElement).toHaveClass("bg-blue-500");
    expect(userMessage.parentElement).toHaveClass("ml-auto");

    // Check if assistant message has correct styles
    const assistantMessage = screen.getByText(
      "assistant : Hi! How can I help you?"
    );
    expect(assistantMessage.parentElement).toHaveClass("bg-gray-200");
    expect(assistantMessage.parentElement).toHaveClass("mr-auto");
  });
});
