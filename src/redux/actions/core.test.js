import * as actions from './core';


describe ('actions internal functions', () => {
	it ('getDirections test', () => {
		expect(actions.getDirections(1,2)).toEqual([
			[2, 4],
			[2, 0],
			[0, 4],
			[0, 0],
			[3, 3],
			[3, 1],
			[-1, 3],
			[-1, 1]
		]);
	});

	it ('possibleNextMove test', () => {
		expect(actions.possibleNextMove(8, 8, [
			[9,3,4,4,4,4,3,2],
			[3,4,5,6,6,6,4,3],
			[4,5,8,8,8,8,6,4],
			[4,6,8,8,8,8,6,4],
			[4,6,8,8,8,8,6,4],
			[4,6,8,8,8,8,6,4],
			[3,4,6,6,6,6,4,3],
			[2,3,4,4,4,4,3,2]
		], { i: 0, j: 0 })).toBeTruthy();

		expect(actions.possibleNextMove(8, 8, [
			[9,9,1,9,9,9,9,9],
			[1,9,9,9,9,9,9,9],
			[9,9,9,9,9,9,9,9],
			[9,9,9,9,9,9,9,9],
			[9,9,9,9,9,9,9,9],
			[9,9,9,9,9,9,9,9],
			[9,9,9,9,9,9,9,9],
			[9,9,9,9,9,9,9,9],
		], { i: 0, j: 0 })).toBeFalsy();
	});
});


describe ('action creators', () => {
	it ('new game', () => {
		const expected = { type: actions.NEW_GAME };
		expect(actions.newGame()).toEqual(expected);
	});

	it ('set position', () => {
		const expected = { type: actions.SET_POSITION, payload: { i: 4, j: 3 } };
		expect(actions.setPosition(4, 3)).toEqual(expected);
	});

	it ('do next move', () => {
		const expected = { type: actions.NEXT_MOVE, payload: { i: 4, j: 3 } };
		expect(actions.doNextMove(4, 3)).toEqual(expected);
	});

	it ('next move', () => {
		const expected = { type: actions.NEXT_MOVE, payload: { i: 0, j: 2 } };
		expect(actions.nextMove(8, 8, [
			[9,9,1,9,9,9,9,9],
			[1,9,9,9,9,9,9,9],
			[9,9,9,9,9,9,9,9],
			[9,9,9,9,9,9,9,9],
			[9,9,9,9,9,9,9,9],
			[9,9,9,9,9,9,9,9],
			[9,9,9,9,9,9,9,9],
			[9,9,9,9,9,9,9,9],
		], { i: 1, j: 4 })).toEqual(expected);
	});

	it ('next move not possible', () => {
		const expected = { type: null };
		expect(actions.nextMove(8, 8, [
			[9,9,9,9,9,9,9,9],
			[1,9,9,9,9,9,9,9],
			[9,9,9,9,9,9,9,9],
			[9,9,9,9,9,9,9,9],
			[9,9,9,9,9,9,9,9],
			[9,9,9,9,9,9,9,9],
			[9,9,9,9,9,9,9,9],
			[9,9,9,9,9,9,9,9],
		], { i: 1, j: 4 })).toEqual(expected);
	});

	it ('prev move', () => {
		const expected = { type: actions.PREV_MOVE };
		expect(actions.prevMove()).toEqual(expected);
	});

	it ('redo', () => {
		const expected = { type: actions.REDO };
		expect(actions.redo()).toEqual(expected);
	});

	it ('stop', () => {
		const expected = { type: actions.STOP };
		expect(actions.stop()).toEqual(expected);
	});


});