import "../assets/scss/pages/login-form.scoped.scss"
import { useCookies } from "react-cookie"
import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"
import { ChangeEvent, useEffect, useState } from "react"
import { createGame } from "../store/actions/gameActions"
import Game from "../interface/game"
import useValidate from "../hooks/useValidate"
import ErrorList from "../components/ErrorList"

const validations: { [key: string]: any } = {
  user1: {
    required: true,
    minLength: 3,
    notSame: ["user2"],
  },

  user2: {
    required: true,
    minLength: 3,
    notSame: ["user1"],
  },
  roundCount: {
    required: true,
    minValue: 1,
  },
  roundTimer: {
    required: true,
    minValue: 100,
  },
}

const Login = () => {
  const router = useHistory()
  const dispatch = useDispatch()
  const [cookies, setCookie] = useCookies()

  const [errors, setErrors]: any[] = useState([])
  const [disabled, setDisabled] = useState(true)
  const [game, setGame] = useState<Game>({
    user1: "",
    user2: "",
    roundCount: 5,
    roundTimer: 100,
    progress: "created",
    currentRound: 1,
    wins: {
      user1: 0,
      user2: 0,
    },
  })

  useEffect(() => {
    if (
      Object.keys(errors).length &&
      errors.user1 &&
      !errors.user1.isInvalid &&
      errors.user2 &&
      !errors.user2.isInvalid &&
      !errors.roundCount?.isInvalid &&
      !errors.roundTimer?.isInvalid
    ) {
      setDisabled(false)
    } else setDisabled(true)
  }, [errors])

  const changeHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target
    setGame((prev) => {
      return {
        ...prev,
        [target.name]: target.value,
      }
    })

    startValidation(target)
  }

  const startValidation = (target: any) => {
    const data = useValidate(
      target.value,
      validations[target.name],
      target.name,
      game
    )
    setErrors((prevState: any) => {
      return {
        ...prevState,
        [target.name]: {
          list: data,
          isInvalid: !!data.length,
        },
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
            className={
              errors.user1 && errors.user1.isInvalid ? "error-border" : ""
            }
            onChange={(e) => changeHandler(e)}
          />
          {errors.user1 && errors.user1.isInvalid ? (
            <ErrorList errors={errors.user1.list} />
          ) : null}
        </div>
        <div className="form-group">
          <label htmlFor="user2">Username 2</label>
          <input
            id="user2"
            type="text"
            placeholder="Username 2"
            name="user2"
            className={
              errors.user2 && errors.user2.isInvalid ? "error-border" : ""
            }
            onChange={(e) => changeHandler(e)}
          />
          {errors.user2 && errors.user2.isInvalid ? (
            <ErrorList errors={errors.user2.list} />
          ) : null}
        </div>
        <div className="form-group">
          <label htmlFor="roundCount">Round counts</label>
          <input
            id="roundCount"
            type="number"
            placeholder="Round counts"
            name="roundCount"
            value={game.roundCount}
            className={
              errors.roundCount && errors.roundCount.isInvalid
                ? "error-border"
                : ""
            }
            onChange={(e) => changeHandler(e)}
          />
          {errors.roundCount && errors.roundCount.isInvalid ? (
            <ErrorList errors={errors.roundCount.list} />
          ) : null}
        </div>
        <div className="form-group">
          <label htmlFor="roundTimer">Round timer</label>
          <input
            id="roundTimer"
            type="number"
            placeholder="Round timer"
            name="roundTimer"
            value={game.roundTimer}
            className={
              errors.roundTimer && errors.roundTimer.isInvalid
                ? "error-border"
                : ""
            }
            onChange={(e) => changeHandler(e)}
          />
          {errors.roundTimer && errors.roundTimer.isInvalid ? (
            <ErrorList errors={errors.roundTimer.list} />
          ) : null}
        </div>
        <div className="form-group action">
          <button
            onClick={() => startGame()}
            disabled={disabled}
            className={disabled ? "disabled-btn" : ""}
          >
            Start Game
          </button>
        </div>
      </div>
    </>
  )
}

export default Login
