import React, { useCallback, useEffect, useState } from "react";
import "./FormWrapper.css";
const axios = require('axios');

const FormWrapper = () => {
  const [state, setState] = useState({
    textId: 0,
    text: "",
    addCount: 0,
    updateCount: 0,
  });

  const apiDomain = process.env.BACKEND_URI

  useEffect(()=>{
    axios.get(`${apiDomain}/fetch-count`).then(({ data })=>{
        setState((prevState)=>({
            ...prevState,
            textId: data.addCount + 1,
            addCount: data.addCount,
            updateCount: data.updateCount,
          }))        
    }).catch(()=>{
        setState({
            textId: 0,
            text: "",
            addCount: 0,
            updateCount: 0,
          })
    })
  },[apiDomain])

  const addHandler = useCallback(async () => {
      try{
         const axiosData = await axios.post(`${apiDomain}/add-data`,{ text: state.text })
         const { data: { textId } } = axiosData
         setState((prevState) => ({ ...prevState, textId, addCount: prevState.addCount+1 }))
      }catch(error){
        setState((prevState) => ({ ...prevState }))
      }
  }, [apiDomain, state.text]);
  
  const updateHandler = useCallback(async () => {
    try{
       await axios.patch(`${apiDomain}/update-data`,{ textId: state.textId, text: state.text })
       setState((prevState) => ({ ...prevState, updateCount: prevState.updateCount+1 }))
    }catch(error){
      setState((prevState) => ({ ...prevState }))
    }
}, [apiDomain, state.textId, state.text]);

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
