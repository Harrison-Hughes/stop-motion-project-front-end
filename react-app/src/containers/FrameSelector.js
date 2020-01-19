import React from 'react';
import MiniFrames from './MiniFrames';

const FrameSelector = props => {

  const onFrameChange = num => {props.changeFrame(num)}

  return(
    <div className='FrameSelector'>
      <button disabled={props.isFirstFrame ? true : false} onClick={() => onFrameChange('prev')}>prev frame</button>
      <button disabled={props.isLastFrame ? true : false} onClick={() => onFrameChange('next')}>next frame</button>
      <MiniFrames addBlankFrame={() => props.addBlankFrame()} frameNum={props.frameNum} changeFrame={i => props.changeFrame(i)} frames={props.frames}/>
    </div>
  )
}

export default FrameSelector