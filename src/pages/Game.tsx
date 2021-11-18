import React, { useEffect, useState } from "react"
import "../assets/scss/pages/game.scoped.scss"
import GamePanel from "../components/GamePanel"
import GameInfo from "../components/GameInfo"
import Loader from "../components/Loader"
import { useCookies } from "react-cookie"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { gameById } from "../store/actions/gameActions"

const Game = (): JSX.Element => {
  const dispatch = useDispatch()
  const router = useHistory()

  const [cookies] = useCookies(["gameId"])
  const [reset, setReset] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (cookies.gameId) {
      const fetchGame = async () => {
        await dispatch(gameById(cookies.gameId))
        setTimeout(() => {
          setLoading(false)
        }, 500)
      }
      fetchGame().then()
    } else router.push("/")
  }, [])

  return (
    <>
      <h1>Lets win stronger</h1>
      <div className="game">
        <div className="left-side">
          <GamePanel reset={reset} />
        </div>
        <div className="right-side">
          {loading ? <Loader /> : <GameInfo setReset={setReset} />}
        </div>
      </div>
    </>
  )
}

export default Game
