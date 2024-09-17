import React from "react";
import { Link } from "react-router-dom";

export default function MovieCard({ Title, Img, year,id }) {
  const poster =
    Img === "N/A"
      ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWz9tftw9qculFH1gxieWkxL6rbRk_hrXTSg&s"
      : Img;
  return (
    <>
    <Link to={`/${id}`}>
      {Title && (
        <div className="movie-card">
          <img src={poster} alt={Title} />
          <h5>{Title} :({id})</h5>
          <h5>{year} </h5>
        </div>
      )}
      </Link>
    </>
  );
}
