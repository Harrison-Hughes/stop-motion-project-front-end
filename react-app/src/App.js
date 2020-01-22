import React, { useState, useEffect } from "react";
import "./css/App.css";
import Animator from "./containers/Animator";
import MenuBar from "./containers/MenuBar";
import Logo from "./images/BIT-BY-BIT.png";
import Signup from "./components/Signup";
import Login from "./components/Login";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch,
  Redirect,
  Link
} from "react-router-dom";
import API from "./adapters/API";
import Gallery from "./containers/Gallery";

const App = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [validatedUser, setValidatedUser] = useState(false);
  const [unformattedFilms, setUnformattedFilms] = useState([]);
  const [films, setFilms] = useState([]);
  const [animateMode, setAnimateMode] = useState(false)
  const [film, setFilm] = useState(null)

  const logout = () => {
    setUser(null);
    API.clearToken();
  };

  const enterAnimateMode = filmID => {
    setFilm(films.filter(film => film.id === filmID))
    
    setAnimateMode(true)
  }

  const leaveAnimateMode = () => {
    setFilm(null)
    setAnimateMode(false)
  }

  const saveFilm = (frames, filmTitle, filmDescription, id) => {
    // let currFilmLength = film[0].frames.length, newFilmLength = frames.length;
    // console.log(film[0].id)
    // // console.log(films)
    // console.log(unformattedFilms)
    // console.log(films)

    // let FILM = films.find(FILM => FILM.id === film[0].id)
    // console.log(FILM)
    // film.frames.forEach(frame => {
    //     API.deleteFrame(frame.id)
    //     console.log(frame)
    
  }












  const handleUser = user => {
    setUser(user);
  };

  const formatFilms = clips => {
    // debugger
    console.log('this is format films',clips)
    setUnformattedFilms(clips)
    let films = clips.map(clip => formatMovie(clip))
    setFilms(films)
  };

  const formatMovie = movie => {
    // console.log(movie)
    let frames = movie.frames
    frames.sort(function(a,b) {return a.order -b.order})
    frames = frames.map(frame => frame.frame_string)
    frames = frames.map(frame => JSON.parse(frame))
    movie.frames = frames
    return movie
  }

  useEffect(() => {})

  useEffect(() => {
    if (API.hasToken()) {
      API.validate()
        .then(handleUser)
        .then(() => setValidatedUser(true))
        .catch(errorPromise => {
          errorPromise.then(data => setError(data));
        });
    } else {
      setValidatedUser(false);
    }
  }, []);

  const fetchFilms = () => {
    if (API.hasToken()) {
      API.fetchFilms()
      .then(films => {console.log('this is after fetch',films); return films})
        .then(films => {formatFilms(films)})
        // .catch(errorPromise => {
        //   errorPromise.then(data => setError(data));
        // });
    }
  };

  const addFilm = film => {
    setFilms({ ...films, film });
  };

  const loadMovies = () => {
    fetchFilms()
  }

  return (
    <div className="App">
      <img src={Logo} />
      {error && <div style={{ color: "red" }}>{JSON.stringify(error)}</div>}
      <Router>
        <Switch>
          <Route exact path="/signup">
            {!user ? (
              <div>
                <Signup onSuccess={handleUser} user={user} />
                Already have an account? Please <Link to="/login">log in </Link>
                instead.
              </div>
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route exact path="/login">
            {!user ? (
              <div>
                <Login onSuccess={handleUser} user={user} />
                Don't have an account? Please <Link to="/signup">sign up </Link>
                instead.
              </div>
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route exact path="/">
            {user ? (
              <div>
                <p>
                  Logged in as {user.username}
                  {" - "}
                  <Link to="" onClick={() => logout()}>
                    logout
                  </Link>
                </p>
                {!animateMode && <Gallery films={films} enterAnimateMode={id => enterAnimateMode(id)} loadMovies={() => loadMovies()} addFilm={addFilm} />}
                {animateMode &&<Animator handleSave={(frames, filmTitle, filmDescription, id) => saveFilm(frames, filmTitle, filmDescription, id)} leaveAnimateMode={saveStatus => leaveAnimateMode(saveStatus)} film={film} />}
              </div>
            ) : (
              <Redirect to="/signup" />
            )}
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
