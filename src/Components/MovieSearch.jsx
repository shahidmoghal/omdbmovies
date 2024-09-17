import React, { useEffect, useRef, useState } from "react";
import MovieCard from "./MovieCard";

export default function MovieSearch() {
  let [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const [apiData, setApiData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [allPages, setAllPages] = useState(0);
  const [dark, setDark] = useState("Light Mode");
  const clr = useRef("");
  let modeBtn = <button onClick={darkFunc}>{dark}</button>;
  const apiKey = "cabb1d8c";
  const URL = `https://www.omdbapi.com/?s=${search}&apikey=${apiKey}&page=${page}`;

  function inputFunc(e) {
    setInput(e.target.value.toLowerCase());
  }

  function btnSearch() {
    if (input !== "") {
      setLoading(true);
      setSearch(input);
      setPage(1);
      clr.current.value = "";
      setInput("");
    } else {
      alert("Please Enter Movie name");
    }
  }

  function btnEnter(e) {
    if (e.key === "Enter") {
      btnSearch();
    }
  }

  function clrbtn() {
    setSearch("");
    setApiData([]);
    setError(null);
    clr.current.value = "";
  }

  function prevFunc() {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  function nextFunc() {
    if (page < Math.ceil(allPages / 10)) {
      setPage(page + 1);
    }
  }

  function darkFunc() {
    if (dark === "Light Mode") {
      document.body.style.backgroundColor = "white";
      document.body.style.color = "black";
      setDark("Dark Mode");
    } else {
      document.body.style.backgroundColor = "";
      document.body.style.color = "";
      setDark("Light Mode");
    }
  }

  useEffect(() => {
    if (search) {
      setLoading(true);
      fetch(URL)
        .then((result) => result.json())
        .then((res) => {
          if (res.Response === "True") {
            setApiData(res.Search);
            setAllPages(res.totalResults);
            setError(null);
          } else {
            setApiData([]);
            setError(res.Error);
          }
          setLoading(false);
        })
        .catch((err) => {
          setError("Network Error" + err.message);
          setLoading(false);
        });
    }
  }, [search, page]);

  return (
    <>
      <div className="search">
        <input
          ref={clr}
          type="text"
          placeholder="Enter Movie Name"
          onChange={inputFunc}
          onKeyDown={btnEnter}
        />
        <button onClick={btnSearch} disabled={loading}>
          Search
        </button>
        <button onClick={clrbtn} disabled={loading}>
          Clear
        </button>
        {modeBtn}
      </div>
      <div>
        {loading && <h3 style={{ textAlign: "center" }}>Loading...</h3>}
        {error && <h3 style={{ textAlign: "center" }}>{error}</h3>}

        <div className="all-cards">
          {search === ""
            ? ""
            : apiData.map((movie) => (
                <MovieCard
                  key={movie.imdbID}
                  id={movie.imdbID}
                  Title={movie.Title}
                  Img={movie.Poster}
                  year={movie.Year}
                />
              ))}
        </div>
        {apiData.length > 0 && (
          <div className="pagination">
            <button
              style={page === 1 ? { backgroundColor: "grey" } : {}}
              onClick={prevFunc}
              disabled={page === 1}
            >
              Prev
            </button>
            <span style={{ margin: "8px" }}>
              {page} of {Math.ceil(allPages / 10)}
            </span>
            <button
              style={
                page === Math.ceil(allPages / 10)
                  ? { backgroundColor: "grey" }
                  : {}
              }
              onClick={nextFunc}
              disabled={page === Math.ceil(allPages / 10)}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </>
  );
}
