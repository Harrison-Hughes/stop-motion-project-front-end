import React from 'react';

const Palette = props => {
  
  const makeColorSwatches = () => (
    ["#F00", "#F80", "#FF0", "#0F0", "#00F", "#508", "#90D", "#FFF", "#000"].map((str, idx) => {
      const cb = () => { props.changeSelectedColor(str)}
      return <div key={idx} onClick={cb} className="color-swatch" style={{backgroundColor: str}}/>
    })
  )

  return(
    <div id="colorSelector">
      {makeColorSwatches()}
    </div>
  )
}

export default Palette