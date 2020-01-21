<<<<<<< HEAD
import React, {useState} from 'react';
import '../css/Gallery.css';
import demoFilms from '../components/DemoFilms.js'
import FilmCards from './FilmCards';
import Cinema from '../components/Cinema';

const Gallery = () => {
  
  const[selectedFilm, setSelectedFilm] = useState(null)
  const[browseMode, setBrowseMode] = useState(true)
  const films = demoFilms

  const playFilm = id => {
    let film = films.find(f => f.id === id)
    setSelectedFilm(film)
    setBrowseMode(false)
  }

  const endFilm = () => {
    setBrowseMode(true)
  }
  
  return(
    <div className='GalleryDiv'>
    <br/>
      <h1>YOUR MOVIES</h1>
      {browseMode && <div><button className='big-button'>NEW FILM</button></div>}<br/>
      {browseMode && <FilmCards show={browseMode} playFilm={id => playFilm(id)} films={films}/>}
      {!browseMode && <Cinema endFilm={() => endFilm()} film={selectedFilm}/>}
    </div>
  )
}

// function fade(element) {
//   var op = 1;  // initial opacity
//   var timer = setInterval(function () {
//       if (op <= 0.1){
//           clearInterval(timer);
//           element.style.display = 'none';
//       }
//       element.style.opacity = op;
//       element.style.filter = 'alpha(opacity=' + op * 100 + ")";
//       op -= op * 0.1;
//   }, 50);
// }

// function unfade(element) {
//     var op = 0.1;  // initial opacity
//     element.style.display = 'block';
//     var timer = setInterval(function () {
//         if (op >= 1){
//             clearInterval(timer);
//         }
//         element.style.opacity = op;
//         element.style.filter = 'alpha(opacity=' + op * 100 + ")";
//         op += op * 0.1;
//     }, 10);
// }
=======
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
>>>>>>> 47b0cfa762c842e50bed8423d7bb8c778adcf8e7

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
