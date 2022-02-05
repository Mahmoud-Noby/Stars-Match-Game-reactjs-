
import { useState, useEffect } from 'react';
import useGameState from './useGameState';
import './App.css';
import Numbers from './Numbers';
import DisplayStars from './DisplayStars';
import ResetButton from './RestButton';

const Game = props => {
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

  const {stars, availableNums, candidateNums, timeOut, setGameState, setTimeOutSeconds} = useGameState()
  /**   stting the Compnent State  Section ** */
  // const [stars, setStars] = useState(utils.random(1, 9));
  // const [availableNums, setAvailableNums] = useState(utils.range(1, 9));
  // const [candidateNums, setCandidateNums] = useState([])
  // const [timeOut , setTimeOutSeconds] = useState(10);
  /***//////////////////////////***/
  const areCandidatesWrong = utils.sum(candidateNums) > stars;
  const gameStatus = availableNums.length === 0 ? 'won' : timeOut === 0 ? 'lost' : 'active';
  /** Transacting with the the setState  */
  const numberClicked = (number, currentStatus) => {
    console.log(number, currentStatus);
    if (currentStatus === "used" || gameStatus !== 'active') {
      return;
    }

    const newCandidateNums = currentStatus === "available" ? 
    candidateNums.concat(number) : 
    candidateNums.filter(cn => cn !== number);

    setGameState(newCandidateNums);
    // if (utils.sum(newCandidateNums) !== stars) {
    //   setCandidateNums(newCandidateNums);
    // } else {
    //   const newAvialableNums = availableNums.filter(
    //     avialable => !newCandidateNums.includes(avialable));
    //   setStars(utils.randomSumIn(newAvialableNums, 9))
    //   setAvailableNums(newAvialableNums);
    //   setCandidateNums([])
    // }
  }
  /***//////////////////////////***/


  useEffect( () => {
    console.log(props);
    if( timeOut > 0  && availableNums.length > 0) {
     const timeID = setTimeout(() => {
          setTimeOutSeconds( timeOut -1 )
      }, 1000);

      return () =>  clearTimeout(timeID);
    }
  })

  const numberStatus = (number) => {
    if (!availableNums.includes(number)) {
      return "used"
    }
    if (candidateNums.includes(number)) {
      return areCandidatesWrong ? "wrong" : "candidate"
    }
    return "available"
  }



  /*******   * Reseting the state manually  ************  */
  // const resetTheGame = () => {
  //   setStars(utils.random(1,9))
  //   setAvailableNums(utils.range(1,9))
  //   setCandidateNums([]);
  //   setTimeOutSeconds(10)
  // }

  return (
    <div className="App-header">
      <div className="game ">
        <div className="help">
          Pick 1 or more numbers that sum to the number of stars
        </div>
        <div className="body">
          <div className="left">
            { gameStatus !== 'active' ? 
              (<ResetButton  onClick={props.getNewGame} gameStatus={gameStatus}/>) :
              (<DisplayStars count={stars} />)
             }
          </div>
          <div className="right">
            {utils.range(1, 9).map(number =>
              <Numbers
                key={number}
                number={number}
                status={numberStatus(number)}
                onNumClicked={numberClicked}
              />)}
          </div>
        </div>
        <div className="timer">Time Remaining: {timeOut}</div>
      </div>
    </div>
  );
}

export default Game;