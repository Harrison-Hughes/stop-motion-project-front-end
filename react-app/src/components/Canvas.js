import React, { useState } from 'react'
import learnSymbol from './BaseFrame'
import CanvasCell from './CanvasCell'
import Palette from '../containers/Palette'

const Canvas = () => {
  const demoFrame = learnSymbol;

  const[frame] = useState(demoFrame)
  const[selectedColor, setSelectedColor] = useState("FFF")

  const genMatrix = () => (
    frame.map((rowVals, idx) => <div key={idx} className="row">{genRow(rowVals)}</div>)
  )

  const genRow = (vals) => (
    vals.map((val, idx) => <CanvasCell key={idx} color={val} selectedColor={selectedColor} />)
  )

  return(
    <div id='matrix'>
      {genMatrix()}
      <Palette changeSelectedColor={color => setSelectedColor(color)}/>
    </div>
  )
}

export default Canvas