import React from "react";
import Resizable from "./component/Resizable";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Resizable component="div" content={"abcdeabced"} />
      <Resizable component="p" content={"abcdeabced"} />
      <Resizable component="header" content={"abcdeabced"} />
    </div>
  );
}

export default App;
