import React, { useEffect, useState } from "react"
import "../assets/scss/components/game-pannel.scoped.scss"

const GamePanel = () => {
  const [clickType, setClickType] = useState(0)

  useEffect(() => {
    if (clickType === 10) {
      truncRound().then()
    }
  }, [clickType])

  const truncRound = async () => {
    const htmlCollection = document.getElementsByClassName("btn-text")
    const arr = [].slice.call(htmlCollection)

    await arr.forEach((item: HTMLElement) => {
      item.innerHTML = ""
    })
    await setClickType(0)
  }

  const clickHandler = (btnId: string) => {
    const block = document.getElementById(btnId)
    if (block) {
      const type = clickType % 2 === 0
      setClickType((prev) => prev + 1)
      const childEl = block.children[0]
      childEl.innerHTML = type ? "X" : "O"
    }
  }

  const tempArr = [...Array(3).keys()]
  const structure = tempArr.map((row) => {
    return (
      <div className="row" key={row}>
        {tempArr.map((btn) => {
          return (
            <div
              className="btn"
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

export default GamePanel
