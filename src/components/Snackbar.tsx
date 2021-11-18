import React, { useEffect, useState } from "react"
import "../assets/scss/components/snackbar.scoped.scss"
import { RootStateOrAny, useDispatch, useSelector } from "react-redux"
import { setSnackbar } from "../store/actions/gameActions"

const Snackbar = (): JSX.Element => {
  const dispatch = useDispatch()
  const snackbar = useSelector((state: RootStateOrAny) => state.data.snackbar)
  const [timer, setTimer] = useState(0)

  useEffect(() => {
    if (snackbar.show) startTimer()
  }, [snackbar.show])

  const startTimer = () => {
    if (timer) clearTimeout(timer)

    setTimer(
      window.setTimeout(() => {
        dispatch(setSnackbar({ show: false, message: "", color: "success" }))
      }, 4000)
    )
  }

  return (
    <>
      {snackbar.show ? (
        <div className={["snackbar", `snackbar-${snackbar.color}`].join(" ")}>
          <p className="message">{snackbar.message}</p>
        </div>
      ) : null}
    </>
  )
}

export default Snackbar
