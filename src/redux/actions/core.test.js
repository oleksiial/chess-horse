import { getDirections } from './core';

it ('getDirections test', () => {
	expect(getDirections(1,2)).toEqual([
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