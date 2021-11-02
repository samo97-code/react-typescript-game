import { GET_USERS } from "../types/type"

const initialState = {
  users: [],
}

const userReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
      }
    default:
      return state
  }
}

export default userReducers
