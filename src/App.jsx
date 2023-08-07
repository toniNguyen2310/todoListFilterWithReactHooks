import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ApiWithReact from "./Components/ApiWithReact/ApiWithReact";
import PagiApi from "../src/PagiApi";
import TestApi from "./Components/Test API/TestApi";
import TestValidate from "./Components/Test API/TestValidate";
function App() {
  return (
    <>
      <ApiWithReact />
      {/* <PagiApi /> */}
      {/* <TestValidate /> */}
    </>
  );
}
export default App;
