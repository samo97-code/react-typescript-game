import React, { useEffect, useState } from "react"
import "./../assets/scss/components/game-info.scoped.scss"
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector, RootStateOrAny } from "react-redux"
import { createGame, deleteGame } from "../store/actions/gameActions"

const GameInfo = () => {
  const router = useHistory()
  const dispatch = useDispatch()
  const game = useSelector((state: RootStateOrAny) => state.data.game)

  const [timer, setTimer] = useState("01:40")
  const [seconds, setSeconds] = useState(100)
  const [updateInterval, setUpdateInterval] = useState() as any

  useEffect(() => {
    if (Object.keys(game).length) countTimer(game.roundTimer)
  }, [])

  useEffect(() => {
    if (seconds === 0) {
      return clearInterval(updateInterval)
    }

    const minutesLeft = Math.floor(seconds / 60)
    const secondsLeft = seconds % 60
    const timerStr = `${timeDurationToString(
      minutesLeft
    )}:${timeDurationToString(secondsLeft)}`
    setTimer(timerStr)
  }, [seconds])

  const countTimer = (seconds: number) => {
    const date = new Date(seconds * 1000)
    let mm: number | string = date.getUTCMinutes()
    let ss: number | string = date.getSeconds()
    if (mm < 10) {
      mm = "0" + mm
    }
    if (ss < 10) {
      ss = "0" + ss
    }
    setTimer(`${mm}:${ss}`)
    setSeconds(seconds)
  }

  const timeDurationToString = (duration: number) => {
    return duration > 9 ? duration : "0" + duration
  }

  const startTimer = () => {
    setUpdateInterval(
      setInterval(() => {
        setSeconds((prevState) => prevState - 1)
      }, 1000)
    )
  }

  const finishGame = async () => {
    try {
      await dispatch(deleteGame(game.id))
      await router.push("/")
    } catch (e) {}
  }

  return (
    <div className="info-container">
      {!game ? (
        <h1>Loading</h1>
      ) : (
        <div>
          <div className="game-wins">
            <h2 className="mt-0 mb-16">Wins</h2>
            <p className="user mt-0 mb-8">
              <b>{game.user1}</b> - {game.wins?.user1}
            </p>
            <p className="user mt-0 mb-8">
              <b>{game.user2}</b> - {game.wins?.user2}
            </p>
          </div>
          <div className="game-wins">
            {/* <span className="" onClick={() => startTimer()}> */}
            {/*  Start timer */}
            {/* </span> */}
            {/* <span className="" onClick={() => clearInterval(updateInterval)}> */}
            {/*  Remove timer */}
            {/* </span> */}
            <div className="header">
              <h2 className="mt-0 mb-16">Round 1/{game.roundCount}</h2>
              <span className="timer mt-0 mb-16">{timer}</span>
            </div>
            {/* <div className="steps"> */}
            {/*  <p className="user mt-0 mb-8"> */}
            {/*    <b>{game.user1}</b> - #game1, #game3 */}
            {/*  </p> */}
            {/*  <p className="user mt-0 mb-8"> */}
            {/*    <b>{game.user2}</b> - #game1, #game3 */}
            {/*  </p> */}
            {/* </div> */}
          </div>

          <div className="center-block">
            <button
              onClick={() => finishGame()}
              className="btn btn-danger btn-large finish-btn"
            >
              Finish Game
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default React.memo(GameInfo)
