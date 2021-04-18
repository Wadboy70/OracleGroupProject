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
        <li>https://www.kaggle.com/rodolfofigueroa/spotify-12m-songs</li>
        <li>https://www.kaggle.com/dhruvildave/spotify-charts</li>
      </ul>
    </div>
  );
};

export default HomePage;
