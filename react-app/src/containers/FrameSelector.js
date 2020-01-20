import React, {useEffect} from 'react';
import MiniFrames from './MiniFrames';

const FrameSelector = props => {

  const onFrameChange = num => {props.changeFrame(num)}

  return(
    <div className='FrameSelector'>
      <div>
        <button 
          style={{visibility: !props.previewMode ? 'visible' : 'hidden' }}
          onClick={() => onFrameChange('prev')}>{props.isFirstFrame ? '<=' : '<='}
        </button>
        <button 
          style={{visibility: !props.previewMode ? 'visible' : 'hidden' }} 
          onClick={() => onFrameChange('next')}>{props.isLastFrame ? '=>' : '=>'}
        </button>
      </div>
      <div id='preview-div'>
      <button onClick={() => props.togglePreviewMode()}>preview mode: {props.previewMode ? 'on' : 'off'}</button>
      <br/>
      <label>Preview speed:</label>
      <input id="framerateSlider" type="range" name="framerate" min="1" max="36" value={props.previewRate} onChange={e => props.changePreviewRate(e.target.value)} step='1'></input>
      {props.previewRate}fps
      </div>
      <MiniFrames 
        deleteFrame={i => props.deleteFrame(i)}
        duplicateFrame={i => props.duplicateFrame(i)} 
        addBlankFrame={() => props.addBlankFrame()} 
        frameNum={props.frameNum} 
        changeFrame={i => props.changeFrame(i)} 
        frames={props.frames}/>
    </div>
  )
}

export default FrameSelector