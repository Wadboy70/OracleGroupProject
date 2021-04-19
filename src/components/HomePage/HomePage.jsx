import React from "react";
import "./HomePage.scss";

const HomePage = () => {
  return (
    <div className="homePage">
      <h1 className="title">Spotify Analyzer</h1>
      <h2>Application Purpose</h2>
      <p>{"Welcome to the Spotify Analyzer!"}</p>
      <p>
        {
          "This application is useful for both music producers and aspiring artists alike who want to analyze trends that exist within various song features"
        }
      </p>
      <p>
        {
          "According to the International Confederation of Societies of Authors and Composers, the music industry lost upwards of $9 billion in 2020 as a result of the Covid Pandemic making it one of the hardest hit industries in the world."
        }
      </p>
      <p>
        {
          "Musicians have been especially affected as this revenue loss directly impacts their income and livelihood. Using this application, musicians will be able to examine trends between integral musical characteristics that will assist in song writing and releasing. This will allow individuals to focus on bolstering the attributes of their music that will make them most commercially viable."
        }
      </p>
      <h2>Made by Group 03:</h2>
      <ul>
        <li>Oluwaseyi Oluwaleimu</li>
        <li>Allison Wu</li>
        <li>Mackenzie Hirsh</li>
        <li>Chris Beharry-Yambo</li>
      </ul>
      <h2>Datasets</h2>
      <ul>
        <li>
          <p>{"1. https://www.kaggle.com/rodolfofigueroa/spotify-12m-songs"}</p>
          <p>
            {"Primary dataset with approximately 1.2 million records of spotify songs, " +
              "albums, artists, and a dozen numerical columns for song features like " +
              "'danceability' and 'energy'."}
          </p>
        </li>
        <li>
          <p>{"2. https://www.kaggle.com/dhruvildave/spotify-charts"}</p>
          <p>
            {"Secondary dataset used to see which spotify song ids have been on the top 200 billboard " +
              "charts across 70 countries in the past few decades."}
          </p>
        </li>
      </ul>
    </div>
  );
};

export default HomePage;
