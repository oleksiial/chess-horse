export const SET_POSITION = 'SET_POSITION';
export const NEXT_MOVE = 'NEXT_MOVE';
export const PREV_MOVE = 'PREV_MOVE';
export const REDO = 'REDO';
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
    }, 150);
  }
}

export function nextMove(width, height, field, horse) {
  if (!possibleNextMove(width, height, field, horse)) {
    return { type: null };
  }
  const directions = getDirections(horse.i, horse.j).map(d => {
    return {
      i: d[0],
      j: d[1],
      v: (d[0] >= 0 && d[0] < height && d[1] >= 0 && d[1] < width)
          ? field[d[0]][d[1]]
          : 9
    };
  }).sort((lhs, rhs) => lhs.v > rhs.v);
  const mins = directions.filter(v => v.v === directions[0].v);
  const min = mins[Math.floor(Math.random() * mins.length)];
  return { type: NEXT_MOVE, payload: { i: min.i, j: min.j}};
}

export function prevMove() {
  return {type: PREV_MOVE};
}

export function redo() {
  return { type: REDO };
}

export function setPosition (i, j) {
  return {type: SET_POSITION, payload: {i, j}};
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
  let min = 9;
  for (const d of directions) {
    if (d[0] >= 0 && d[0] < height && d[1] >= 0 && d[1] < width) {
      if (min > field[d[0]][d[1]]) {
        min = field[d[0]][d[1]];
      }
    }
  }
  return min !== 9;
}