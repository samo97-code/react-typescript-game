import { Switch, Route } from "react-router"
import Login from "../pages/Login"
import Game from "../pages/Game"

const Routing = () => {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/game">
          <Game />
        </Route>
      </Switch>
    </>
  )
}

export default Routing
