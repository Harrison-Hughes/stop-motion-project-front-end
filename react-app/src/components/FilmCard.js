import React, {} from 'react';
import '../css/Gallery.css';

class MiniFrame extends React.Component {

  state={
    mouseOver: false
  }

  componentDidMount() {
    this.renderThumb()
  }

  componentDidUpdate() {
    this.renderThumb()
  }

  renderThumb = () => {
    const frame = this.props.film.frames[0];
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

    // ctx.fillStyle = "white"; ctx.fillRect(canvas.width-7*canvas.width/50, 0, 7*canvas.width/50, 7*canvas.width/50);
    // ctx.font = "24px Courier New"; ctx.textAlign = 'start'; ctx.fillStyle = "black"; ctx.fillText(`${this.props.frameNumber+1}`, 0, canvas.height);
    
    // if (this.state.mouseOver) {
    //   console.log('mouseover')
    // }
  }
  
  render() {
    return(
      <div className="FilmCard"><div className="arrange-horizontally">
        <div className='thumbnail'>
          <canvas 
            id='miniCanvas' 
            ref="canvas" 
            width={160} 
            height={100}  
          />
        </div>
        <div>
          <h3 as='a'>{this.props.film.name}</h3>
          <p>{this.props.film.description}</p>
          <button>edit</button>
          <button>delete</button>
        </div>
      </div></div>
    )
  }
}

export default MiniFrame