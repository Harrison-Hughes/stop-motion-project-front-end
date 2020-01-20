import React from 'react';
import MiniFrame from '../components/MiniFrame';
import AddFrame from '../components/AddFrame';

const MiniFrames = props => {

  const renderMiniFrames = () => {
    return props.frames.map((frame, i) => {
      return <MiniFrame 
              deleteFrame={i => props.deleteFrame(i)} 
              duplicateFrame={i => props.duplicateFrame(i)}
              selectedFrameNum={props.frameNum} 
              changeFrame={i => props.changeFrame(i)} 
              key={`frame${i}`} 
              frameNumber={i} 
              frame={frame}/>
    })
  }

  return(
    <div id='miniFrames'>
      {renderMiniFrames()}
      <AddFrame addBlankFrame={() => props.addBlankFrame()} key={`add frame`} frame={props.frames[0]}/>
    </div>
  )
}

export default MiniFrames