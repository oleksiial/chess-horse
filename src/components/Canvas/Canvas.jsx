import './Canvas.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
	width: PropTypes.number.isRequired,
	height: PropTypes.number.isRequired,
	journal: PropTypes.arrayOf(PropTypes.shape({
		field: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
		knight: PropTypes.shape({
			i: PropTypes.number.isRequired,
			j: PropTypes.number.isRequired
		}).isRequired
	})).isRequired
};

class Canvas extends Component {
	constructor (props) {
		super(props);
		this.canvas = React.createRef();
		this.cellSize = 40;
	}

	componentDidMount () {
		this.updateCanvas();
	}

	componentDidUpdate () {
		this.updateCanvas();
	}

	updateCanvas = () => {
		const ctx = this.canvas.current.getContext('2d', { alpha: false });
		ctx.font = '15px Arial';
		ctx.fillStyle = '#eee';
		ctx.fillRect(0,0, this.cellSize * this.props.width, this.cellSize * this.props.height);

		ctx.fillStyle = '#bbb';
		for (const record of this.props.journal) {
			ctx.fillRect(
				record.knight.j * this.cellSize,
				record.knight.i * this.cellSize,
				this.cellSize,
				this.cellSize
			);
		}

		ctx.fillStyle = '#222'; 
		ctx.beginPath();
		ctx.moveTo(
			this.props.journal[0].knight.j * this.cellSize + this.cellSize / 2,
			this.props.journal[0].knight.i * this.cellSize + this.cellSize / 2
		);
		for (const record of this.props.journal) { 
			ctx.lineTo(
				record.knight.j * this.cellSize + this.cellSize / 2,
				record.knight.i * this.cellSize + this.cellSize / 2
			);
		}
		ctx.stroke();

		const { field, knight } = this.props.journal[this.props.journal.length - 1];
		ctx.fillStyle = '#393';
		ctx.fillRect(
			knight.j * this.cellSize,
			knight.i * this.cellSize,
			this.cellSize,
			this.cellSize
		);

		ctx.fillStyle = '#000';
		field.forEach((sub, i) => {
			sub.forEach((v, j) => {
				ctx.fillText(v, j * this.cellSize + this.cellSize / 2 - 4, i * this.cellSize + 15);
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
