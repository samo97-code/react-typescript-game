import axios from "axios"
import { GET_USERS } from "../types/type"

export const fetchPost = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      )
      return dispatch({
        type: GET_USERS,
        payload: response.data,
      })
    } catch (e) {
      console.log(e.message)
    }
  }
}
