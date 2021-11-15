import GameI from "../interface/game"

const isRequired = (value: string | number, name: string) => {
  return !value ? `${name} field is required` : null
}

const isMinLength = (value: string, name: string, rule: any) => {
  return value.length < rule
    ? `${name} field must have min ${rule} characters`
    : null
}

const isMinValue = (value: number, name: string, rule: any) => {
  return value < rule ? `${name} field must be min ${rule}` : null
}

const isSame = (value: string, name: string, rule: any, game: GameI) => {
  let error = ""

  rule &&
    rule.forEach((item: any) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const compareItem = game[item]
      if (compareItem && compareItem === value) {
        error = `${name} field must be unique`
      }
    })

  return error
}

const UseValidate = (value: any, rules: any, name: string, game: GameI) => {
  if (Object.keys(rules).length) {
    const lists: string[] = []

    Object.entries(rules).forEach((rule) => {
      if (rule[0] === "required") {
        const error = isRequired(value, name)
        if (error) lists.push(error)
      }

      if (rule[0] === "minLength" && rule[1]) {
        const error = isMinLength(value, name, rule[1])
        if (error) lists.push(error)
      }

      if (rule[0] === "minValue" && rule[1]) {
        const error = isMinValue(value, name, rule[1])
        if (error) lists.push(error)
      }

      if (rule[0] === "notSame" && rule[1]) {
        const error = isSame(value, name, rule[1], game)
        if (error) lists.push(error)
      }
    })

    return lists
  }
  return ""
}

export default UseValidate
