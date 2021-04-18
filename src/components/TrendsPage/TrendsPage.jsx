import React, { useEffect, useState } from "react";
import { queries } from "../../oracle";
import ChartSection from "../ChartSection/ChartSection";
import "./TrendsPage.scss";

const TrendsPage = () => {
  const [chart, setChart] = useState(0);
  const [dates, setDates] = useState({
    start: "1900-01-01",
    end: new Date().toISOString().match(/[-0-9]{10}/)[0],
  });

  const handleResetDate = () => {
    setDates({
      start: "1900-01-01",
      end: new Date().toISOString().match(/[-0-9]{10}/)[0],
    })
  }

  const left = () => setChart(chart === 0 ? queries.length - 1 : chart - 1);
  const right = () => setChart(chart === queries.length - 1 ? 0 : chart + 1);

  const setDate = (val, which) => setDates({ ...dates, [which]: val });

  useEffect(()=>{
    handleResetDate();
  },[chart])

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
          value = {dates.start}
        />
        <input
          type="date"
          value = {dates.end}
          onChange={(e) => setDate(e.target.value, "end")}
        />
      </div>
    </div>
  );
};

export default TrendsPage;
