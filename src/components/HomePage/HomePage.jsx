import React from "react";
import "./HomePage.scss";

const HomePage = () => {
  return (
    <div className="homePage">
      <h2>Application Purpose</h2>
      <p>blahblah</p>
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
