import { useStream } from "@sentient/hooks/useStream";
import { StreamProvider } from "@sentient/context/StreamContext";
import { renderHook } from "@testing-library/react-hooks";

describe("useStream Hook", () => {
  it("should return the context value when used inside StreamProvider", () => {
    // Rendering the hook inside the provider using renderHook
    const { result } = renderHook(() => useStream(), {
      wrapper: StreamProvider, // Wrapping the hook with the StreamProvider
    });

    // Checking if the result is an object and contains expected properties
    expect(result.current).toHaveProperty("messages");
    expect(result.current).toHaveProperty("sendMessage");
    expect(result.current).toHaveProperty("isLoading");
    expect(result.current).toHaveProperty("metrics");
    expect(result.current).toHaveProperty("input");
  });

  it("should throw an error when used outside of StreamProvider", () => {
    // Rendering the hook outside the provider to expect an error
    const { result } = renderHook(() => useStream());

    // Expecting the hook to throw an error when used outside the provider
    expect(() => result.current).toThrowError(
      "useStream must be used within a StreamProvider"
    );
  });
});
