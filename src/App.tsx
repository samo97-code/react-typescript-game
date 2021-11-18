import "./App.css"
import Routing from "./router/Routing"
import Snackbar from "./components/Snackbar"

const App = () => {
  return (
    <div className="App">
      <Snackbar />
      <Routing />
    </div>
  )
}

export default App
