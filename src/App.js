import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [val, setVal] = useState("");
  const sendQuery = (e) => {
    e.preventDefault();
    console.log(val);
    fetch("/db", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({query: val}),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <textarea type = 'text' onChange = {e => setVal(e.target.value)}>
        </textarea>
        <button onClick = {sendQuery}>
          send query
        </button>
      </header>
    </div>
  );
}

export default App;
