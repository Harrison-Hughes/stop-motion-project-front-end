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
  const [formattedFilms, setFormattedFilms] = useState([]);
  const [animateMode, setAnimateMode] = useState(false)
  const [film, setFilm] = useState(null)

  const logout = () => {
    setUser(null);
    API.clearToken();
  };

  const enterAnimateMode = filmID => {
    setFilm(formattedFilms.filter(film => film.id === filmID))
    setAnimateMode(true)
  }

  const leaveAnimateMode = () => {
    setFilm(null)
    setAnimateMode(false)
  }

  const saveFilm = (formattedFrames, filmTitle, filmDescription, id) => {
    // console.log(unformattedFilms, formattedFilms)
    console.table(filmTitle, filmDescription, id, formattedFrames)
    // DELETE ALL FRAMES => POST ALL NEW FRAMES 

    // delete frames
    let filmBeingEdited = unformattedFilms.find(f => f.id === id)
    console.log(filmBeingEdited)
    filmBeingEdited.frames.forEach(frame => {
        debugger
        API.deleteFrame(frame.id)
    })

    formattedFrames.map((frame, index) => {
      API.postFrame(id, JSON.stringify(frame), index)
    })
    // post new frames
  }













  const handleUser = user => {
    setUser(user);
  };

  const formatFilms = clips => {
    setUnformattedFilms(clips)
    let formattedFilms = clips.map(clip => formatMovie(clip))
    setFormattedFilms(formattedFilms)
  };

  const formatMovie = movie => {
    let frames = movie.frames
    frames.sort(function(a,b) {return a.order -b.order})
    let onlyFrames = frames.map(frame => frame.frame_string)
    let frameAsMatrix = onlyFrames.map(frame => JSON.parse(frame))
    let movieClone = JSON.parse(JSON.stringify(movie))
    movieClone.frames = frameAsMatrix
    return movieClone
  }

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
        .then(data => formatFilms(data))
        // .catch(errorPromise => {
        //   errorPromise.then(data => setError(data));
        // });
    }
  };

  const addFilm = f => {
    setFormattedFilms({ ...formattedFilms, f });
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
                {!animateMode && <Gallery films={formattedFilms} enterAnimateMode={id => enterAnimateMode(id)} loadMovies={() => loadMovies()} addFilm={addFilm} />}
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
  // return (
  //   <div className="App">
  //     <Gallery films={films} enterAnimateMode={id => enterAnimateMode(id)} loadMovies={() => loadMovies()} addFilm={addFilm}></Gallery>
  //   </div>
  // );
};

export default App;
