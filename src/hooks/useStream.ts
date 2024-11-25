import { useContext } from "react";
import { StreamContext } from "@sentient/context/StreamContext";

export const useStream = () => {
  const context = useContext(StreamContext);
  if (!context) {
    throw new Error("useStream must be used within a StreamProvider");
  }
  return context;
};
