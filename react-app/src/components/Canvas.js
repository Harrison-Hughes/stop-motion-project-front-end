import React, { useState } from 'react'
import CanvasCell from './CanvasCell'

const Canvas = props => {
  const[frame] = useState(props.selectedFrame)

  const genMatrix = () => (
    frame.map((rowVals, idx) => <div key={idx} className="row">{genRow(rowVals)}</div>)
  )

  const genRow = (vals) => (
    vals.map((val, idx) => <CanvasCell key={idx} color={val} selectedColor={props.selectedColor} />)
  )

  return(
    <div id='matrix'>
      {genMatrix()}
    </div>
  )
}

export default Canvas