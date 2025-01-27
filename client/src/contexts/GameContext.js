import { createContext } from "react";

export const queueDefault = {
  isQueued: false,
  position: 0,
  length: 0
}

export const GameContext = createContext();