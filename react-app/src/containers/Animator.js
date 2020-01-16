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
  }

  return(
    <div className='AnimatorDiv'>
       <FrameEditor 
          selectedFrame={frames[frameNum]}
          updateFrame={edit => setFrames(frames.map((val, index) => index === frameNum ? edit : val ))}
        />
       <h3>Frame {frameNum + 1}/{frames.length}</h3>
       <FrameSelector 
          frames={frames} 
          frameNum={frameNum} 
          changeFrame={i => changeFrame(i)}
          isFirstFrame={frameNum === 0 ? true : false} isLastFrame={frameNum === frames.length -1 ? true : false}
        />
    </div>
  )
}

export default Animator