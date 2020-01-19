import React from 'react';
import MiniFrames from './MiniFrames';

const FrameSelector = props => {

  const onFrameChange = num => {props.changeFrame(num)}

  return(
    <div className='FrameSelector'>
      <MiniFrames frameNum={props.frameNum} changeFrame={i => props.changeFrame(i)} frames={props.frames}/>
      <button disabled={props.isFirstFrame ? true : false} onClick={() => onFrameChange('prev')}>prev frame</button>
      <button disabled={props.isLastFrame ? true : false} onClick={() => onFrameChange('next')}>next frame</button>
    </div>
  )
}

export default FrameSelector