import React from 'react'

class Canvas extends React.Component {

  state={
    customBrushO: null
  }

  componentDidMount() {
    this.renderFrame()
  }

  componentDidUpdate() {
    // console.log('did update')
    this.renderFrame()
  }

  renderFrame = () => {
    const {frame, overlay} = this.props;
    const pixelsTall = frame.length; const pixelsAcross = frame[0].length
    const canvas = this.refs.canvas; 
    const ctx = canvas.getContext("2d"); 
    const width = canvas.width; 
    const blockSize = width/frame[0].length;

    if (!!overlay[0]) {
      if (overlay[1]==='frame') {
        for(let y = 0; y < pixelsTall; y++){
          for(let x = 0; x < pixelsAcross; x++){
            ctx.lineWidth = '6'; ctx.strokeStyle = 'red'
            ctx.fillStyle=overlay[0][y][x];
            ctx.fillRect(x*blockSize, y*blockSize, blockSize, blockSize);
        }}
      }
    }

    ctx.globalAlpha = 1-this.props.opacity 

    for(let y = 0; y < pixelsTall; y++){
      for(let x = 0; x < pixelsAcross; x++){
        ctx.fillStyle=frame[y][x];
        ctx.fillRect(x*blockSize, y*blockSize, blockSize, blockSize);
    }}
    if (this.props.showGrid) {
      ctx.lineWidth = 1;
      for (let x=1; x<(canvas.width/blockSize); x++){ctx.moveTo(x*blockSize, 0); ctx.lineTo(x*blockSize, canvas.height)}
      for (let y=1; y<(canvas.height/blockSize); y++){ctx.moveTo(0, y*blockSize); ctx.lineTo(canvas.width, y*blockSize)}

      ctx.strokeStyle = "#ddd";
      ctx.stroke();
    }

    for(let y = 0; y < pixelsTall; y++){
      for(let x = 0; x < pixelsAcross; x++){
        if (this.state.customBrushO !== null) {
          if (x === this.state.customBrushO[0] && y === this.state.customBrushO[1]) {
            ctx.lineWidth = 8; ctx.strokeStyle= 'white'; 
            ctx.strokeRect(x*blockSize, y*blockSize, blockSize, blockSize);
            ctx.lineWidth = 2; ctx.strokeStyle= 'black'; 
            ctx.strokeRect(x*blockSize, y*blockSize, blockSize, blockSize);
    }}}}
  }

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
    else if (this.props.brushType === 'custom') {
      if (this.state.customBrushO === null) {
        this.setState({customBrushO: [xcrd, ycrd]})
      }
      else {
        this.customPaint(this.state.customBrushO, [xcrd, ycrd])
        this.setState({customBrushO: null})
      }
    }
  }

  customPaint = (coord1, coord2) => {
    let xbase=[coord1[0], coord2[0]].sort(function(a, b) {return a-b}), ybase=[coord1[1], coord2[1]].sort(function(a, b) {return a-b});
    // console.log(this.findPointsBetweenIncl(xbase), this.findPointsBetweenIncl(ybase))
    this.props.editRectanglePixels(this.findPointsBetweenIncl(ybase), this.findPointsBetweenIncl(xbase))
  }

  findPointsBetweenIncl = arr => {
    let output = [];
    for (let i=arr[0]; i<=arr[1]; i++) {
      output.push(i)
    }
    return output
  }

  // squareBrushPaint = (xcrd, ycrd, squares) => {
  //   let pixels = [], xStart = xcrd - squares + 1, yStart = ycrd - squares + 1;
  //   for (let y=yStart; y<=yStart+(2*(squares-1)); y++) {
  //     for (let x=xStart; x<=xStart+(2*(squares-1)); x++) {
  //       if (x >= 0 && y >=0 && x < this.props.frame[0].length && y < this.props.frame.length ) pixels.push([x,y])
  //   }}
  //   this.props.editSquarePixels(pixels)
  // }

  convertLocationToCoords = (xi, yi) => {
    const canvas = this.refs.canvas; const width = canvas.width; 
    const blockSize = width/this.props.frame[0].length;
    let xcoord = Math.ceil(xi/blockSize)-1; let ycoord = Math.ceil(yi/blockSize)-1;
    return [xcoord, ycoord]
  }  

  render() {
    return(
      <div>
        <canvas id='mainCanvas' onClick={e => this.handleClick(e)} ref="canvas" width={800} height={500} />
      </div>
    )
  }
}
export default Canvas