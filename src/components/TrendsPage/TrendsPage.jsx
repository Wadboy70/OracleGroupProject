import React, { useEffect, useState } from "react";
import { queries } from "../../oracle";
import ChartSection from "../ChartSection/ChartSection";
import "./TrendsPage.scss";

let date = new Date();

let day = date.getDate(),
  month = date.getMonth() + 1,
  year = date.getFullYear();
month = month < 10 ? "0" + month : month;
day = day < 10 ? "0" + day : day;

let today = year + "-" + month + "-" + day;

const TrendsPage = () => {
  const [chart, setChart] = useState(0);
  const [dates, setDates] = useState({
    start: "1964-01-01",
    end: new Date().toISOString().match(/[-0-9]{10}/)[0],
  });

  const left = () => setChart(chart === 0 ? queries.length - 1 : chart - 1);
  const right = () => setChart(chart === queries.length - 1 ? 0 : chart + 1);

  const setDate = (val, which) => setDates({ ...dates, [which]: val });

  useEffect(() => {
    console.log(dates);
  }, [dates]);

  return (
    <div className="trendsPage">
      <div className="trendsPage__arrows">
        <button onClick={left}>⏪</button>
        <button onClick={right}>⏩</button>
      </div>
      <ChartSection chartData={queries[chart] || {}} dates={dates} />
      <div className="trendsPage__dateBox">
        <input
          type="date"
          onChange={(e) => setDate(e.target.value, "start")}
          defaultValue="1964-01-01"
        />
        <input
          type="date"
          defaultValue={today}
          onChange={(e) => setDate(e.target.value, "end")}
        />
      </div>
      <div className="description">
        <h3>Uses for this query</h3>
        <p>{queries[chart].desc}</p>
      </div>
    </div>
  );
};

export default TrendsPage;
