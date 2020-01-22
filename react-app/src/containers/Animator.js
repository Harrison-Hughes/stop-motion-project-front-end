import React, {useState,  useEffect, useRef} from 'react';
import '../css/Animator.css';
import demoFilms from '../components/DemoFilms.js'
import FrameEditor from './FrameEditor';
import FrameSelector from './FrameSelector';

const Animator = props => {
  const[pixelDimensions] = useState([40, 25])
  const[frameNum, setframeNum] = useState(0);
  const[previewMode, setPreviewMode] = useState(false)
  const[previewRate, setPreviewRate] = useState('1')

  const[frames, setFrames] = useState(props.film[0].frames);
  const[filmTitle, setFilmTitle] = useState(props.film[0].title)
  const[filmDescription, setFilmDescription] = useState(props.film[0].description)

  useInterval(
    () => {
      changeFrame("next");
    },
    previewMode ? 1000 / previewRate : null
  );

  const handleTitleChange = e => {
    setFilmTitle(e.target.value);
  }

  const handleDescChange = e => {
    setFilmDescription(e.target.value);
  }

  const changeFrame = i => {
    if (i === "next")
      setframeNum(frameNum === frames.length - 1 ? 0 : frameNum + 1);
    else if (i === "prev")
      setframeNum(frameNum === 0 ? frames.length - 1 : frameNum - 1);
    else setframeNum(i);
  };

  const deleteFrame = i => {
    if (frames.length > 1) {
      if (i <= frameNum) {
        frameNum !== 0 && setframeNum(frameNum - 1);
      }
      setFrames(frames.filter((f, index) => index !== i));
    }
  };

  const duplicateFrame = i => {
    let newFrames = frames.slice();
    newFrames.splice(i + 1, 0, frames[i]);
    setFrames(newFrames);
    setframeNum(i + 1);
  };

  const togglePreviewMode = () => {
    if (previewMode) {
      setPreviewMode(false);
    } else if (!previewMode) {
      setPreviewMode(true);
    }
  };

  const addBlankFrame = () => {
    const blankArrayGenerator = (xdim, ydim, color) =>
      [...Array(ydim)].map(() => Array(xdim).fill(color));
    setFrames([
      ...frames,
      blankArrayGenerator(pixelDimensions[0], pixelDimensions[1], "#FFF")
    ]);
    setframeNum(frames.length);
  };

  const handleSaveExit = () => {
    handleSave();
    handleExit()
  }

  const handleExit = () => {props.leaveAnimateMode()}

  const handleSave = () =>  {props.handleSave(frames, filmTitle, filmDescription, props.film[0].id)}

  return (
    <div className="AnimatorDiv">
    <button onClick={() => handleSave()}>save</button>
    <button onClick={() => handleSaveExit()}>save and exit</button>
    <button onClick={() => handleExit()}>exit</button><br/>
        <input
          onChange={handleTitleChange}
          type="title"
          name="title"
          placeholder={props.film[0].title}
          value={filmTitle}
        /><br/>
        <textarea
          onChange={handleDescChange}
          name="description"
          placeholder={props.film[0].description}
          value={filmDescription}
        /><br/>
      <FrameEditor
        selectedFrame={frames[frameNum]}
        frameUp={
          frames.length > 1
            ? frameNum === frames.length - 1
              ? frames[0]
              : frames[frameNum + 1]
            : null
        }
        frameDown={
          frames.length > 1
            ? frameNum === 0
              ? frames[frames.length - 1]
              : frames[frameNum - 1]
            : null
        }
        updateFrame={edit =>
          setFrames(
            frames.map((val, index) => (index === frameNum ? edit : val))
          )
        }
      />
      <FrameSelector
        deleteFrame={i => deleteFrame(i)}
        duplicateFrame={i => duplicateFrame(i)}
        previewMode={previewMode}
        togglePreviewMode={() => togglePreviewMode()}
        previewRate={previewRate}
        changePreviewRate={val => setPreviewRate(val)}
        addBlankFrame={() => addBlankFrame()}
        frames={frames}
        frameNum={frameNum}
        changeFrame={i => changeFrame(i)}
      />
    </div>
  );
};

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
};

export default Animator;
