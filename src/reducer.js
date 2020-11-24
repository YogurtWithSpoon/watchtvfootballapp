export const initialState = {
  player1: { name: "matchpremierhd", url: "" },
};

export const actionTypes = {
  SET_PLAYER: "SET_PLAYER",
  DELETE_PLAYER: "DELETE_PLAYER",
  SET_NAME: "SET_NAME"
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_PLAYER:
      return {
        ...state,
        ['player'+Math.floor(Math.random()* 500)] : {name: '', url: ''},
      };
    case actionTypes.DELETE_PLAYER:
      let newState = state
      delete newState[action.player]
      return {
        ...newState
      }
    case actionTypes.SET_NAME:
      return {
        ...state,
        [action.payload[0]] : {name: action.payload[1] , url: action.payload[2]}
      }
    default:
      return state;
  }
};

export default reducer;
