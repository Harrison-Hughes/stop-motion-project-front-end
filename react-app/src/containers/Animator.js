import React, {useState,  useEffect, useRef} from 'react';
import '../css/Animator.css';
import demoFilm from '../components/BaseFrames.js'
import FrameEditor from './FrameEditor';
import FrameSelector from './FrameSelector';

const Animator = () => {
  const[pixelDimensions] = useState([40, 25])
  const[frames, setFrames] = useState(demoFilm);
  const[frameNum, setframeNum] = useState(0);
  const[previewMode, setPreviewMode] = useState(false)
  const[previewRate, setPreviewRate] = useState('1')

  useInterval(() => {
    changeFrame('next');
  }, previewMode ? 1000/previewRate : null);

  const changeFrame = i => {
    if (i === 'next') setframeNum(frameNum===frames.length-1 ? 0 : frameNum + 1)
    else if (i === 'prev') setframeNum(frameNum === 0 ? frames.length-1 : frameNum - 1);
    else setframeNum(i)
  }

  const deleteFrame = i => {
    if (frames.length > 1) {
      if (i>=frameNum) setframeNum(frameNum-1)
      setFrames(frames.filter((f, index) => index !== i))
    }
  }

  const togglePreviewMode = () => {
    if (previewMode) {setPreviewMode(false)}
    else if (!previewMode) {setPreviewMode(true)}
  }

  const addBlankFrame = () => {
    const blankArrayGenerator = (xdim, ydim, color) => [...Array(ydim)].map(() => Array(xdim).fill(color));
    setFrames([...frames, blankArrayGenerator(pixelDimensions[0], pixelDimensions[1], '#FFF')])
    setframeNum(frames.length)
  }

  return(
    <div className='AnimatorDiv'>
       <FrameEditor 
        selectedFrame={frames[frameNum]}
        frameUp={frames.length > 1 ? (frameNum===frames.length-1 ? frames[0] : frames[frameNum+1]) : null} 
        frameDown={frames.length > 1 ? (frameNum === 0 ? frames[frames.length-1] : frames[frameNum-1]) : null} 
        updateFrame={edit => setFrames(frames.map((val, index) => index === frameNum ? edit : val ))}
        />
       <FrameSelector 
        previewMode={previewMode} togglePreviewMode={() => togglePreviewMode()}
        previewRate={previewRate} changePreviewRate={val => setPreviewRate(val)}
        addBlankFrame={() => addBlankFrame()}
        frames={frames} frameNum={frameNum} 
        changeFrame={i => changeFrame(i)}
        />
    </div>
  )
}

const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default Animator