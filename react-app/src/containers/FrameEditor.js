import React, {useState, useEffect} from 'react';
import Canvas from '../components/Canvas';
import '../css/Animator.css'
import Palette from './Palette';

const FrameEditor = props => {
  const[selectedColor, setSelectedColor] = useState("FFF")
  const[frame, setFrame] = useState(props.selectedFrame)

  useEffect(() => setFrame(props.selectedFrame),[props.selectedFrame])

  return(
    <div className='FrameEditor'>
       <Canvas frame={frame} selectedColor={selectedColor} updateFrame={updatedFrame => setFrame(updatedFrame)}/>
       <Palette changeSelectedColor={color => setSelectedColor(color)} selectedColor={selectedColor}/>
       <button onClick={() => props.updateFrame(frame)}>save frame</button>
    </div>
  )
}

export default FrameEditor