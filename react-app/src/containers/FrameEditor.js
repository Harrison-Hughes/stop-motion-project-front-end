import React, {useState, useEffect} from 'react';
import Canvas from '../components/Canvas';
import '../css/Animator.css'
import Palette from '../components/Palette';
import Brush from '../components/Brush';

const FrameEditor = props => {
  const[selectedColor, setSelectedColor] = useState("#FFF")
  const[frame, setFrame] = useState(props.selectedFrame)
  const[brushType, setBrushType] = useState("1 square")
  const[showGrid, setShowGrid] = useState(false)
  const[overlayType, setOverlayType] = useState('previous')
  const[opacity, setOpacity] = useState('0')
  const[overlay, setOverlay] = useState([props.frameUp, 'frame'])

  useEffect(() => setFrame(props.selectedFrame),[props.selectedFrame])
  useEffect(() => props.updateFrame(frame),[frame])
  useEffect(() => setOverlay(chooseOverlay(overlayType)),[props.frameUp])

  const editSquarePixels = arr => {
    let ycrds = arr.map(coord => coord[1]); let xcrds = arr.map(coord => coord[0]);
    setFrame(frame.map((row, rowIndex) => {
      if (!ycrds.includes(rowIndex)) return row
      else {return row.map((col, colIndex) => {
        if (!xcrds.includes(colIndex)) return col
        else return selectedColor
      })};
    }));
  }

  // const editAnyPixels = arr => {
  //   let ycrds = arr.map(coord => coord[1]); let xcrds = arr.map(coord => coord[0]);
  //   console.log(xcrds, ycrds)

  //   setFrame(frame.map((row, rowIndex) => {
  //     if (rowIndex !== ycrd) return row
  //     else {return row.map((col, colIndex) => {
  //       if (colIndex !== xcrd) return col
  //       else return selectedColor
  //     })};
  //   }));
  // }

  const toggleOverlay = val => {
    setOverlayType(val);
    setOverlay(chooseOverlay(val))
  }

  const chooseOverlay = val => {
    if (val === 'next') return [props.frameUp, 'frame']
    else if (val === 'previous') return [props.frameDown, 'frame']
  }

  const editPixel = (xcrd, ycrd) => {
    setFrame(frame.map((row, rowIndex) => {
      if (rowIndex !== ycrd) return row
      else {return row.map((col, colIndex) => {
        if (colIndex !== xcrd) return col
        else return selectedColor
      })};
    }));
  }

  const toggleGrid = () => {setShowGrid(showGrid ? false : true)}

  return(
    <div className='FrameEditor'>
      <button onClick={() => toggleGrid()}> turn grid {showGrid ? 'off' : 'on'}</button>
      <label>
        <input type="radio" value="previous" checked={overlayType==='previous'} onChange={e => toggleOverlay(e.target.value)}/>
        Previous frame
      </label>
      <label>
        <input type="radio" value="next" checked={overlayType==='next'} onChange={e => toggleOverlay(e.target.value)}/>
        Next frame
      </label><br/>
      <label>Mix:</label>
      <input id="opacitySlider" type="range" name="framerate" min="0" max="1" value={opacity} onChange={e => setOpacity(e.target.value)} step='0.01'></input>

       <Canvas 
        overlay={overlay}
        opacity={opacity}
        brushType={brushType} 
        frame={frame} 
        selectedColor={selectedColor} 
        editPixel={(xcrd, ycd) => editPixel(xcrd, ycd)} 
        editSquarePixels={arr => editSquarePixels(arr)} 
        updateFrame={updatedFrame => setFrame(updatedFrame)}
        showGrid={showGrid}/>

       <Palette 
        changeSelectedColor={color => setSelectedColor(color)} 
        selectedColor={selectedColor}/>

       <Brush 
        brushType={brushType} 
        changeBrushType={type => setBrushType(type)}/>
    </div>
  )
}

export default FrameEditor