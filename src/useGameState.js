import { useState } from 'react'

const useGameState = () => {
  const utils = {
    // Sum an array
    sum: arr => arr.reduce((acc, curr) => acc + curr, 0),

    // create an array of numbers between min and max (edges included)
    range: (min, max) => Array.from({ length: max - min + 1 }, (_, i) => min + i),

    // pick a random number between min and max (edges included)
    random: (min, max) => min + Math.floor(Math.random() * (max - min + 1)),

    // Given an array of numbers and a max...
    // Pick a random sum (< max) from the set of all available sums in arr
    randomSumIn: (arr, max) => {
      const sets = [[]];
      const sums = [];
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0, len = sets.length; j < len; j++) {
          const candidateSet = sets[j].concat(arr[i]);
          const candidateSum = utils.sum(candidateSet);
          if (candidateSum <= max) {
            sets.push(candidateSet);
            sums.push(candidateSum);
          }
        }
      }
      return sums[utils.random(0, sums.length - 1)];
    },
  };
  /**   stting the Compnent State  Section ** */
  const [stars, setStars] = useState(utils.random(1, 9));
  const [availableNums, setAvailableNums] = useState(utils.range(1, 9));
  const [candidateNums, setCandidateNums] = useState([])
  const [timeOut , setTimeOutSeconds] = useState(10);
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