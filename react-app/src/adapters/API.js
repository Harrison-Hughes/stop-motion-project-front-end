const API_ENDPOINT = "http://localhost:3000";
const LOGIN_URL = `${API_ENDPOINT}/login`;
const SIGNUP_URL = `${API_ENDPOINT}/users`;
const VALIDATE_URL = `${API_ENDPOINT}/validate`;
const FILMS_URL = `${API_ENDPOINT}/films`;
const FRAMES_URL = `${API_ENDPOINT}/frames`;

const jsonify = resp => {
  if (resp.ok) {
    return resp.json();
  } else {
    throw resp.json();
  }
};

const handleUserResponse = user => {
  if (user.token) {
    localStorage.token = user.token;
  }
  return user;
};

const login = user =>
  fetch(LOGIN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({ user })
  })
    .then(jsonify)
    .then(handleUserResponse);

const signup = user =>
  fetch(SIGNUP_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({ user })
  })
    .then(jsonify)
    .then(handleUserResponse);

const validate = () =>
  fetch(VALIDATE_URL, {
    method: "POST",
    headers: {
      Authorisation: localStorage.token
    }
  })
    .then(jsonify)
    .then(handleUserResponse);

const postFilm = film =>
  fetch(FILMS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorisation: localStorage.token
    },
    body: JSON.stringify({ film })
  }).then(jsonify);

const postFrame = (filmId, frameString, o) =>
  fetch(FRAMES_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorisation: localStorage.token
    },
    body: JSON.stringify({
      film_id: filmId,
      frame_string: frameString,
      order: o
    })
  }).then(jsonify);

const fetchFilms = () =>
  fetch(FILMS_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorisation: localStorage.token
    }
  }).then(jsonify);

export default {
  login,
  signup,
  validate,
  postFilm,
  postFrame,
  fetchFilms,
  hasToken: () => !!localStorage.token,
  clearToken: () => localStorage.removeItem("token")
};
