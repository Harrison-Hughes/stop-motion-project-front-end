import React, { useState } from "react";
import API from "../adapters/API";

const NewFilmForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: ""
  });

  const handleChange = event => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const blankArrayGenerator = (xdim, ydim, color) =>
    [...Array(ydim)].map(() => Array(xdim).fill(color));

  //   const defaultFrame = JSON.parse(blankArrayGenerator(40, 25, `FFF`));

  const handleSubmit = event => {
    event.preventDefault();
    API.postFilm(formData)
      .then(film => {
        // onSuccess(film);
        API.postFrame(
          film.id,
          JSON.stringify(blankArrayGenerator(40, 25, "#FFF")),
          0
        );
        return film;
      })
      // .then(console.log);
  };

  return (
    <form onChange={handleChange} onSubmit={handleSubmit}>
      <input
        type="title"
        name="title"
        placeholder="Film title"
        value={formData.title}
      />
      <textarea
        name="description"
        placeholder="Film description"
        value={formData.description}
      />
      <input type="submit" value="Create film" />
    </form>
  );
};

export default NewFilmForm;
