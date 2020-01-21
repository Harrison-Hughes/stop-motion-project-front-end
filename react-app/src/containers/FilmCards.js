import React, {} from 'react';
import '../css/Gallery.css';
import FilmCard from '../components/FilmCard';
// import { confirmAlert } from 'react-confirm-alert';

const FilmCards = props => {

  const renderFilmCards = () => {
    return props.films.map( (film) => {
      return <FilmCard playFilm={id => props.playFilm(id)} key={film.id} film={film}/>
    })
  }
  
  return(
    <div style={{visibility: props.show ? 'visible' : 'hidden' }} className='FilmCards'>  
      {renderFilmCards()}
    </div>
  )
}

export default FilmCards 