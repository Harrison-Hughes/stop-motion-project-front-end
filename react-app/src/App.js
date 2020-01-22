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
  const [films, setFilms] = useState([]);

  const [frames, setFrames] = useState([]);
  const [showAnimator, setShowAnimator] = useState(false);

  const logout = () => {
    setUser(null);
    API.clearToken();
  };

  const handleUser = user => {
    setUser(user);
  };

  const formatFilms = clips => {
    console.log(clips);
    let films = clips.map(clip => formatMovie(clip));
    // debugger
    setFilms(films);
    // console.log(films)
  };

  const formatMovie = movie => {
    let frames = movie.frames;
    frames.sort(function(a, b) {
      return a.order - b.order;
    });
    frames = frames.map(frame => frame.frame_string);
    frames = frames.map(frame => JSON.parse(frame));
    movie.frames = frames;
    return movie;
  };

  useEffect(() => {});

  useEffect(() => {
    if (API.hasToken()) {
      API.validate()
        .then(handleUser)
        .then(() => setValidatedUser(true));
      // .catch(errorPromise => {
      //   errorPromise.then(data => setError(data));
      // })
    } else {
      setValidatedUser(false);
    }
  }, []);

  const fetchFilms = () => {
    if (API.hasToken()) {
      API.fetchFilms().then(formatFilms);
      // .catch(errorPromise => {
      //   errorPromise.then(data => setError(data));
      // });
    }
  };

  const addFilm = film => {
    setFilms({ ...films, film });
  };

  const loadMovies = () => {
    fetchFilms();
  };

  const handleDelete = filmId => {
    if (API.hasToken()) {
      API.deleteFilm(filmId).then(loadMovies);
    }
  };

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
                {showAnimator ? (
                  <Animator />
                ) : (
                  <Gallery
                    films={films}
                    loadMovies={() => loadMovies()}
                    addFilm={addFilm}
                    handleDelete={handleDelete}
                  />
                )}
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
