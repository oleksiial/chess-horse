import {
	SET_POSITION,
	NEXT_MOVE,
	getDirections,
	RUN,
	STOP,
	PREV_MOVE,
	REDO
} from '../actions/core';

const initialWidth = 10;
const initialHeight = 10;

const initialState = {
	width: initialWidth,
	height: initialHeight,
	field: initializeField(initialWidth, initialHeight),
	horse: { i: -1, j: -1 },
	isRunning: false,
	journal: [{
		field: initializeField(initialWidth, initialHeight),
		horse: { i: -1, j: -1 }
	}],
	undo: 0
};

export default function(state = initialState, action) {
	switch (action.type) {
	case SET_POSITION: {
		const horse = { i: action.payload.i, j: action.payload.j };
		const field = updateField(state.width, state.height, state.field, horse);
		return {
			...initialState,
			field: field,
			horse: horse,
			journal: [{ field: field, horse: horse }]
		};
	}
	case RUN:
		return { ...state, isRunning: true };
	case STOP:
		return { ...state, isRunning: false };
	case NEXT_MOVE: {
		const horse = { i: action.payload.i, j: action.payload.j };
		const field = updateField(state.width, state.height, state.field, horse);
		return {
			...state,
			field: field,
			horse: horse,
			journal: [
				...state.journal.slice(0, state.journal.length - state.undo),
				{ field: field, horse: horse }
			],
			undo: 0
		};
	}
	case PREV_MOVE: {
		const prevState = state.journal[state.journal.length - state.undo - 2];
		if (prevState === undefined) {
			return state;
		}
		return {
			...state,
			field: prevState.field,
			horse: prevState.horse,
			undo: state.undo + 1
		};
	}
	case REDO: {
		if (state.undo === 0) {
			return state;
		}
		const { field, horse } = state.journal[state.journal.length - state.undo];
		return {
			...state,
			field: field,
			horse: horse,
			undo: Math.max(0, state.undo - 1)
		};
	}
	default:
		return state;
	}
}

function initializeField(width, height) {
	const field = Array(height)
		.fill(null)
		.map(() => Array(width).fill(null));
	return field.map((sub, i) =>
		sub.map((v, j) => {
			const directions = getDirections(i, j);
			let count = 0;
			for (const d of directions) {
				if (d[0] >= 0 && d[0] < height && d[1] >= 0 && d[1] < width) {
					count++;
				}
			}
			return count;
		})
	);
}

function updateField(width, height, field, horse) {
	const directions = getDirections(horse.i, horse.j);
	return field.map((sub, i) =>
		sub.map((v, j) => {
			if (i === horse.i && j === horse.j) {
				return 9;
			}
			if (v !== 9 && directions.some(v => arraysEqual(v, [i, j]))) {
				return v - 1;
			}
			return v;
		})
	);
}

function arraysEqual(a, b) {
	if (a === b) return true;
	if (a == null || b == null) return false;
	if (a.length !== b.length) return false;

	for (var i = 0; i < a.length; ++i) {
		if (a[i] !== b[i]) return false;
	}
	return true;
}
