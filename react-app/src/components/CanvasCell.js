import React, { useState } from 'react';

const CanvasCell = props => {
  
  const [color, setColor] = useState(props.color)
  
  const handleClick = () => {setColor(props.selectedColor)}
  
  return(
    <div className="cell"
         style={{backgroundColor: color}}
         onClick={handleClick}
         >
    </div>
  )

}

export default CanvasCell