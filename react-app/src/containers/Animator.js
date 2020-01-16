import React, {setState} from 'react';
import Canvas from '../components/Canvas';
import '../css/Animator.css'

const Animator = props => {
  // const [frames, setFrames] = setState([]);

  const blankArrayGenerator = (xdim, ydim, color) => [...Array(ydim)].map(e => Array(xdim).fill(color));
  let baseFrame = blankArrayGenerator(80, 50, '#FFF')

  return(
    <div className='AnimatorDiv'>
       <Canvas baseFrame={baseFrame}/>
    </div>
  )
}

export default Animator