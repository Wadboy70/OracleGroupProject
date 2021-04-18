
export const sendQuery = (val, e) => {
    e?.preventDefault();
    return fetch("/db", {
        method: "POST",
        headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        },
        body: JSON.stringify({query: val}),
    })
    .then((res) => res.json());


}

export const queries = [
        {
            title: "Percentage of Explicit Tracks over the years",
            query: (startValue, endValue) => `WITH explicit AS (  SELECT  s.SONG_YEAR,  COUNT(f.EXPLICIT) as NumExplicit  FROM SONG_FEATURES f  JOIN SONG s ON f.Song_ID = s.Song_ID  WHERE f.EXPLICIT = 'True'  GROUP BY s.SONG_YEAR ), notExplicit AS (  SELECT  s.SONG_YEAR,  COUNT(f.EXPLICIT) as NumNotExplicit  FROM SONG_FEATURES f  JOIN SONG s on f.Song_ID = s.SONG_ID  WHERE f.EXPLICIT = 'False'  GROUP BY s.SONG_YEAR ) SELECT  e.SONG_YEAR,  e.NumExplicit,  ne.NumNotExplicit,  ROUND(e.NumExplicit/(e.NumExplicit+ne.NumNotExplicit), 6) as PercentExplicit,  ROUND(ne.NumNotExplicit/(e.NumExplicit+ne.NumNotExplicit), 6) as PercentNotExplicit FROM explicit e JOIN notExplicit ne on ne.SONG_YEAR = e.SONG_YEAR where e.SONG_YEAR < ${endValue || 2021} and e.SONG_YEAR > ${startValue || 1908} GROUP BY e.SONG_YEAR, e.NumExplicit, ne.NumNotExplicit ORDER BY e.SONG_YEAR DESC`,
            func: data => {
                let rows = data?.val?.map(row => ({primary: row.SONG_YEAR, secondary: row.PERCENTEXPLICIT})).reverse() || [];
                return(
                    [
                        {
                            label: "yuh",
                            data: rows
                        }
                    ]
                )
            },
            axes_: [
                { primary: true, type: 'ordinal', position: 'bottom', maxLabelRotation: 90 },
                { type: 'linear', position: 'left'},
            ],

        },
        {
            title: "AVG Artist career timespan overtime",
            query: (startValue, endValue) => `WITH careerLength AS ( SELECT  artist_id,  MIN(s.song_year) AS startYear,  MAX(s.song_year) AS endYear,  MAX(s.song_year) - MIN(s.song_year) + 1 AS careerLength FROM relationship_song_artist r JOIN song s ON r.song_id = s.song_id GROUP BY r.artist_id)SELECT startYear, AVG(careerLength)FROM careerLength WHERE startYear > ${startValue || 1964} AND startYear < ${endValue || 2021} GROUP BY startYear ORDER BY startYear DESC`,
            func: data => {
                let rows = data?.val?.map(row => ({primary: row.STARTYEAR, secondary: row.["AVG(CAREERLENGTH)"]})).reverse() || [];
                return(
                    [
                        {
                            label: "yuh",
                            data: rows
                        }
                    ]
                )
            },
            axes_: [
                { primary: true, type: 'ordinal', position: 'bottom', maxLabelRotation: 90 },
                { type: 'linear', position: 'left'},
            ],
            series_: {type: "line"}

        },
        {
            title: "How has the average number of tracks per album changed over time",
            query: (startValue, endValue) => `WITH dates AS ( SELECT r.album_id,r.track_number,SUBSTR(s.release_date, 0, LENGTH(s.release_date) - 3) AS trimmedDate FROM relationship_song_album r JOIN song s ON s.song_id = r.song_id  ), albumStats AS ( SELECT album_id,MAX(track_number) AS NumTracks,MAX(trimmedDate) AS AlbumDate FROM dates GROUP BY album_id  )  SELECT AlbumDate, AVG(NumTracks)  FROM albumStats  WHERE SUBSTR(AlbumDate, 0, LENGTH(AlbumDate) - 3)> ${startValue || 1925} AND SUBSTR(AlbumDate, 0, LENGTH(AlbumDate) - 3) < ${endValue || 2021}  GROUP BY AlbumDate  ORDER BY AlbumDate desc`,
            func: data => {
                let rows = data?.val?.map(row => ({primary: row.ALBUMDATE, secondary: row.["AVG(NUMTRACKS)"]})).reverse() || [];
                console.log(data)

                return(
                    [
                        {
                            label: "yuh",
                            data: rows
                        }
                    ]
                )
            },
            axes_: [
                { primary: true, type: 'ordinal', position: 'bottom', maxLabelRotation: 90 },
                { type: 'linear', position: 'left'},
            ],
            series_: {type: "line"}

        }
    ];