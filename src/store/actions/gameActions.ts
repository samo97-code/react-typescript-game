import axios from "axios"
import { GAME_BY_ID, UPDATE_GAME } from "../types/type"
import { Dispatch } from "redux"
import GameI from "../../interface/game"

export const createGame = (game: GameI) => {
  return async () => {
    try {
      const resp = await axios.post("http://localhost:8081/games", game)
      return resp.data
    } catch (e: any) {
      console.log(e.message)
    }
  }
}

export const gameById = (id: number) => {
  return async (dispatch: Dispatch) => {
    try {
      const resp = await axios.get(`http://localhost:8081/games/${id}`)
      return dispatch({
        type: GAME_BY_ID,
        payload: resp.data,
      })
    } catch (e: any) {
      console.log(e.message)
    }
  }
}

export const updateGame = (game: GameI) => {
  return async (dispatch: Dispatch) => {
    try {
      const resp = await axios.put(
        `http://localhost:8081/games/${game.id}`,
        game
      )
      console.log(resp.data, "resp.data")
      return dispatch({
        type: UPDATE_GAME,
        payload: resp.data,
      })
    } catch (e: any) {
      console.log(e.message)
    }
  }
}

export const deleteGame = (id: number) => {
  return async () => {
    try {
      return await axios.delete(`http://localhost:8081/games/${id}`)
    } catch (e: any) {
      console.log(e.message)
    }
  }
}
