import "../styles/globals.css";
import { StreamProvider } from "../context/StreamContext";
import HomePage from ".";
import dotenv from "dotenv";

dotenv.config();
// jest.setup.js

global.React = require("react"); // Ensure React is globally available if necessary

function MyApp() {
  return (
    <StreamProvider>
      <HomePage />
    </StreamProvider>
  );
}

export default MyApp;
