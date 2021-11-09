import React, { useEffect, useState } from "react"
import "../assets/scss/components/game-pannel.scoped.scss"
import { updateGame } from "../store/actions/gameActions"
import { RootStateOrAny, useDispatch, useSelector } from "react-redux"

const correctComb = [
  ["0-0", "0-1", "0-2"],
  ["1-0", "1-1", "1-2"],
  ["2-0", "2-1", "2-2"],
  ["0-0", "1-0", "2-0"],
  ["0-1", "1-1", "2-1"],
  ["0-2", "1-2", "2-2"],
  ["0-0", "1-1", "2-2"],
  ["0-2", "1-1", "2-0"],
]

const GamePanel = () => {
  const dispatch = useDispatch()
  const [clicksCount, setClickType] = useState(0)
  const [clickedIds, setClickedIds] = useState<Array<string>>([])
  const [clickedUser1, setClickedUser1] = useState<Array<string>>([])
  const [clickedUser2, setClickedUser2] = useState<Array<string>>([])
  const [winComb, setWinComb] = useState<Array<string>>([])

  const currentGame = useSelector((state: RootStateOrAny) => state.data.game)

  useEffect(() => {
    if (clicksCount === 9) finishRound("equal")
  }, [clicksCount])

  useEffect(() => {
    if (clickedUser1.length || clickedUser2.length) checkWin()
  }, [clickedUser1, clickedUser2])

  const truncRound = async () => {
    const htmlCollection = document.getElementsByClassName("btn-text")
    const arr = [].slice.call(htmlCollection)

    await arr.forEach((item: HTMLElement) => {
      item.innerHTML = ""
    })
    await setClickType(0)
    await setClickedIds([])
    await setClickedUser1([])
    await setClickedUser2([])
  }

  const clickHandler = async (btnId: string) => {
    if (!clickedIds.includes(btnId)) {
      await setClickedIds((prevState) => [...prevState, btnId])
      const block = document.getElementById(btnId)
      if (block) {
        const type = clicksCount % 2 === 0
        const childEl = block.children[0]
        childEl.innerHTML = type ? "X" : "O"

        if (type) await setClickedUser1((prevState) => [...prevState, btnId])
        else await setClickedUser2((prevState) => [...prevState, btnId])
      }
    }
  }

  const checkWin = () => {
    const checker = (arr: string[], target: string[]) =>
      target.every((v) => arr.includes(v))

    const type = clicksCount % 2 === 0
    const arr = type ? clickedUser1 : clickedUser2
    let user = ""

    correctComb.forEach((item) => {
      if (checker(arr, item)) {
        setWinComb(item)
        user = type ? "user1" : "user2"
      }
    })
    setClickType((prev) => prev + 1)

    if (user) finishRound(user)
  }

  const finishRound = async (user: string) => {
    const game = { ...currentGame }

    if (user !== "equal") {
      game.wins[user] = game.wins[user] + 1
    }
    await dispatch(updateGame(game))
    // setTimeout(() => {
    //   truncRound()
    // }, 1500)
  }

  const tempArr = [...Array(3).keys()]
  const structure = tempArr.map((row) => {
    return (
      <div className="row" key={row}>
        {tempArr.map((btn) => {
          return (
            <div
              className={[
                clickedIds.includes(`${row}-${btn}`) ? "disabled-block" : "btn",
                winComb.includes(`${row}-${btn}`) ? "win-block" : null,
              ].join(" ")}
              key={`${row}-${btn}`}
              id={`${row}-${btn}`}
              onClick={() => clickHandler(`${row}-${btn}`)}
            >
              <span className="btn-text" />
            </div>
          )
        })}
      </div>
    )
  })

  return <div className="game-wrapper">{structure}</div>
}

export default React.memo(GamePanel)
