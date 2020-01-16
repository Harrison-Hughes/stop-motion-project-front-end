import React, { useState, useEffect } from 'react';

const CanvasCell = props => {
  
  const [color, setColor] = useState(props.color)
  
  useEffect(() => {})
  
  const handleClick = () => {setColor(props.selectedColor)}
  
  return(
    <div className="cell" id={props.id} style={{backgroundColor: color}} onClick={handleClick}></div>
  )

}

export default CanvasCell