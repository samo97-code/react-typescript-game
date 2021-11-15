import React, { useEffect, useState } from "react"
import "./../assets/scss/components/game-info.scoped.scss"
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector, RootStateOrAny } from "react-redux"
import {
  currentUserTurn,
  deleteGame,
  updateGame,
} from "../store/actions/gameActions"
import { useCookies } from "react-cookie"

const GameInfo = (props: any) => {
  const router = useHistory()
  const dispatch = useDispatch()
  const [cookies, setCookies, removeCookie] = useCookies(["gameId"])

  const game = useSelector((state: RootStateOrAny) => state.data.game)
  const userTurn = useSelector((state: RootStateOrAny) => state.data.userTurn)

  const [timer, setTimer] = useState("")
  const [seconds, setSeconds] = useState(0.1)
  const [updateInterval, setUpdateInterval] = useState() as any

  useEffect(() => {
    if (game.roundCount) {
      if (game.progress === "finished") finishGame()

      clearInterval(updateInterval)
      props.setReset(false)
      setSeconds(game.roundTimer)
      countTimer(game.roundTimer)
      dispatch(currentUserTurn(game.user1))
      startTimer()
    }
  }, [game])

  useEffect(() => {
    if (game && seconds === 0) {
      let isLast = false
      game.currentRound = game.currentRound + 1
      if (game.currentRound > game.roundCount) {
        isLast = true
        game.currentRound = game.roundCount
      }

      if (isLast) {
        game.progress = "finished"
      }
      if (game.id) dispatch(updateGame(game))
      props.setReset(true)
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
  }

  const timeDurationToString = (duration: number) => {
    return duration > 9 ? duration : "0" + duration
  }

  const startTimer = () => {
    setUpdateInterval(
      setInterval(() => {
        setSeconds((prevState: number) => prevState - 1)
      }, 1000)
    )
  }

  const finishGame = async () => {
    try {
      const user: string = checkWinner()
      let userName = "No one win this game"
      if (user !== "equal") {
        userName = game[user] + " win this game"
      }

      await dispatch(deleteGame(game.id))
      await router.push("/")
      await alert(userName)
      await removeCookie("gameId")
    } catch (e) {}
  }

  const checkWinner = () => {
    const arr = Object.values(game.wins) as number[]
    if (arr[0] > arr[1]) return "user1"
    if (arr[0] < arr[1]) return "user2"
    return "equal"
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
            <div className="header">
              <h2 className="mt-0 mb-16">
                Round {game.currentRound}/{game.roundCount}
              </h2>
              <span className="timer mt-0 mb-16">{timer}</span>
            </div>
            <div className="steps">
              <p className="user mt-0 mb-8">
                <b>Player {userTurn || game.user1} turn</b>
              </p>
            </div>
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
