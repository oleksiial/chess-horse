import './App.css';
import React, { Component } from 'react';
import Canvas from '../Canvas/Canvas';
import { connect } from 'react-redux';
import { nextMove, setPosition, run, stop, prevMove, redo, newGame, doNextMove } from '../../redux/actions/core';
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
	})).isRequired,
	undo: PropTypes.number.isRequired,
	isNewGame: PropTypes.bool.isRequired,

	setPosition: PropTypes.func.isRequired,
	nextMove: PropTypes.func.isRequired,
	doNextMove: PropTypes.func.isRequired,
	run: PropTypes.func.isRequired,
	stop: PropTypes.func.isRequired,
	prevMove: PropTypes.func.isRequired,
	redo: PropTypes.func.isRequired,
	newGame: PropTypes.func.isRequired
};

class App extends Component {
	componentDidMount () {
		this.props.setPosition(0, 0);
	}

	onClickNextMove = () => {
		const {width, height, journal, undo} = this.props;
		const {field, knight} = journal[journal.length - undo - 1];
		this.props.nextMove(width, height, field, knight);
	}

	render() {
		return (
			<div className="app">
				<header>
					<span>Some fancy header</span>
					<button onClick={this.props.newGame}>new game</button>
					<button onClick={this.onClickNextMove}>next move</button>
					<button onClick={this.props.prevMove}>prev move</button>
					<button onClick={this.props.redo}>redo</button>
					<button onClick={this.props.run}>run</button>
					<button onClick={this.props.stop}>stop</button>
				</header>
				<Canvas
					width={this.props.width}
					height={this.props.height}
					journal={
						this.props.journal.slice(0, this.props.journal.length - this.props.undo)
					}
					isNewGame={this.props.isNewGame}
					newGame={this.props.newGame}
					setPosition={this.props.setPosition}
					nextMove={this.props.doNextMove}
				/>
			</div>
		);
	}
}

App.propTypes = propTypes;

const mapStateToProps = (state) => {
	return {
		width: state.core.width,
		height: state.core.height,
		journal: state.core.journal,
		undo: state.core.undo,
		isNewGame: state.core.isNewGame
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		nextMove: (width, height, field, knight) => dispatch(nextMove(width, height, field, knight)),
		doNextMove: (i, j) => dispatch(doNextMove(i, j)),
		prevMove: () => dispatch(prevMove()),
		setPosition: (i, j) => dispatch(setPosition(i, j)),
		run: () => dispatch(run()),
		stop: () => dispatch(stop()),
		redo: () => dispatch(redo()),
		newGame: () => dispatch(newGame())
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
