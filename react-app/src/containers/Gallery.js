import React, {useState} from 'react';
import '../css/Gallery.css';
import demoFilms from '../components/DemoFilms.js'
import FilmCards from './FilmCards';
import Cinema from '../components/Cinema';
import NewFilmForm from '../components/NewFilmForm'

const Gallery = ({ handleFilm }) => {
  
  const[selectedFilm, setSelectedFilm] = useState(null)
  const[browseMode, setBrowseMode] = useState(true)
  const[showNewFilmForm, setShowNewFilmForm] = useState(false);
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
      {browseMode && <div>
        <button
          onClick={() => setShowNewFilmForm(!showNewFilmForm)}
          className="big-button"
        >
          NEW FILM
        </button>
        {showNewFilmForm ? <NewFilmForm onSuccess={handleFilm} /> : null}
      </div>}
      {/* {browseMode && <div><button className='big-button'>NEW FILM</button></div>}<br/> */}
      {browseMode && <FilmCards show={browseMode} playFilm={id => playFilm(id)} films={films}/>}
      {!browseMode && <Cinema endFilm={() => endFilm()} film={selectedFilm}/>}
    </div>
  )
}

export default Gallery;
