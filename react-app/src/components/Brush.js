import React from 'react';

const Brush = props => {
  // const[selectedBrush, setSelectedBrush] = useState(props.brushType)

  const squareBrushGenerator = max => {
    let arr = [];
    for (let i=0; i<max; i++){arr.push([`${i+1} square`, `${i+1}`])}
    return arr
  }

  const makeBrushTypes = () => {
    let brushes = squareBrushGenerator(7);
    return brushes.map((str, idx) => {
      const cb = () => {props.changeBrushType(str[0]);}
      return <div style={props.brushType===str[0] ? {border: '2px solid green'} : null } key={idx} onClick={cb} className="brush-type">{str[1]}</div>
    })
  }

  return(
    <div id="brushSelector">
      {makeBrushTypes()}
    </div>
  )
}

export default Brush