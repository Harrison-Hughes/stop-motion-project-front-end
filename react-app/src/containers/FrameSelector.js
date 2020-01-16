import React, {useState} from 'react';

const FrameSelector = props => {

  const onFrameChange = num => {props.changeFrame(num)}

  return(
    <div className='FrameSelector'>
      <button disabled={props.isFirstFrame ? true : false} onClick={() => onFrameChange('prev')}>prev frame</button>
      <button disabled={props.isLastFrame ? true : false} onClick={() => onFrameChange('next')}>next frame</button>
    </div>
  )
}

export default FrameSelector