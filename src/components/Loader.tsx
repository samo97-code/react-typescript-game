import React from "react"
import "../assets/scss/components/loader.scoped.scss"

const Loader = () => {
  return (
    <div className="loading-wrapper">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default Loader
