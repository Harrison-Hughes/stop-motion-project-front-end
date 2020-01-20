const API_ENDPOINT = "http://localhost:3000";
const LOGIN_URL = `${API_ENDPOINT}/login`;
const SIGNUP_URL = `${API_ENDPOINT}/users`;
const VALIDATE_URL = `${API_ENDPOINT}/validate`;

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

// const postPost = post =>
//   fetch(POSTS_URL, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//       Authorisation: localStorage.token
//     },
//     body: JSON.stringify({ post })
//   }).then(jsonify);

export default {
  login,
  signup,
  validate,
  // postPost,
  hasToken: () => !!localStorage.token,
  clearToken: () => localStorage.removeItem("token")
};
