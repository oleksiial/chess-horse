import {
	SET_POSITION,
	NEXT_MOVE,
	getDirections,
	RUN,
	STOP,
	PREV_MOVE,
	REDO,
	NEW_GAME
} from '../actions/core';

const initialWidth = 8;
const initialHeight = 8;

const initialState = {
	width: initialWidth,
	height: initialHeight,
	isRunning: false,
	journal: [{
		field: initializeField(initialWidth, initialHeight),
		knight: { i: -10, j: -10 }
	}],
	undo: 0,
	isNewGame: true
};

export default function(state = initialState, action) {
	switch (action.type) {
	case NEW_GAME:
		return initialState;
	case SET_POSITION: {
		const knight = { i: action.payload.i, j: action.payload.j };
		const { field } = state.journal[state.journal.length - state.undo - 1];
		const newField = updateField(state.width, state.height, field.map(s => s.slice()), knight);
		return {
			...initialState,
			journal: [{ field: newField, knight: knight }],
			isNewGame: false
		};
	}
	case RUN:
		return { ...state, isRunning: true };
	case STOP:
		return { ...state, isRunning: false };
	case NEXT_MOVE: {
		const { width, height, journal, undo } = state;
		const { field, knight } = journal[journal.length - undo - 1];
		const newKnight = { i: action.payload.i, j: action.payload.j };
		if (!isThisMoveLegal(width, height, knight, newKnight)) {
			return state;
		}
		
		const newField = updateField(width, height, field.map(s => s.slice()), newKnight);
		return {
			...state,
			journal: [
				...journal.slice(0, journal.length - undo),
				{ field: newField, knight: newKnight }
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
			undo: state.undo + 1
		};
	}
	case REDO: {
		if (state.undo === 0) {
			return state;
		}
		return {
			...state,
			undo: Math.max(0, state.undo - 1)
		};
	}
	default:
		return state;
	}
}

function initializeField(width, height) {
	const field = Array(height).fill(null).map(() => Array(width).fill(null));
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

function isThisMoveLegal(width, height, knight, newKnight) {
	const directions = getDirections(knight.i, knight.j);
	return newKnight.i >= 0 &&
		newKnight.i < height &&
		newKnight.j >= 0 &&
		newKnight.j < width &&
		directions.some(d => d[0] === newKnight.i && d[1] === newKnight.j);
}

function updateField(width, height, field, knight) {
	const directions = getDirections(knight.i, knight.j);
	field[knight.i][knight.j] = 9;
	for (const d of directions) {
		if (d[0] >= 0 && d[0] < height && d[1] >= 0 && d[1] < width && field[d[0]][d[1]] !== 9) {
			field[d[0]][d[1]] -= 1;
		}
	}
	return field;
}
