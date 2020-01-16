import React, {useState} from 'react';
import Canvas from '../components/Canvas';
import '../css/Animator.css'
import Palette from './Palette';

const FrameEditor = props => {
  const[selectedColor, setSelectedColor] = useState("FFF")

  return(
    <div className='FrameEditor'>
       <Canvas selectedFrame={props.selectedFrame}/>
       <Palette changeSelectedColor={color => setSelectedColor(color)} selectedColor={selectedColor}/>
    </div>
  )
}

export default FrameEditor