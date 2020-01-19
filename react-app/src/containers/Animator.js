import React, {useState} from 'react';
import '../css/Animator.css';
import demoFilm from '../components/BaseFrames.js'
import FrameEditor from './FrameEditor';
import FrameSelector from './FrameSelector';

const Animator = () => {
  const[frames, setFrames] = useState(demoFilm);
  const[frameNum, setframeNum] = useState(0);

  const changeFrame = i => {
    if (i === 'next') setframeNum(frameNum + 1)
    else if (i === 'prev') setframeNum(frameNum - 1);
    else setframeNum(i)
  }

  const addBlankFrame = () => {
    const blankArrayGenerator = (xdim, ydim, color) => [...Array(ydim)].map(() => Array(xdim).fill(color));
    setFrames([...frames, blankArrayGenerator(80, 50, '#FFF')])
  }

  return(
    <div className='AnimatorDiv'>
       <FrameEditor 
        selectedFrame={frames[frameNum]}
        updateFrame={edit => setFrames(frames.map((val, index) => index === frameNum ? edit : val ))}
        />
       <FrameSelector 
        addBlankFrame={() => addBlankFrame()}
        frames={frames} 
        frameNum={frameNum} 
        changeFrame={i => changeFrame(i)}
        isFirstFrame={frameNum === 0 ? true : false} isLastFrame={frameNum === frames.length -1 ? true : false}
        />
    </div>
  )
}

export default Animator