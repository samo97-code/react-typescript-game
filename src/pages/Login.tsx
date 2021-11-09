import "../assets/scss/pages/login-form.scoped.scss"
import { useCookies } from "react-cookie"
import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"
import { ChangeEvent, useState } from "react"
import { createGame } from "../store/actions/gameActions"
import Game from "../interface/game"

type Results = {
  results: Array<any>
}

type AxiosResponseData = {
  data: Results
}

const Login = () => {
  const router = useHistory()
  const dispatch = useDispatch()
  const [cookies, setCookie] = useCookies()

  const [game, setGame] = useState<Game>({
    user1: "",
    user2: "",
    roundCount: 5,
    roundTimer: 100,
    progress: "created",
    wins: {
      user1: 0,
      user2: 0,
    },
  })

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setGame((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      }
    })
  }

  const startGame = async () => {
    try {
      const resp = (await dispatch(createGame(game))) as unknown as Game
      setCookie("gameId", resp.id)
      await router.push("/game")
    } catch (e) {}
  }

  return (
    <>
      <h1>Welcome to our game</h1>
      <div className="login-form">
        <div className="form-group">
          <label htmlFor="user1">Username 1</label>
          <input
            id="user1"
            type="text"
            placeholder="Username 1"
            name="user1"
            onChange={(e) => changeHandler(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="user2">Username 2</label>
          <input
            id="user2"
            type="text"
            placeholder="Username 2"
            name="user2"
            onChange={(e) => changeHandler(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="roundCount">Round counts</label>
          <input
            id="roundCount"
            type="number"
            placeholder="Round counts"
            name="roundCount"
            value={game.roundCount}
            onChange={(e) => changeHandler(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="roundTimer">Round timer</label>
          <input
            id="roundTimer"
            type="number"
            placeholder="Round timer"
            name="roundTimer"
            value={game.roundTimer}
            onChange={(e) => changeHandler(e)}
          />
        </div>
        <div className="form-group action">
          <button onClick={() => startGame()}>Start Game</button>
        </div>
      </div>
    </>
  )
}

export default Login
