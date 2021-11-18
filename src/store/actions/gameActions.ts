import axios from "axios"
import {
  CURRENT_USER_TURN,
  GAME_BY_ID,
  SHOW_SNACKBAR,
  UPDATE_GAME,
} from "../types/type"
import { Dispatch } from "redux"
import GameI from "../../interface/game"
import SnackbarI from "../../interface/snackbarI"

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

export const currentUserTurn = (username: string) => {
  return async (dispatch: Dispatch) => {
    return dispatch({
      type: CURRENT_USER_TURN,
      payload: username,
    })
  }
}

export const setSnackbar = (data: SnackbarI) => {
  return async (dispatch: Dispatch) => {
    return dispatch({
      type: SHOW_SNACKBAR,
      payload: data,
    })
  }
}
