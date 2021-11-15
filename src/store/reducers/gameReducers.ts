import {
  CREATE_GAME,
  CURRENT_USER_TURN,
  GAME_BY_ID,
  UPDATE_GAME,
} from "../types/type"

const initialState = {
  games: [],
  game: {},
  userTurn: "",
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
    default:
      return state
  }
}

export default gameReducers
