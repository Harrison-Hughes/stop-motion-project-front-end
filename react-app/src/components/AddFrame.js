import React from 'react'

class AddFrame extends React.Component {

  componentDidMount() {
    this.renderAddFrame()
  }

  componentDidUpdate() {
    this.renderAddFrame()
  }

  renderAddFrame = () => {
    const {frame} = this.props;
    const pixelsTall = frame.length; const pixelsAcross = frame[0].length
    const canvas = this.refs.canvas; 
    const ctx = canvas.getContext("2d"); 
    const width = canvas.width; 
    const blockSize = width/frame[0].length;
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, width, width);

    ctx.fillStyle = "white"; ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath(); ctx.moveTo(canvas.width/2, canvas.height/4); ctx.lineTo(canvas.width/2, 3*(canvas.height)/4);
    ctx.moveTo(canvas.height/2, canvas.height/2); ctx.lineTo(canvas.width-canvas.height/2, (canvas.height)/2);
    ctx.closePath(); ctx.stroke();
  }

  handleClick = e => {}

  render() {
    return(
      <div id='miniFrame'>
        <canvas id='miniCanvas' onClick={e => this.handleClick(e)} ref="canvas" width={80} height={50} />
      </div>
    )
  }
}
export default AddFrame