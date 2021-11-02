import React from "react"
import { useHistory } from "react-router-dom"

const GameInfo = () => {
  const router = useHistory()

  const finishGame = () => {
    router.push("/")
  }

  return (
    <div>
      <button onClick={() => finishGame()}>Finish</button>
    </div>
  )
}

export default GameInfo
