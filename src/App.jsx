import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ApiWithReact from "./Components/ApiWithReact/ApiWithReact";
import SignupUsers from "./Components/ControlUsers/SignupUsers";
import Login from "./Components/ControlUsers/Login";

function App() {
  return (
    <>
      {/* <ApiWithReact /> */}
      {/* <Login /> */}
      <SignupUsers />
    </>
  );
}
export default App;
