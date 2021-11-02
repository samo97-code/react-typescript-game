import React, { useEffect } from "react"
// import { useCookies } from "react-cookie"
import "../assets/scss/pages/game.scoped.scss"
import GamePanel from "../components/GamePanel"
import GameInfo from "../components/GameInfo"

const Game = () => {
  // const [cookies, setCookie] = useCookies(["user"])
  // useEffect(() => {
  //   console.log(cookies.user)
  // }, [])

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
