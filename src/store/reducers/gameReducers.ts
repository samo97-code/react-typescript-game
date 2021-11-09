import { CREATE_GAME, GAME_BY_ID, UPDATE_GAME } from "../types/type"

const initialState = {
  games: [],
  game: {},
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
    default:
      return state
  }
}

export default gameReducers
