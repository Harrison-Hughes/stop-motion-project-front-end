import React from 'react'

class Canvas extends React.Component {

  componentDidMount() {
    const {frame, selectedColor} = this.props;
    const pixelsTall = frame.length; const pixelsAcross = frame[0].length;
    const canvas = this.refs.canvas; 
    const ctx = canvas.getContext("2d"); 
    const width = canvas.width; 
    const blockSize = width/frame.length;
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, width, width);

    for(let y = 0; y < pixelsTall; y++){
      for(let x = 0; x < pixelsAcross; x++){
        ctx.fillStyle=frame[y][x];
        ctx.fillRect(x*blockSize, y*blockSize, blockSize, blockSize);
      }
    }
  }

  componentDidUpdate() {
    const {frame, selectedColor} = this.props;
    const pixelsTall = frame.length; const pixelsAcross = frame[0].length
    const canvas = this.refs.canvas; 
    const ctx = canvas.getContext("2d"); 
    const width = canvas.width; 
    const blockSize = width/frame.length;
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
    console.log([xcrd, ycrd])
    this.props.editPixel(xcrd-1, ycrd-1)
  }

  convertLocationToCoords = (xi, yi) => {
    const canvas = this.refs.canvas; const width = canvas.width; 
    const blockSize = width/this.props.frame[0].length;
    let xcoord = Math.ceil(xi/blockSize); let ycoord = Math.ceil(yi/blockSize);
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