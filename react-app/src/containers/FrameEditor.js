import React, {useState, useEffect} from 'react';
import Canvas from '../components/Canvas';
import '../css/Animator.css'
import Palette from '../components/Palette';
import Brush from '../components/Brush';

const FrameEditor = props => {
  const[selectedColor, setSelectedColor] = useState("#FFF")
  const[frame, setFrame] = useState(props.selectedFrame)
  const[brushType, setBrushType] = useState("1square")

  useEffect(() => setFrame(props.selectedFrame),[props.selectedFrame])

  const editPixels = arr => {
    // arr.map(p => editPixel(p[0], p[1]))
    setFrame(frame.map((row, rowIndex) => {
      if (rowIndex !== ycrd) return row
      else {return row.map((col, colIndex) => {
        if (colIndex !== xcrd) return col
        else return selectedColor
      })};
    }));
  }

  const editPixel = (xcrd, ycrd) => {
    // console.log([xcrd, ycrd])
    setFrame(frame.map((row, rowIndex) => {
      console.log(frame[0][0])
      if (rowIndex !== ycrd) return row
      else {return row.map((col, colIndex) => {
        if (colIndex !== xcrd) return col
        else return selectedColor
      })};
    }));
  }

  return(
    <div className='FrameEditor'>
       <Canvas 
        brushType={brushType} 
        frame={frame} 
        selectedColor={selectedColor} 
        editPixel={(xcrd, ycd) => editPixel(xcrd, ycd)} 
        editPixels={arr => editPixels(arr)} 
        updateFrame={updatedFrame => setFrame(updatedFrame)}/>

       <Palette 
        changeSelectedColor={color => setSelectedColor(color)} 
        selectedColor={selectedColor}/>

       <Brush 
        brushType={brushType} 
        changeBrushType={type => setBrushType(type)}/>
       <button onClick={() => props.updateFrame(frame)}>save frame</button>
    </div>
  )
}

export default FrameEditor