import React, {useState, useEffect} from 'react';

const Palette = props => {

  const[colourScheme, setColorScheme] = useState('basic')
  const[customScheme, setCustomScheme] = useState([])

  const invertColor = (hex, bw) => {
    // https://stackoverflow.com/questions/35969656/how-can-i-generate-the-opposite-color-according-to-current-color/54569758
    if (hex.indexOf('#') === 0) {hex = hex.slice(1)}
    if (hex.length === 3) {hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];}
    if (hex.length !== 6) {throw new Error('Invalid HEX color.');}
    let r = parseInt(hex.slice(0, 2), 16), g = parseInt(hex.slice(2, 4), 16), b = parseInt(hex.slice(4, 6), 16);
    if (bw) {return (r * 0.299 + g * 0.587 + b * 0.114) > 150 ? 'black' : 'white'}
  }

  const makeColorSwatches = () => {
    if (colourSchemes !== 'custom') {
    return colourSchemes[colourScheme].map((str, idx) => {
      const cb = () => { props.changeSelectedColor(str)};
      let style
      if (props.selectedColor===str) style = {backgroundColor: str, border: `2px solid ${invertColor(str, true)}`}
      else style = {backgroundColor: str}
      return <div key={idx} onClick={cb} className="color-swatch" style={style}/>
    })}
    else {
      
    }
  }

  const colourSchemes = {
    basic: ["#F00", "#F80", "#FF0", "#0F0", "#00F", "#508", "#90D", "#FFF", "#000"],
    fall: ["#7F4145", '#BD3D3A', '#3F69AA', '#D5AE41', '#766F57', '#E47A2E', '#BE9EC9', '#F1EA7F', '#006E6D'],
    spring: ['#ECDB54','#E94B3C','#6F9FD8','#944743','#DBB1CD','#EC9787','#00A591','#6B5B95', '#EADEDB'],
    neon: ['#FFACFC', '#F148FB','#7122FA','#560A86', '#00FECA','#13ca91', '#ff9472','#FDF200','#ce0000'],
    custom: customScheme
  }

  return(
    <div>
      Colour palette:
      <label>
        <input type="radio" value="basic" checked={colourScheme==='basic'} onChange={e => setColorScheme(e.target.value)}/>
        Basic
      </label>
      <label>
        <input type="radio" value="fall" checked={colourScheme==='fall'} onChange={e => setColorScheme(e.target.value)}/>
        Fall
      </label>
      <label>
        <input type="radio" value="spring" checked={colourScheme==='spring'} onChange={e => setColorScheme(e.target.value)}/>
        Spring
      </label>
      <label>
        <input type="radio" value="neon" checked={colourScheme==='neon'} onChange={e => setColorScheme(e.target.value)}/>
        Neon
      </label>
      {/* <label>
        <input type="radio" value="custom" checked={colourScheme==='custom'} onChange={e => setColorScheme(e.target.value)}/>
        Custom
      </label> */}
      <div id="colorSelector">
      {makeColorSwatches()}
      </div>
    </div>
  )
}

export default Palette