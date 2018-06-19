import './Field.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  field: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired
};

class Canvas extends Component {
  constructor (props) {
    super(props);
    this.canvas = React.createRef();
    this.cellSize = 45;
    this.width = this.props.field[0].length;
    this.height = this.props.field.length;
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
    // ctx.fillStyle = '#eee';
    // ctx.fillRect(0,0, this.cellSize * this.width, this.cellSize * this.height);
    ctx.fillStyle = '#393';

    this.props.field.forEach((sub, i) => {
      sub.forEach((v, j) => {
        // ctx.fillText(v,j * this.cellSize, i * this.cellSize + 15);
        if (v === 9) {
          ctx.fillRect(
            j * this.cellSize,
            i * this.cellSize,
            this.cellSize,
            this.cellSize);
        }
      });
    });

    ctx.strokeStyle='#888';
    ctx.beginPath();
    for (let i = 1; i < this.height + 1; i++) {
      ctx.moveTo(0,i*this.cellSize);
      ctx.lineTo(this.width*this.cellSize,i*this.cellSize);
    }
    for (let i = 1; i < this.width + 1; i++) {
      ctx.moveTo(i*this.cellSize, 0);
      ctx.lineTo(i*this.cellSize, this.height*this.cellSize);
    }
    ctx.stroke();
  }


  render() {
    return (
      <div className="field">
        <canvas
          width={this.props.field.length * this.cellSize}
          height={this.props.field[0].length * this.cellSize}
          ref={this.canvas}
        ></canvas>
      </div>
    );
  }
}

Canvas.propTypes = propTypes;

export default Canvas;
