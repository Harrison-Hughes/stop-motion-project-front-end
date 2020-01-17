import React, {useState} from 'react';

const Brush = props => {
  const[selectedBrush, setSelectedBrush] = useState(props.brushType)

  const makeBrushTypes = () => (
    [["1square", '1'], ["2square", '2'], ["3square", '3']].map((str, idx) => {
      const cb = () => {props.changeBrushType(str[0]);}
      return <div style={props.brushType===str[0] ? {border: '2px solid green'} : null } key={idx} onClick={cb} className="brush-type">{str[1]}</div>
    })
  )

  return(
    <div id="brushSelector">
      {makeBrushTypes()}
    </div>
  )
}

export default Brush