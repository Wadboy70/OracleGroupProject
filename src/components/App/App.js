import React, { useState } from 'react';
import Layout from '../layout/layout';
import { Route, Switch } from 'react-router-dom';
import './App.scss';

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
    <Layout>
      <Switch>
        <Route exact path = '/'>
          <div className = 'sendQueryBox'>
            <textarea type = 'text' onChange = {e => setVal(e.target.value)}>
            </textarea>
            <button onClick = {sendQuery}>
              Send a Query
            </button>
          </div>
        </Route>
        <Route exact path = '/trends'/>
        <Route exact path = '/about'/>
      </Switch>
    </Layout>
  );
}

export default App;
