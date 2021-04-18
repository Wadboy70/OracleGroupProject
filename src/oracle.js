export const sendQuery = (val, e) => {
  e?.preventDefault();
  return fetch("/db", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify({ query: val }),
  }).then((res) => res.json());
};

export const queries = [
  {
    title: "#1 Percentage of Explicit Tracks over the years",
    query: (startValue, endValue) =>
      `WITH explicit AS (  SELECT  s.SONG_YEAR,  COUNT(f.EXPLICIT) as NumExplicit  FROM SONG_FEATURES f  JOIN SONG s ON f.Song_ID = s.Song_ID  WHERE f.EXPLICIT = 'True'  GROUP BY s.SONG_YEAR ), notExplicit AS (  SELECT  s.SONG_YEAR,  COUNT(f.EXPLICIT) as NumNotExplicit  FROM SONG_FEATURES f  JOIN SONG s on f.Song_ID = s.SONG_ID  WHERE f.EXPLICIT = 'False'  GROUP BY s.SONG_YEAR ) SELECT  e.SONG_YEAR,  e.NumExplicit,  ne.NumNotExplicit,  ROUND(e.NumExplicit/(e.NumExplicit+ne.NumNotExplicit), 6) as PercentExplicit,  ROUND(ne.NumNotExplicit/(e.NumExplicit+ne.NumNotExplicit), 6) as PercentNotExplicit FROM explicit e JOIN notExplicit ne on ne.SONG_YEAR = e.SONG_YEAR where e.SONG_YEAR < ${
        endValue || 2021
      } and e.SONG_YEAR > ${
        startValue || 1964
      } GROUP BY e.SONG_YEAR, e.NumExplicit, ne.NumNotExplicit ORDER BY e.SONG_YEAR DESC`,
    func: (data) => {
      let rows =
        data?.val
          ?.map((row) => ({
            primary: row.SONG_YEAR,
            secondary: row.PERCENTEXPLICIT,
          }))
          .reverse() || [];
      console.log(rows);
      return [
        {
          label: "yuh",
          data: rows,
        },
      ];
    },
    axes_: [
      {
        primary: true,
        type: "ordinal",
        position: "bottom",
        maxLabelRotation: 90,
      },
      { type: "linear", position: "left" },
    ],
    series_: { type: "bar" },
    options_: {
      scales: {
        xAxes: [
          {
            ticks: {
              autoSkip: false,
              maxRotation: 0,
              minRotation: 0,
            },
          },
        ],
      },
    },
  },
  {
    title: "#5 Average loudness for top 200 songs and other songs over time",
    query: (startValue, endValue) =>
      `WITH billboard AS (SELECT s.release_date, AVG(f.loudness) as AvgBillboardLoudness FROM song_features f JOIN song s on s.Song_ID = f.song_ID JOIN Top200billboard b ON f.Song_ID = b.Song_ID GROUP BY s.release_date ORDER BY s.release_date DESC),
        nonBillboard AS ( SELECT s.release_date, AVG(f.loudness) AS AvgNonBillboardLoudness FROM song_features f JOIN song s on s.Song_ID = f.song_ID WHERE f.song_id NOT IN (SELECT Song_ID from Top200billboard) GROUP BY s.release_date ORDER BY s.release_date DESC)
        SELECT b.*, n.AvgNonBillboardLoudness FROM billboard b JOIN nonBillboard n ON b.release_date = n.release_date
        WHERE TO_NUMBER(SUBSTR(b.release_date, 0, LENGTH(b.release_date) - 6)) < ${
          endValue || 2021
        } AND TO_NUMBER(SUBSTR(b.release_date, 0, LENGTH(b.release_date) - 6)) > ${
        startValue || 1964
      }`,
    func: (data) => {
      let rows1 =
        data?.val
          ?.map((row) => ({
            primary: row.RELEASE_DATE.substring(0, 7),
            secondary: row.AVGBILLBOARDLOUDNESS,
          }))
          .reverse() || [];
      let rows2 =
        data?.val
          ?.map((row) => ({
            primary: row.RELEASE_DATE.substring(0, 7),
            secondary: row.AVGNONBILLBOARDLOUDNESS,
          }))
          .reverse() || [];
      console.log(rows1);
      console.log(rows2);
      return [
        {
          label: "Top 200 Songs",
          data: rows1,
        },
        {
          label: "Other Songs",
          data: rows2,
        },
      ];
    },
    axes_: [
      {
        primary: true,
        type: "ordinal",
        position: "bottom",
        maxLabelRotation: 90,
      },
      { type: "linear", position: "left" },
    ],
    series_: { type: "line" },
    options_: {
      scales: {
        xAxes: [
          {
            ticks: {
              autoSkip: false,
              maxRotation: 90,
              minRotation: 90,
            },
          },
        ],
      },
    },
  },
  {
    title: "#6 Average wordiness for top 200 songs and other songs over time",
    query: (startValue, endValue) =>
      `WITH billboard AS (SELECT s.release_date, AVG(f.speechiness) as AvgBillboardSpeechiness FROM song_features f JOIN song s on s.Song_ID = f.song_ID JOIN Top200billboard b ON f.Song_ID = b.Song_ID GROUP BY s.release_date ORDER BY s.release_date DESC),
        nonBillboard AS ( SELECT s.release_date, AVG(f.speechiness) AS AvgNonBillboardSpeechiness FROM song_features f JOIN song s on s.Song_ID = f.song_ID WHERE f.song_id NOT IN (SELECT Song_ID from Top200billboard) GROUP BY s.release_date ORDER BY s.release_date DESC)
        SELECT b.*, n.AvgNonBillboardSpeechiness FROM billboard b JOIN nonBillboard n ON b.release_date = n.release_date
        WHERE TO_NUMBER(SUBSTR(b.release_date, 0, LENGTH(b.release_date) - 6)) < ${
          endValue || 2021
        } AND TO_NUMBER(SUBSTR(b.release_date, 0, LENGTH(b.release_date) - 6)) > ${
        startValue || 1964
      }`,
    func: (data) => {
      let rows1 =
        data?.val
          ?.map((row) => ({
            primary: row.RELEASE_DATE.substring(0, 7),
            secondary: row.AVGBILLBOARDSPEECHINESS,
          }))
          .reverse() || [];
      let rows2 =
        data?.val
          ?.map((row) => ({
            primary: row.RELEASE_DATE.substring(0, 7),
            secondary: row.AVGNONBILLBOARDSPEECHINESS,
          }))
          .reverse() || [];
      console.log(rows1);
      console.log(rows2);
      return [
        {
          label: "Top 200 Songs",
          data: rows1,
        },
        {
          label: "Other Songs",
          data: rows2,
        },
      ];
    },
    axes_: [
      {
        primary: true,
        type: "ordinal",
        position: "bottom",
        maxLabelRotation: 90,
      },
      { type: "linear", position: "left" },
    ],
    series_: { type: "line" },
    options_: {
      scales: {
        xAxes: [
          {
            ticks: {
              autoSkip: false,
              maxRotation: 90,
              minRotation: 90,
            },
          },
        ],
      },
    },
  },
];
