import React, { useState } from "react";
import "../css/Gallery.css";
import demoFilms from "../components/DemoFilms.js";
import FilmCards from "./FilmCards";
import NewFilmForm from "../components/NewFilmForm";

const Gallery = ({ handleFilm }) => {
  const blankNewFilmForm = {};
  const [currMode, setCurrMode] = useState("preview");
  const [showNewFilmForm, setShowNewFilmForm] = useState(false);
  // const

  return (
    <div className="GalleryDiv">
      <br />
      <h1>YOUR MOVIES</h1>
      <div>
        <button
          onClick={() => setShowNewFilmForm(!showNewFilmForm)}
          className="big-button"
        >
          NEW FILM
        </button>
        {showNewFilmForm ? <NewFilmForm onSuccess={handleFilm} /> : null}
      </div>
      <br />

      <FilmCards films={demoFilms} />
    </div>
  );
};

// const useInterval = (callback, delay) => {
//   const savedCallback = useRef();

//   // Remember the latest callback.
//   useEffect(() => {
//     savedCallback.current = callback;
//   }, [callback]);

//   // Set up the interval.
//   useEffect(() => {
//     function tick() {
//       savedCallback.current();
//     }
//     if (delay !== null) {
//       let id = setInterval(tick, delay);
//       return () => clearInterval(id);
//     }
//   }, [delay]);
// }

export default Gallery;
