import React from "react";

import { render, fireEvent, screen } from "@testing-library/react";
import { useStream } from "@sentient/hooks/useStream";
import HomePage from "@sentient/pages/index";
import "@testing-library/jest-dom";

// Mocking the useStream hook to avoid actual API calls
jest.mock("@sentient/hooks/useStream", () => ({
  useStream: jest.fn(),
}));

describe("HomePage", () => {
  beforeEach(() => {
    // Resetting mock implementation before each test
    (useStream as jest.Mock).mockReturnValue({
      messages: [],
      sendMessage: jest.fn(),
      isLoading: false,
      handleInputChange: jest.fn(),
      input: "",
      setInput: jest.fn(),
    });
  });

  it("should render the HomePage correctly", () => {
    render(<HomePage />);

    // Example test to check if some content is rendered
    expect(
      screen.getByPlaceholderText("Type your message...")
    ).toBeInTheDocument();
  });

  it("should call sendMessage when the send button is clicked", async () => {
    const sendMessageMock = jest.fn();
    (useStream as jest.Mock).mockReturnValue({
      messages: [],
      sendMessage: sendMessageMock,
      isLoading: false,
      metrics: { tokensPerSecond: 0, totalTokens: 0 },
      handleInputChange: jest.fn(),
      input: "Hello",
      setInput: jest.fn(),
    });

    render(<HomePage />);

    // Type a message and click the send button
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "Hello" },
    });
    fireEvent.click(screen.getByText("Send"));

    // Ensure sendMessage was called with the correct input
    expect(sendMessageMock).toHaveBeenCalledWith("Hello");
  });

  it("should call setInput and handleInputChange when typing in the textarea", () => {
    const setInputMock = jest.fn();
    const handleInputChangeMock = jest.fn();
    (useStream as jest.Mock).mockReturnValue({
      messages: [],
      sendMessage: jest.fn(),
      isLoading: false,
      metrics: { tokensPerSecond: 0, totalTokens: 0 },
      handleInputChange: handleInputChangeMock,
      input: "",
      setInput: setInputMock,
    });

    render(<HomePage />);

    // Type in the textarea and check if setInput and handleInputChange are called
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "New message" },
    });
    expect(setInputMock).toHaveBeenCalledWith("New message");
    expect(handleInputChangeMock).toHaveBeenCalled();
  });

  it("should render the metrics display correctly", () => {
    const mockMetrics = { tokensPerSecond: 1.2, totalTokens: 100 };
    (useStream as jest.Mock).mockReturnValue({
      messages: [],
      sendMessage: jest.fn(),
      isLoading: false,
      metrics: mockMetrics,
      handleInputChange: jest.fn(),
      input: "",
      setInput: jest.fn(),
    });

    render(<HomePage />);

    // Ensure metrics display is showing the correct data
    expect(screen.getByText(/Tokens per second/i)).toHaveTextContent("1.2");
    expect(screen.getByText(/Total tokens/i)).toHaveTextContent("100");
  });
});
