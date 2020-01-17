import React from 'react';

const Palette = props => {

  const invertColor = (hex, bw) => {
    // https://stackoverflow.com/questions/35969656/how-can-i-generate-the-opposite-color-according-to-current-color/54569758
    if (hex.indexOf('#') === 0) {hex = hex.slice(1)}
    if (hex.length === 3) {hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];}
    if (hex.length !== 6) {throw new Error('Invalid HEX color.');}
    let r = parseInt(hex.slice(0, 2), 16), g = parseInt(hex.slice(2, 4), 16), b = parseInt(hex.slice(4, 6), 16);
    if (bw) {return (r * 0.299 + g * 0.587 + b * 0.114) > 150 ? 'black' : 'white'}
  }

  const makeColorSwatches = () => (
    ["#F00", "#F80", "#FF0", "#0F0", "#00F", "#508", "#90D", "#FFF", "#000"].map((str, idx) => {
      const cb = () => { props.changeSelectedColor(str)};
      let style
      if (props.selectedColor===str) style = {backgroundColor: str, border: `2px solid ${invertColor(str, true)}`}
      else style = {backgroundColor: str}
      return <div key={idx} onClick={cb} className="color-swatch" style={style}/>
    })
  )

  return(
    <div id="colorSelector">
      {makeColorSwatches()}
    </div>
  )
}

export default Palette