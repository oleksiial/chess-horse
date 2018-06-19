import './Canvas.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  field: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  horse: PropTypes.shape({
    i: PropTypes.number.isRequired,
    j: PropTypes.number.isRequired
  }).isRequired
};

class Canvas extends Component {
  constructor (props) {
    super(props);
    this.canvas = React.createRef();
    this.cellSize = 60;
  }

  componentDidMount () {
    this.updateCanvas();
  }

  componentDidUpdate () {
    this.updateCanvas();
  }

  updateCanvas = () => {
    const ctx = this.canvas.current.getContext('2d', { alpha: false });
    ctx.font = "15px Arial";
    ctx.fillStyle = '#eee';
    ctx.fillRect(0,0, this.cellSize * this.props.width, this.cellSize * this.props.height);
    ctx.fillStyle = '#393';

    this.props.field.forEach((sub, i) => {
      sub.forEach((v, j) => {
        ctx.fillText(v,j * this.cellSize, i * this.cellSize + 15);
        // if (v === Infinity) {
        //   ctx.fillRect(
        //     j * this.cellSize,
        //     i * this.cellSize,
        //     this.cellSize,
        //     this.cellSize);
        // }
      });
    });
    this.drawGrid(ctx);
  }

  drawGrid = (ctx) => {
    ctx.strokeStyle='#888';
    ctx.beginPath();
    for (let i = 1; i < this.props.height + 1; i++) {
      ctx.moveTo(0, i*this.cellSize);
      ctx.lineTo(this.props.width*this.cellSize, i*this.cellSize);
    }
    for (let i = 1; i < this.props.width + 1; i++) {
      ctx.moveTo(i*this.cellSize, 0);
      ctx.lineTo(i*this.cellSize, this.props.height*this.cellSize);
    }
    ctx.stroke();
  }


  render() {
    return (
      <div className="field">
        <canvas
          width={this.props.width * this.cellSize}
          height={this.props.height * this.cellSize}
          ref={this.canvas}
        ></canvas>
      </div>
    );
  }
}

Canvas.propTypes = propTypes;

export default Canvas;
