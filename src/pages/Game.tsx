import React, { useEffect, useState } from "react"
// import { useCookies } from "react-cookie"
import "../assets/scss/pages/game.scoped.scss"
import GamePanel from "../components/GamePanel"
import GameInfo from "../components/GameInfo"
import { useCookies } from "react-cookie"
import GameI from "../interface/game"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { gameById } from "../store/actions/gameActions"

const Game = () => {
  const dispatch = useDispatch()
  const router = useHistory()

  const [cookies] = useCookies(["gameId"])

  useEffect(() => {
    const fetchGame = async (): Promise<void> => {
      await dispatch(gameById(cookies.gameId))
    }
    fetchGame()
  }, [])

  return (
    <>
      <h1>Lets win stronger</h1>
      <div className="game">
        <div className="left-side">
          <GamePanel />
        </div>
        <div className="right-side">
          <GameInfo />
        </div>
      </div>
    </>
  )
}

export default Game
