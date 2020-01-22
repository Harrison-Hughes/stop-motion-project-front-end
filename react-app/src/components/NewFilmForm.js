import React, { useState } from "react";
import API from "../adapters/API";
import '../css/Gallery.css';


const NewFilmForm = props => {
  const [formData, setFormData] = useState({
    title: "",
    description: ""
  });

  const handleTitleChange = e => {
    setFormData({
      ...formData,
      title: e.target.value
    });
  }

  const handleDescChange = e => {
    setFormData({
      ...formData,
      description: e.target.value
    });
  }

  const blankArrayGenerator = (xdim, ydim, color) => [...Array(ydim)].map(() => Array(xdim).fill(color));

  const handleSubmit = event => {
    event.preventDefault();
    API.postFilm(formData)
      .then(film => {
        API.postFrame(
          film.id,
          JSON.stringify(blankArrayGenerator(40, 25, "#FFF")),
          0
        );
        return film;
      })
    props.filmSubmitted()
  };

  return (
    <div id='parentDiv' >
      <form id='childForm' onSubmit={handleSubmit}>
        <input
          onChange={handleTitleChange}
          type="title"
          name="title"
          placeholder="Film title"
          value={formData.title}
        /><br/>
        <textarea
          onChange={handleDescChange}
          name="description"
          placeholder="Film description"
          value={formData.description}
        /><br/>
        <input className='big-button' type="submit" value="Create film" />
      </form>
    </div>
  );
};

export default NewFilmForm;
