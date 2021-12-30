import React, { useCallback, useState } from "react";
import "./FormWrapper.css";

const FormWrapper = () => {
  const [state, setState] = useState({
    textId: null,
    text: "",
    addCount: 0,
    updateCount: 0,
  });

  const addHandler = useCallback(() => {
    setState((prevState) => ({ ...prevState, text: "" }));
  }, []);
  
  const updateHandler = useCallback(() => {
    setState((prevState) => ({ ...prevState, text: "" }));
  }, []);

  const textUpdateHandler = useCallback((event) => {
    const value = event.target.value;
    setState((prevState) => ({ ...prevState, text: value }));
  }, []);
  return (
    <div className="form-wrapper">
      <h1>Content Form</h1>
      <div>
        <input defaultValue={state.text} onChange={textUpdateHandler} />
        <label>{`Text ID : ${state.textId}, Add Count : ${state.addCount}, Update Count : ${state.updateCount}`}</label>
      </div>
      <div>
        <button onClick={addHandler}>Add</button>
        <button onClick={updateHandler}>Update</button>
      </div>
    </div>
  );
};

export default FormWrapper;
