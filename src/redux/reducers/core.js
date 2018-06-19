import { NEXT_MOVE, UPDATE_FIELD, getDirections, RUN, STOP } from "../actions/core";

const initialState = {
  width: 8,
  height: 8,
  field: Array(8).fill(null).map(()=>Array(8).fill(null)),
  horse: {i: -1, j: -1},
  isRunning: false,
  journal: []
};

export default function (state = initialState, action) {
  switch (action.type) {
  case RUN:
    return {...state, isRunning: true};
  case STOP:
    return {...state, isRunning: false};
  case UPDATE_FIELD:
    return {...state, field: updateField(state.width, state.height, state.field)};
  case NEXT_MOVE:
    const field = state.field.map((sub, i) => sub.map((v, j) => {
      return i === action.payload.i && j === action.payload.j
        ? Infinity
        : v
    }));
    const newField = updateField(state.width, state.height, field);
    const horse = {i:action.payload.i, j:action.payload.j};
    return {
      ...state,
      field: newField,
      horse: horse,
      journal: [...state.journal, {field:newField, horse: horse}]
    }; 
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