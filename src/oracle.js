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
    title: "Query 1: % Explicit Tracks vs. Time (years)",
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
      //console.log(rows);
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
      "If artists are considering explicit words as a part of their brand, but are worried of any kickback, they can see that is noteably more acceptable and common for cursing to be present in songs nowadays.",
  },
  {
    title: "Query 2: Average Artist Career Length vs Time (years)",
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
      "There is a clear decrease in artist career span over time. Meaning, on average, new artists are only active for a year or so. This is likely due to how easy it is to produce and post music nowadays, and how songs are created as an attempt to be 'trendy' and explode in popularity.",
  },
  {
    title: "Query 3: Average # Tracks Per Album vs. Time (years)",
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
      //console.log(data);
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
      "In the past few decades, the number of tracks in an album has slowly decreased, stabilizing to about 5 songs per album today. This could be a great starting point for new artists who are unsure of how many songs to release in their first album.",
  },
  {
    title:
      "Query 5: Average Loudness (Top 200 Songs & Other Songs) vs. Time (years)",
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
      //console.log(rows1);
      //console.log(rows2);
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
      "Interestingly, top 200 songs have consistently been louder than other songs. Artists aiming to create popular songs should consider increasing loudness during music recording and editing.",
  },
  {
    title:
      "Query 6: Average Wordiness (Top 200 songs & Other Songs) vs. Time (years)",
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
      //console.log(rows1);
      //console.log(rows2);
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
      "In the past decade, there's been a sizeable increase in wordiness of songs. All songs, especially the top 200, have become much more focused on words. Artists looking to create popular songs should consider increasing the number of written lyrics.",
  },
];
