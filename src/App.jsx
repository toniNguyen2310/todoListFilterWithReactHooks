import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Filters from "./Component/Filters/Filters";
import TodoList from "./Component/TodoList/TodoList";
function App() {
  return (
    <>
      <div>
        <h1>Todo App With React Hook</h1>
        <Filters />
      </div>
    </>
  );
}
export default App;
