import React from 'react'

class Canvas extends React.Component {

  componentDidMount() {
    this.renderFrame()
  }

  componentDidUpdate() {
    this.renderFrame()
  }

  renderFrame = () => {
    const {frame} = this.props;
    const pixelsTall = frame.length; const pixelsAcross = frame[0].length
    const canvas = this.refs.canvas; 
    const ctx = canvas.getContext("2d"); 
    const width = canvas.width; 
    const blockSize = width/frame[0].length;
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, width, width);
    // console.log(blockSize)

    for(let y = 0; y < pixelsTall; y++){
      for(let x = 0; x < pixelsAcross; x++){
        ctx.fillStyle=frame[y][x];
        ctx.fillRect(x*blockSize, y*blockSize, blockSize, blockSize);
    }}
    if (this.props.showGrid) {
      for (let x=1; x<(canvas.width/blockSize); x++){ctx.moveTo(x*blockSize, 0); ctx.lineTo(x*blockSize, canvas.height)}
      for (let y=1; y<(canvas.height/blockSize); y++){ctx.moveTo(0, y*blockSize); ctx.lineTo(canvas.width, y*blockSize)}

      ctx.strokeStyle = "#ddd";
      ctx.stroke();
    }
  }

  drawGrid = () => {}

  handleClick = e => {
    const rect = e.target.getBoundingClientRect();
    let x = e.clientX - rect.left; let y = e.clientY - rect.top;
    let [xcrd, ycrd] = this.convertLocationToCoords(x, y);
    this.selectPixels(xcrd, ycrd)
  }

  selectPixels = (xcrd, ycrd) => {
    if (this.props.brushType.split(' ')[1] === 'square'){
      if (this.props.brushType === '1 square') this.props.editPixel(xcrd, ycrd)
      else this.squareBrushPaint(xcrd, ycrd, 2*this.props.brushType.split(' ')[0] -1)
    }
  }

  squareBrushPaint = (xcrd, ycrd, squares) => {
    let pixels = [], xStart = xcrd - squares + 1, yStart = ycrd - squares + 1;
    for (let y=yStart; y<=yStart+(2*(squares-1)); y++) {
      for (let x=xStart; x<=xStart+(2*(squares-1)); x++) {
        if (x >= 0 && y >=0 && x < this.props.frame[0].length && y < this.props.frame.length ) pixels.push([x,y])
      }
    }
    this.props.editSquarePixels(pixels)
  }

  convertLocationToCoords = (xi, yi) => {
    const canvas = this.refs.canvas; const width = canvas.width; 
    const blockSize = width/this.props.frame[0].length;
    let xcoord = Math.ceil(xi/blockSize)-1; let ycoord = Math.ceil(yi/blockSize)-1;
    return [xcoord, ycoord]
  }  

  render() {
    return(
      <div>
        <canvas onClick={e => this.handleClick(e)} ref="canvas" width={800} height={500} />
      </div>
    )
  }
}
export default Canvas