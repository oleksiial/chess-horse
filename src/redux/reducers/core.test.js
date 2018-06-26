import core, { initializeField, updateField, isThisMoveLegal, initialState } from './core';
import * as actions from '../actions/core';

describe ('core reducer functions', () => {
	it ('null action test', () => {
		expect(core(undefined, { type: null })).toEqual(initialState);
	});

	it ('set position test', () => {
		expect(core(initialState, actions.setPosition(0, 0))).toEqual({
			width: 8,
			height: 8,
			isRunning: false,
			journal: [{
				field: [
					[9,3,4,4,4,4,3,2],
					[3,4,5,6,6,6,4,3],
					[4,5,8,8,8,8,6,4],
					[4,6,8,8,8,8,6,4],
					[4,6,8,8,8,8,6,4],
					[4,6,8,8,8,8,6,4],
					[3,4,6,6,6,6,4,3],
					[2,3,4,4,4,4,3,2]
				],
				knight: { i: 0, j: 0 }
			}],
			undo: 0,
			isNewGame: false			
		});
	});
});

describe ('core reducer internal functions', () => {
	it ('initializeField test', () => {
		expect(initializeField(8,8)).toEqual([
			[2,3,4,4,4,4,3,2],
			[3,4,6,6,6,6,4,3],
			[4,6,8,8,8,8,6,4],
			[4,6,8,8,8,8,6,4],
			[4,6,8,8,8,8,6,4],
			[4,6,8,8,8,8,6,4],
			[3,4,6,6,6,6,4,3],
			[2,3,4,4,4,4,3,2]
		]);
	});

	it ('updateField test', () => {
		expect(updateField(8, 8, initializeField(8, 8), { i: 0, j: 0 })).toEqual([
			[9,3,4,4,4,4,3,2],
			[3,4,5,6,6,6,4,3],
			[4,5,8,8,8,8,6,4],
			[4,6,8,8,8,8,6,4],
			[4,6,8,8,8,8,6,4],
			[4,6,8,8,8,8,6,4],
			[3,4,6,6,6,6,4,3],
			[2,3,4,4,4,4,3,2]
		]);
	});

	it ('isThisMoveLegal test', () => {
		expect(isThisMoveLegal(8, 8, { i: 0, j: 0 }, { i: 1, j: 2 })).toBeTruthy();
		expect(isThisMoveLegal(8, 8, { i: 0, j: 0 }, { i: -1, j: -2 })).toBeFalsy();
		expect(isThisMoveLegal(8, 8, { i: 0, j: 0 }, { i: 0, j: 1 })).toBeFalsy();
	});
});