import "../styles/globals.css";
import { StreamProvider } from "../context/StreamContext";
import HomePage from ".";
import dotenv from "dotenv";

dotenv.config();
// jest.setup.js
import "@testing-library/jest-dom"; // for additional assertions

global.React = require("react"); // Ensure React is globally available if necessary

function MyApp() {
  return (
    <StreamProvider>
      <HomePage />
    </StreamProvider>
  );
}

export default MyApp;
