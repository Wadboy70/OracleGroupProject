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
    desc:
      "Aspiring artists and music hobbyists can observe that there is an increasing trend in explicit songs. It is noteably more acceptable and common for cursing to be present in songs.",
  },
  {
    title: "#2 Average artist career timespan overtime",
    query: (startValue, endValue) =>
      `WITH careerLength AS ( SELECT  artist_id,  MIN(s.song_year) AS startYear,  MAX(s.song_year) AS endYear,  MAX(s.song_year) - MIN(s.song_year) + 1 AS careerLength FROM relationship_song_artist r JOIN song s ON r.song_id = s.song_id GROUP BY r.artist_id)SELECT startYear, AVG(careerLength)FROM careerLength WHERE startYear > ${
        startValue || 1964
      } AND startYear < ${
        endValue || 2021
      } GROUP BY startYear ORDER BY startYear DESC`,
    func: (data) => {
      let rows =
        data?.val
          ?.map((row) => ({
            primary: row.STARTYEAR,
            secondary: row["AVG(CAREERLENGTH)"],
          }))
          .reverse() || [];
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
    desc:
      "There is a clear decrease in artist career span over time. Meaning, on average, new artists are only active for a year or so.",
  },
  {
    title:
      "#3 How has the average number of tracks per album changed over time",
    query: (startValue, endValue) =>
      `WITH dates AS ( SELECT r.album_id,r.track_number,SUBSTR(s.release_date, 0, LENGTH(s.release_date) - 3) AS trimmedDate FROM relationship_song_album r JOIN song s ON s.song_id = r.song_id  ), albumStats AS ( SELECT album_id,MAX(track_number) AS NumTracks,MAX(trimmedDate) AS AlbumDate FROM dates GROUP BY album_id  )  SELECT AlbumDate, AVG(NumTracks)  FROM albumStats  WHERE SUBSTR(AlbumDate, 0, LENGTH(AlbumDate) - 3)> ${
        startValue || 1925
      } AND SUBSTR(AlbumDate, 0, LENGTH(AlbumDate) - 3) < ${
        endValue || 2021
      }  GROUP BY AlbumDate  ORDER BY AlbumDate desc`,
    func: (data) => {
      let rows =
        data?.val
          ?.map((row) => ({
            primary: row.ALBUMDATE.substring(0, 4),
            secondary: row["AVG(NUMTRACKS)"],
          }))
          .reverse() || [];
      console.log(data);

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
    desc:
      "The number of songs in an alabum has smoothly flucutated over time. In the past few decades, it has been slowly decreasing, stabilizing to about 5 songs per album.",
  },
  {
    title: "#4 Correlation between loudness/energy changed over time",
    query: (startValue, endValue) =>
    `SELECT s.song_year AS Year,CORR(f.loudness, f.energy) AS LoudnessEnergyCorrelation FROM song_features f JOIN song s on s.Song_ID = f.Song_ID  WHERE s.song_year > ${
        startValue || 1900
      } AND s.song_year < ${
        endValue || 2021
      }  GROUP BY s.song_year
  ORDER BY s.song_year DESC`,
    func: (data) => {
        let rows3 =
        data?.val
            ?.map((row) => ({
            primary: row.YEAR,
            secondary: row.LOUDNESSENERGYCORRELATION,
            }))
            .reverse() || [];
      console.log(data);
      return [
        {
          label: "yuh",
          data: rows3,
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
              maxRotation: 0,
              minRotation: 0,
            },
          },
        ],
      },
    },
    desc:
      "Aspiring artists and music hobbyists can observe that there is an increasing trend in explicit songs. It is noteably more acceptable and common for cursing to be present in songs.",
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
        startValue || 1900
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
    desc:
      "Interestingly, top 200 songs have consistently been louder than other songs. Aspiring artists should consider increasing the volume level of their songs to have successful tracks.",
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
        startValue || 1900
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
    desc:
      "In the past decade, there's been a sizeable increase in wordiness of songs. All songs, ESPECIALLY the top 200, have become much more focused on words.",
  },
  
];
