import { NEXT_MOVE, getDirections, RUN, STOP, PREV_MOVE } from "../actions/core";

const initialState = {
  width: 8,
  height: 8,
  field: Array(8).fill(null).map(()=>Array(8).fill(null)),
  horse: {i: -1, j: -1},
  isRunning: false,
  journal: [],
  undo: 0
};

export default function (state = initialState, action) {
  switch (action.type) {
  case RUN:
    return {...state, isRunning: true};
  case STOP:
    return {...state, isRunning: false};
  case NEXT_MOVE:
    const newField = updateField(
      state.width,
      state.height,
      state.field.map((sub, i) => sub.map((v, j) => {
        return i === action.payload.i && j === action.payload.j
          ? Infinity
          : v
      }))
    );
    const horse = {i:action.payload.i, j:action.payload.j};
    return {
      ...state,
      field: newField,
      horse: horse,
      journal: state.undo === 0 ? [...state.journal, {field:newField, horse: horse}] : state.journal,
      undo: Math.max(0, state.undo - 1)
    };
  case PREV_MOVE:
    console.log(state.journal.length, state.undo);
    const prevState = state.journal[state.journal.length - state.undo - 2];
    console.log(prevState);
    if (prevState === undefined) {
      return state;
    }
    return {
      ...state,
      field: prevState.field,
      horse: prevState.horse,
      undo: state.undo + 1
    }
  default:
    return state;
  }
}

function updateField (width, height, field) {
  return field.map((sub, i) => sub.map((v, j) => {
    if (v === Infinity) {
      return Infinity;
    }
    const directions = getDirections(i, j);
    let count = 0;
    for (const d of directions) {
      if (d[0] >= 0 && d[0] < height && d[1] >= 0 && d[1] < width &&
        field[d[0]][d[1]] !== Infinity) {
        count++;
      }
    }
    return count;
  }));

}