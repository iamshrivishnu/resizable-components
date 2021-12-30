import React from "react";
import FormWrapper from "./component/FormWrapper";
import Resizable from "./component/Resizable";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Resizable component="div" content={"abcdeabced"} />
      <Resizable component="p" content={"abcdeabced"} />
      <Resizable component="header" content={"abcdeabced"} />
      <FormWrapper />
    </div>
  );
}

export default App;
