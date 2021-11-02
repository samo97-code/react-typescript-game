// import { useCookies } from "react-cookie"
// import { useEffect } from "react"
import "../assets/scss/pages/login-form.scoped.scss"
import { useHistory } from "react-router-dom"

const Login = () => {
  const router = useHistory()
  // const [cookies, setCookie] = useCookies()

  // console.log("login")

  // useEffect(() => {
  //   setCookie("user", "aaaaaaaaaaa")
  // }, [])

  const startGame = () => {
    router.push("/game")
  }

  return (
    <>
      <h1>Welcome to our game</h1>
      <div className="login-form">
        <div className="form-group">
          <label htmlFor="user1">Username 1</label>
          <input id="user1" type="text" placeholder="Username 1" />
        </div>
        <div className="form-group">
          <label htmlFor="user2">Username 2</label>
          <input id="user2" type="text" placeholder="Username 2" />
        </div>
        <div className="form-group">
          <label htmlFor="roundCount">Round counts</label>
          <input id="roundCount" type="number" placeholder="Round counts" />
        </div>
        <div className="form-group">
          <label htmlFor="roundTimer">Round timer</label>
          <input id="roundTimer" type="number" placeholder="Round timer" />
        </div>
        <div className="form-group action">
          <button onClick={() => startGame()}>Start Game</button>
        </div>
      </div>
    </>
  )
}

export default Login
