import React, {useState, useRef, useEffect} from 'react';
import '../css/Gallery.css';

const Cinema = props => {
  const[playing, setPlaying] = useState(false)
  const[playbackRate, setPlaybackRate] = useState(8)
  const[frameNum, setFrameNum] = useState(0)
  const[w] = useState(5*window.innerWidth/6)
  const frames = props.film.frames
  const canvasRef = React.useRef(null)

  useEffect(() => renderFrame())

  useInterval(() => {
    nextFrame();
  }, playing ? 1000/playbackRate : null);

  const nextFrame= () => {
    frameNum === frames.length - 1 ? setFrameNum(0) : setFrameNum(frameNum + 1)
  }

  const togglePlay = () => {
    if (playing) {
      setPlaying(false)
    } 
    else {
      setPlaying(true)
    }
  }

  const renderFrame = () => {
    const frame = frames[frameNum]
    const pixelsTall = frame.length; const pixelsAcross = frame[0].length
    const canvas = canvasRef.current; 
    const ctx = canvas.getContext("2d"); 
    const width = canvas.width; 
    const blockSize = width/frame[0].length;
 

    for(let y = 0; y < pixelsTall; y++){
      for(let x = 0; x < pixelsAcross; x++){
        ctx.fillStyle=frame[y][x];
        ctx.fillRect(x*blockSize, y*blockSize, blockSize, blockSize);
    }}
  }


  return(
    <div className='Cinema'>
      <button className='big-button' onClick={() => togglePlay()}>{playing ? 'pause' : 'play'}</button>
      <button className='big-button' onClick={() => props.endFilm()}>exit</button><br/>
      <canvas id='cinema' ref={canvasRef} width={w} height={5*w/8}/><br/>
      <input 
        id="framerateSlider" 
        type="range" 
        name="framerate" 
        min="1" 
        max="24" 
        value={playbackRate} 
        onChange={e => setPlaybackRate(e.target.value)} 
        step='1'>
      </input>
      {playbackRate}fps
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

export default Cinema 