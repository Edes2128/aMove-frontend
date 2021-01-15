import { SET_COLLAPSE_FALSE, SET_COLLAPSE_TRUE } from "./types";

export default (state, action) => {
  switch (action.type) {
    case SET_COLLAPSE_TRUE:
      return action.payload;
    case SET_COLLAPSE_FALSE:
      return action.payload;
    default:
      return state;
  };
};
