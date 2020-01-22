<<<<<<< HEAD
import React, {useState, useEffect} from 'react';
import '../css/Gallery.css';
import demoFilms from '../components/DemoFilms.js'
import FilmCards from './FilmCards';
import Cinema from '../components/Cinema';
import NewFilmForm from '../components/NewFilmForm'
=======
import React, { useState } from "react";
import "../css/Gallery.css";
import demoFilms from "../components/DemoFilms.js";
import FilmCards from "./FilmCards";
import Cinema from "../components/Cinema";
import NewFilmForm from "../components/NewFilmForm";

>>>>>>> b9defc125ea64b4128ecf3b9f276a6e383a259da

const Gallery = (props) => {
  
  const[selectedFilm, setSelectedFilm] = useState(null)
  const[browseMode, setBrowseMode] = useState(true)
  const[showNewFilmForm, setShowNewFilmForm] = useState(false);
  const films = props.films


  const playFilm = id => {
    let film = films.find(f => f.id === id);
    setSelectedFilm(film);
    setBrowseMode(false);
  };

  const endFilm = () => {

    setBrowseMode(true)
  }

  useEffect(() => props.loadMovies(),[browseMode])
  
  return(
    <div className='GalleryDiv'>
    <br/>
      {browseMode && <h1>YOUR FILMS</h1>}
      {browseMode && <button onClick={() => props.loadMovies()}>load</button>}
      {browseMode && <div>
        <button
          onClick={() => setShowNewFilmForm(!showNewFilmForm)}
          className="big-button"
        >
          {showNewFilmForm ? 'CANCEL NEW FILM' : 'NEW FILM'}
        </button> <br/>
        {showNewFilmForm ? <NewFilmForm onSuccess={props.addFilm} /> : null}
      </div>}

      {/* {browseMode && <div><button className='big-button'>NEW FILM</button></div>}<br/> */}
<<<<<<< HEAD
      {!showNewFilmForm && browseMode && <FilmCards show={browseMode} playFilm={id => playFilm(id)} films={films}/>}
      {!browseMode && <Cinema endFilm={() => endFilm()} film={selectedFilm}/>}
=======
      {browseMode && (
        <FilmCards
          show={browseMode}
          playFilm={id => playFilm(id)}
          films={films}
        />
      )}
      {!browseMode && <Cinema endFilm={() => endFilm()} film={selectedFilm} />}
>>>>>>> b9defc125ea64b4128ecf3b9f276a6e383a259da
    </div>
  );
};

export default Gallery;
