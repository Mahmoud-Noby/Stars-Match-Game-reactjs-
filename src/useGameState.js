import { useState } from 'react'
import utils from './utils'
const useGameState = () => {

  /**   stting the Compnent State  Section ** */
  const [stars, setStars] = useState(utils.random(1, 9));
  const [availableNums, setAvailableNums] = useState(utils.range(1, 9));
  const [candidateNums, setCandidateNums] = useState([])
  const [timeOut, setTimeOutSeconds] = useState(10);
  /***//////////////////////////***/

  /** Transacting with the the setState Calling  */
  const setGameState = (newCandidateNums) => {
    if (utils.sum(newCandidateNums) !== stars) {
      setCandidateNums(newCandidateNums);
    } else {
      const newAvialableNums = availableNums.filter(
        avialable => !newCandidateNums.includes(avialable));
      setStars(utils.randomSumIn(newAvialableNums, 9))
      setAvailableNums(newAvialableNums);
      setCandidateNums([]);
    }
  }

  return { stars, availableNums, candidateNums, timeOut, setTimeOutSeconds, setGameState }
}

export default useGameState;