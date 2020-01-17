import React from 'react'

class MiniFrame extends React.Component {

  componentDidMount() {
    this.renderMiniFrame()
  }

  componentDidUpdate() {
    this.renderMiniFrame()
  }

  renderMiniFrame = () => {
    const {frame, selectedColor} = this.props;
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
  }

  render() {
    return(
      <div>
        <canvas onClick={e => this.handleClick(e)} ref="canvas" width={800} height={500} />
      </div>
    )
  }
}
export default MiniFrame