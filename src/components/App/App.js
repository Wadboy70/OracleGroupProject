import React, { useState } from 'react';
import Layout from '../layout/layout';
import { Route, Switch } from 'react-router-dom';
import './App.scss';
import TrendsPage from '../TrendsPage/TrendsPage';
import { sendQuery } from '../../oracle';

function App() {
  const [val, setVal] = useState("");
  return (
    <Layout>
      <Switch>
        <Route exact path = '/'>
          <div className = 'sendQueryBox'>
            <textarea type = 'text' onChange = {e => setVal(e.target.value)}>
            </textarea>
            <button onClick = {async e => console.log(await sendQuery(val, e))}>
              Send a Query
            </button>
          </div>
        </Route>
        <Route exact path = '/trends' component = {TrendsPage}/>
        <Route exact path = '/about'/>
      </Switch>
    </Layout>
  );
}

export default App;
