import {
  CREATE_GAME,
  CURRENT_USER_TURN,
  GAME_BY_ID,
  SHOW_SNACKBAR,
  UPDATE_GAME,
} from "../types/type"

const initialState = {
  games: [],
  game: {},
  userTurn: "",
  snackbar: {
    show: false,
    message: "",
    color: "success",
  },
}

const gameReducers = (state = initialState, action: any) => {
  switch (action.type) {
    case CREATE_GAME:
      return {
        ...state,
        games: action.payload,
      }
    case GAME_BY_ID:
      return {
        ...state,
        game: action.payload,
      }
    case UPDATE_GAME:
      return {
        ...state,
        game: action.payload,
      }
    case CURRENT_USER_TURN:
      return {
        ...state,
        userTurn: action.payload,
      }
    case SHOW_SNACKBAR:
      return {
        ...state,
        snackbar: action.payload,
      }
    default:
      return state
  }
}

export default gameReducers
