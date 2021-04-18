import React, { useState } from "react";
import Layout from "../layout/layout";
import { Route, Switch } from "react-router-dom";
import "./App.scss";
import TrendsPage from "../TrendsPage/TrendsPage";
import HomePage from "../HomePage/HomePage";
import { sendQuery } from "../../oracle";

function App() {
  const [val, setVal] = useState("");
  return (
    <Layout>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/trends" component={TrendsPage} />
        <Route exact path="/testing">
          <div className="sendQueryBox">
            <textarea
              type="text"
              onChange={(e) => setVal(e.target.value)}
              rows={6}
            ></textarea>
            <button onClick={async (e) => console.log(await sendQuery(val, e))}>
              Send a Query
            </button>
          </div>
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
