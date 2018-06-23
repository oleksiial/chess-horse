export const NEXT_MOVE = 'NEXT_MOVE';
export const PREV_MOVE = 'PREV_MOVE';
export const RUN = 'RUN';
export const STOP = 'STOP';

export function run() {
  return (dispatch, getState) => {
    dispatch({type: RUN});
    setInterval(() => {
      const {width, height, field, horse} = getState().core;
      if (possibleNextMove(width, height, field, horse)) {
        dispatch(nextMove(width, height, field, horse));
      } else {
        dispatch(stop());
      }
    }, 100);
  }
}

export function nextMove(width, height, field, horse) {
  const directions = getDirections(horse.i, horse.j);
  let min = {i: -1, j: -1, v: Infinity};
  for (const d of directions) {
    if (d[0] >= 0 && d[0] < height && d[1] >= 0 && d[1] < width) {
      if (min.v > field[d[0]][d[1]]) {
        min = {i: d[0], j: d[1], v: field[d[0]][d[1]]};
      }
    }
  }
  return {type: NEXT_MOVE, payload: {i: min.i, j: min.j}};
}

export function prevMove() {
  return {type: PREV_MOVE};
}

export function setPosition (i, j) {
  return {type: NEXT_MOVE, payload: {i, j}};
}

export function stop () {
  for (let i = 0; i < 9999; ++i) {
    clearInterval(i);
  }
  return {type: STOP};
}

export function getDirections (i, j) {
  return [
    [i + 1, j + 2],
    [i + 1, j - 2],
    [i - 1, j + 2],
    [i - 1, j - 2],
    [i + 2, j + 1],
    [i + 2, j - 1],
    [i - 2, j + 1],
    [i - 2, j - 1]
  ];
}

function possibleNextMove(width, height, field, horse) {
  const directions = getDirections(horse.i, horse.j);
  let min = Infinity;
  for (const d of directions) {
    if (d[0] >= 0 && d[0] < height && d[1] >= 0 && d[1] < width) {
      if (min > field[d[0]][d[1]]) {
        min = field[d[0]][d[1]];
      }
    }
  }
  return min !== Infinity;
}