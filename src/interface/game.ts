interface wins {
  user1: number
  user2: number
}

export default interface GameI {
  id?: number | string
  user1: string
  user2: string
  roundCount: number
  roundTimer: number
  progress: "created" | "finished"
  wins: wins
}
