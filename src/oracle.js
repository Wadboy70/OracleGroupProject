
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
            query: (startValue, endValue) => `WITH explicit AS (  SELECT  s.SONG_YEAR,  COUNT(f.EXPLICIT) as NumExplicit  FROM SONG_FEATURES f  JOIN SONG s ON f.Song_ID = s.Song_ID  WHERE f.EXPLICIT = 'True'  GROUP BY s.SONG_YEAR ), notExplicit AS (  SELECT  s.SONG_YEAR,  COUNT(f.EXPLICIT) as NumNotExplicit  FROM SONG_FEATURES f  JOIN SONG s on f.Song_ID = s.SONG_ID  WHERE f.EXPLICIT = 'False'  GROUP BY s.SONG_YEAR ) SELECT  e.SONG_YEAR,  e.NumExplicit,  ne.NumNotExplicit,  ROUND(e.NumExplicit/(e.NumExplicit+ne.NumNotExplicit), 6) as PercentExplicit,  ROUND(ne.NumNotExplicit/(e.NumExplicit+ne.NumNotExplicit), 6) as PercentNotExplicit FROM explicit e JOIN notExplicit ne on ne.SONG_YEAR = e.SONG_YEAR where e.SONG_YEAR < ${endValue || 2021} and e.SONG_YEAR > ${startValue || 1964} GROUP BY e.SONG_YEAR, e.NumExplicit, ne.NumNotExplicit ORDER BY e.SONG_YEAR DESC`,
            func: data => {
                let rows = data?.val?.map(row => ({primary: row.SONG_YEAR, secondary: row.PERCENTEXPLICIT})).reverse() || [];
                console.log(rows)
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

        }
    ];