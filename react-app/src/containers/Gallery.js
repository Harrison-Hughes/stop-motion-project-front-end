import React, {useState, useEffect} from 'react';
import '../css/Gallery.css';
import demoFilms from '../components/DemoFilms.js'
import FilmCards from './FilmCards';
import Cinema from '../components/Cinema';
import NewFilmForm from '../components/NewFilmForm'

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

  const filmSubmitted = () => {
    setShowNewFilmForm(false)
    props.loadMovies()
  }

  useEffect(() => props.loadMovies(),[browseMode])
  
  return(
    <div className='GalleryDiv'>
      <br/>
      {browseMode && <h1>YOUR FILMS</h1>}
      {browseMode && !showNewFilmForm && <button onClick={() => props.loadMovies()}>manual reload</button>}
      {browseMode && <div>
        <button
          onClick={() => setShowNewFilmForm(!showNewFilmForm)}
          className="big-button"
        >
          {showNewFilmForm ? 'CANCEL NEW FILM' : 'NEW FILM'}
        </button> <br/>
        {showNewFilmForm ? <NewFilmForm filmSubmitted={() => filmSubmitted()} onSuccess={props.addFilm} /> : null}
      </div>}

      {/* {browseMode && <div><button className='big-button'>NEW FILM</button></div>}<br/> */}
      {!showNewFilmForm && browseMode && <FilmCards enterAnimateMode={id => props.enterAnimateMode(id)} show={browseMode} playFilm={id => playFilm(id)} films={films}/>}
      {!browseMode && <Cinema endFilm={() => endFilm()} film={selectedFilm}/>}
    </div>
  );
};

export default Gallery;
