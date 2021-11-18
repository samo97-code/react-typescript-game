import React from "react"
import "../assets/scss/components/error-list.scoped.scss"
interface ErrorListProps {
  errors: any[]
}

const ErrorList = ({ errors }: ErrorListProps) => {
  return (
    <div>
      {errors &&
        errors.map((error: string, index: number) => {
          return (
            <span className="error-text" key={index}>
              {error}
            </span>
          )
        })}
    </div>
  )
}

export default ErrorList
