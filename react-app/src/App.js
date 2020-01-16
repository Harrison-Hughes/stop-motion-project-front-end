import React from 'react';
import './css/App.css';
import Animator from './containers/Animator';
import MenuBar from './containers/MenuBar';
  
const App = () => (

  <div className="App">
    <MenuBar />
    <h1>bit by bit</h1>
    <Animator />
  </div>

)

export default App;
