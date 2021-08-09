import { useState } from "react";

export default function useVisualMode (initial){
  //Sets mode to the last index of history minus one
  const [history, setHistory] = useState([initial]);
  
  //Sets mode to the last element in history array
  const mode = history[history.length - 1];

  //Takes in new mode and updates mode state
  function transition (mode, replace = false) {
    setHistory( prev => replace ? [...prev.slice(0, prev.length -1), mode] : [...prev, mode]
    )
  }

  function back() {
    if (history.lengeh < 2) {
      return;
    }
    setHistory(prev => [...prev.slice(0, prev.length -1)])
  }

    return { mode, transition, back };
};
