
import React, {} from 'react';
import '../css/Gallery.css';
import { Switch } from 'react-router-dom';


class MiniFrame extends React.Component {
  state = {
    mouseOver: false
  };

  componentDidMount() {
    this.renderThumb();
  }

  componentDidUpdate() {
    this.renderThumb();
  }

  renderThumb = () => {
    const frame = this.props.film.frames[0];
    const pixelsTall = frame.length;
    const pixelsAcross = frame[0].length;
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const blockSize = width / frame[0].length;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, width, width);

    for (let y = 0; y < pixelsTall; y++) {
      for (let x = 0; x < pixelsAcross; x++) {
        ctx.fillStyle = frame[y][x];
        ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
      }
    }

    if (this.state.mouseOver) {
      this.writePlay(ctx, canvas);
    }
  };

  writePlay = (ctx, canvas) => {
    // ctx.textAlign = "centre";
    ctx.translate(canvas.width / 4, (9 * canvas.height) / 16);
    ctx.fillStyle = "white";
    ctx.font = "36px Courier New";
    ctx.strokeText(`play`, 0, 0);
    ctx.lineWidth = 6;
    ctx.fillText(`play`, 0, 0);
    ctx.fillStyle = "white";
    ctx.font = "36px Courier New";
    ctx.strokeText(`play`, 0, 0);
    ctx.lineWidth = 6;
    ctx.fillText(`play`, 0, 0);
  };

  handleMouseOver = () => {
    this.setState({ mouseOver: true });
    this.renderThumb();
  };

  handleMouseOut = () => {
    this.setState({ mouseOver: false });
    this.renderThumb();
  };

  render() {
    return (
      // <div className="FilmCard">
      <div className="ui card">
        <div className="arrange-horizontally">
          <div className="thumbnail">
            <canvas
              onClick={() => this.props.playFilm(this.props.film.id)}
              onMouseOver={() => this.handleMouseOver()}
              onMouseOut={() => this.handleMouseOut()}
              id="miniCanvas"
              ref="canvas"
              width={160}
              height={100}
            />
          </div>
          <div className="details">
            <h3 as="a">{this.props.film.title}</h3>
            <p>{this.props.film.description}</p>
            <button className="edit-button">edit</button>
            <button
              className="delete-button"
              onClick={() => this.props.handleDelete(this.props.film.id)}
            >
              delete
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default MiniFrame;
