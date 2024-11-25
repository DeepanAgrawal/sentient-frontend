import React from "react"; // Ensure this is at the top of the file
import { render, screen, fireEvent } from "@testing-library/react";
import ParameterControl from "@sentient/components/controls/ParameterControl";

describe("ParameterControl", () => {
  test("renders label and initial value", () => {
    const mockOnChange = jest.fn();
    render(
      <ParameterControl
        label="Temperature"
        value={1.5}
        onChange={mockOnChange}
      />
    );

    // Check if the label is rendered
    expect(screen.getByText("Temperature")).toBeInTheDocument();

    // Check if the initial value is rendered correctly
    expect(screen.getByText("1.5")).toBeInTheDocument();
  });

  test("updates value when range input is changed", () => {
    const mockOnChange = jest.fn();
    render(
      <ParameterControl
        label="Temperature"
        value={1.5}
        onChange={mockOnChange}
      />
    );

    // Get the range input element
    const input = screen.getByRole("slider");

    // Simulate changing the range input value
    fireEvent.change(input, { target: { value: "2" } });

    // Check if the onChange callback was called with the correct value
    expect(mockOnChange).toHaveBeenCalledWith(2);

    // Check if the value displayed is updated correctly
    expect(screen.getByText("2.0")).toBeInTheDocument();
  });

  test("renders correct value when user moves the slider", () => {
    const mockOnChange = jest.fn();
    render(
      <ParameterControl
        label="Temperature"
        value={1.0}
        onChange={mockOnChange}
      />
    );

    // Get the range input and slide it to a new value
    const input = screen.getByRole("slider");
    fireEvent.change(input, { target: { value: "1.8" } });

    // Check if the value displayed next to the slider is updated
    expect(screen.getByText("1.8")).toBeInTheDocument();
  });

  test("displays the formatted value as a number with one decimal place", () => {
    const mockOnChange = jest.fn();
    render(
      <ParameterControl
        label="Temperature"
        value={2.5}
        onChange={mockOnChange}
      />
    );

    // Check if the value is formatted correctly
    expect(screen.getByText("2.5")).toBeInTheDocument();
  });
});
