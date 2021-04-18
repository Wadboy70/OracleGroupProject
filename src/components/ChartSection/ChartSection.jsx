import React, { useEffect, useState } from "react";
import { Chart } from "react-charts";
import { sendQuery } from "../../oracle";
import "./ChartSection.scss";

const ChartSection = ({ chartData, dates }) => {
  const { title, query, func, axes_, series_, options_ } = chartData;
  const [val, setVal] = useState([
    {
      label: "Series 1",
      data: [
        { primary: 1, secondary: 10 },
        { primary: 2, secondary: 12 },
        { primary: 3, secondary: 10 },
      ],
    },
    {
      label: "Series 2",
      data: [
        { primary: 1, secondary: 10 },
        { primary: 2, secondary: 15 },
        { primary: 3, secondary: 10 },
      ],
    },
    {
      label: "Series 3",
      data: [
        { primary: 1, secondary: 10 },
        { primary: 2, secondary: 17 },
        { primary: 3, secondary: 10 },
      ],
    },
  ]);
  const data = React.useMemo(() => val, [val]);

  const series = React.useMemo(() => series_, [series_]);

  const options = React.useMemo(() => options_, [options_]);

  const axes = React.useMemo(() => axes_, [axes_]);

  const getYear = (e) => new Date(e).getFullYear();

  useEffect(() => {
    const { start, end } = dates;
    console.log(getYear(start));
    let fetchData = async () =>
      setVal(func(await sendQuery(query(getYear(start), getYear(end)))));
    fetchData();
  }, [query, setVal, func, dates]);

  useEffect(() => {
    console.log(val);
  }, [val]);

  return (
    <div className="chartSection">
      <h3 className="chartSection__title">{title}</h3>
      <div className="chartSection__chart">
        <Chart data={data} axes={axes} series={series} options={options} />
      </div>
    </div>
  );
};

export default ChartSection;
