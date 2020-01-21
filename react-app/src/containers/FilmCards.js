import React, {} from 'react';
import '../css/Gallery.css';
import FilmCard from '../components/FilmCard';

const FilmCards = props => {


  const renderFilmCards = () => {
    return props.films.map( (film, i) => {
      return <FilmCard key={i} film={film}/>
    })
  }
  
  return(
    <div className='FilmCards'>  
      {renderFilmCards()}
    </div>
  )
}

export default FilmCards 