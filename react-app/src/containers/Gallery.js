import React, {useState} from 'react';
import '../css/Gallery.css';
import demoFilms from '../components/DemoFilms.js'
import FilmCards from './FilmCards';

const Gallery = () => {
  const blankNewFilmForm = {}
  const[currMode, setCurrMode] = useState('preview')
  // const
  
  return(
    <div className='GalleryDiv'>
    <br/>
      <h1>YOUR MOVIES</h1>
      <div><button className='big-button'>NEW FILM</button></div><br/>

      <FilmCards films={demoFilms}/>
    </div>
  )
}



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

export default Gallery