import React from 'react'

class MiniFrame extends React.Component {

  state={
    mouseOver: false
  }

  componentDidMount() {
    this.renderMiniFrame()
  }

  componentDidUpdate() {
    this.renderMiniFrame()
  }

  renderMiniFrame = () => {
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

    ctx.font = "24px Courier New";
    ctx.fillStyle = "black";
    ctx.fillText(`${this.props.frameNumber+1}`, 0, canvas.height);
    
    if (this.state.mouseOver) {
      this.drawRightBar(ctx, canvas)
      this.drawCross(ctx, canvas)
      this.drawDuplicate(ctx, canvas)
    }
  }

  drawRightBar (ctx, canvas) {
    ctx.fillStyle = "white"; ctx.fillRect(canvas.width-7*canvas.width/50, 0, 7*canvas.width/50, canvas.height);
    ctx.fillStyle = "red"; ctx.fillRect(canvas.width-7*canvas.width/50, 0, 7*canvas.width/50, 7*canvas.width/50)
  }

  drawCross (ctx, canvas) {
    ctx.beginPath(); 
      ctx.moveTo(canvas.width-canvas.width/50, canvas.width/50); ctx.lineTo(canvas.width-5*canvas.width/50, 5*canvas.width/50);
      ctx.moveTo(canvas.width-5*canvas.width/50, canvas.width/50); ctx.lineTo(canvas.width-canvas.width/50, 5*canvas.width/50);
      ctx.moveTo(canvas.width-7*canvas.width/50, 0); ctx.lineTo(canvas.width-7*canvas.width/50, 7*canvas.width/50);
      ctx.moveTo(canvas.width, 7*canvas.width/50); ctx.lineTo(canvas.width-7*canvas.width/50, 7*canvas.width/50);
    ctx.closePath(); ctx.stroke()
  }

  drawDuplicate (ctx, canvas) {
    ctx.beginPath(); 
      ctx.moveTo(canvas.width-7*canvas.width/50, 7*canvas.width/50); ctx.lineTo(canvas.width-7*canvas.width/50, canvas.height);
    ctx.closePath(); ctx.stroke(); ctx.fillStyle = "black"
    ctx.translate( canvas.width-canvas.width/50, canvas.width/6 );
    ctx.rotate( 3 * Math.PI / 2 ); ctx.textAlign = "right";
    ctx.fillText(`clone`, 0,0);
  }

  handleClick = e => {
    const canvas = this.refs.canvas; 
    const rect = e.target.getBoundingClientRect();
    let x = e.clientX - rect.left; let y = e.clientY - rect.top;
    if (x >= canvas.width-7*canvas.width/50 && y <= 7*canvas.width/50) this.props.deleteFrame(this.props.frameNumber) 
    else if (x >= canvas.width-7*canvas.width/50 && y > 7*canvas.width/50) this.props.duplicateFrame(this.props.frameNumber)
    else this.props.changeFrame(this.props.frameNumber)
  }

  handleMouseOver = () => {
    this.setState({mouseOver: true})
    this.renderMiniFrame()
  }

  handleMouseOut = () => {
    this.setState({mouseOver: false})
    this.renderMiniFrame()
  }

  render() {
    return(
      <div id='miniFrame'>
        <canvas 
          onMouseOver={() => this.handleMouseOver()}
          onMouseOut={() => this.handleMouseOut()}
          style={this.props.frameNumber === this.props.selectedFrameNum ? {border: '2px solid white', boxShadow: `6px 6px 5px grey`} : null }
          id='miniCanvas' 
          onClick={e => this.handleClick(e)} 
          ref="canvas" 
          width={160} 
          height={100} />
      </div>
    )
  }
}
export default MiniFrame