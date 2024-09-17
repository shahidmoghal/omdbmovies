import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useParams } from "react-router";

export default function MovieDetails() {
  const params = useParams();
  const [api, setApi] = useState("");
  const pooster =
  api.Poster === "N/A"
      ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWz9tftw9qculFH1gxieWkxL6rbRk_hrXTSg&s"
      : api.Poster;
  const movieId = params.id;
  const URL = `https://www.omdbapi.com/?i=${movieId}&apikey=cabb1d8c`;

  useEffect(() => {
    fetch(URL)
      .then((response) => response.json())
      .then((res) => {
        if(res){
        setApi(res);}
      });
  }, []);
  return (
    <>
      <Header />
      {api.Response === "False" && <h3>{api.Error}</h3>}
      { api.Response != "False" && <div className="movie-details">
    <h2>{api.Title} ({api.Year})</h2>
    <img src={pooster} alt="movie-img" />
    <p><span>Actors:</span> {api.Actors}</p>
    <p><span>Director:</span> {api.Director}</p>
    <p><span>Awards:</span> {api.Awards}</p>
    <p><span>BoxOffice:</span> {api.BoxOffice}</p>
    <p><span>IMDb Rating:</span> {api.imdbRating}</p>
</div>}
    </>
  );
}
