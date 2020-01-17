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

    for(let y = 0; y < pixelsTall; y++){
      for(let x = 0; x < pixelsAcross; x++){
        ctx.fillStyle=frame[y][x];
        ctx.fillRect(x*blockSize, y*blockSize, blockSize, blockSize);
      }
    }
  }

  handleClick = e => {
    const rect = e.target.getBoundingClientRect();
    let x = e.clientX - rect.left; let y = e.clientY - rect.top;
    let [xcrd, ycrd] = this.convertLocationToCoords(x, y);
    this.selectPixels(xcrd, ycrd)
  }

  selectPixels = (xcrd, ycrd) => {
    if (this.props.brushType === '1square') this.props.editPixel(xcrd, ycrd)
    else if (this.props.brushType === '2square') this.squareBrushPaint(xcrd, ycrd, 2)
  }

  squareBrushPaint = (xcrd, ycrd, squares) => {
    let xStart = xcrd - squares + 1, yStart = ycrd - squares + 1;
    // console.log(xcrd,ycrd,squares)
    for (let y=yStart; y<=yStart+squares; y++) {
      for (let x=xStart; x<=xStart+squares; x++) {
        // console.log([x,y]);
        // if (!!this.props.frame[y][x]) console.log([x,y]);
      }
    }
    

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