import React, { useState, useEffect } from 'react'
import CanvasCell from './CanvasCell'

const Canvas = props => {
  const [frame] = useState(props.frame)
  // let ydim = frame.length; let xdim = frame[0].length

  const genMatrix = () => (frame.map((rowVals, idx) => <div key={idx} className="row">{genRow(rowVals, idx)}</div>))
  const genRow = (vals, rowNum) => (vals.map((val, idx) => <CanvasCell key={[rowNum, idx]} color={val} selectedColor={props.selectedColor} />))

  return(
    <div id='matrix'>
      {genMatrix()}
      <button onClick={() => console.log(frame)}>log frame</button>
    </div>
  )
}

export default React.memo(Canvas)