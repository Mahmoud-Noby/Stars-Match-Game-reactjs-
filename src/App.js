import { useState } from 'react';
import './App.css';
import Numbers from './Numbers';
import DisplayStars from './DisplayStars';
import ResetButton from './RestButton';
const App = () => {
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

  const [stars, setStars] = useState(utils.random(1, 9));
  const [availableNums, setAvailableNums] = useState(utils.range(1, 9));
  const [candidateNums, setCandidateNums] = useState([])
  const areCandidatesWrong = utils.sum(candidateNums) > stars;
  const gameIsDone = availableNums.length === 0;

  const numberStatus = (number) => {
    if (!availableNums.includes(number)) {
      return "used"
    }
    if (candidateNums.includes(number)) {
      return areCandidatesWrong ? "wrong" : "candidate"
    }

    return "available"
  }

  const numberClicked = (number, currentStatus) => {
    console.log(number, currentStatus);
    if (currentStatus === "used") {
      return;
    }

    const newCandidateNums = currentStatus === "available" ? candidateNums.concat(number) : candidateNums.filter(cn => cn !== number);

    if (utils.sum(newCandidateNums) !== stars) {
      setCandidateNums(newCandidateNums);
    } else {
      const newAvialableNums = availableNums.filter(
        avialable => !newCandidateNums.includes(avialable));
      setStars(utils.randomSumIn(newAvialableNums, 9))
      setAvailableNums(newAvialableNums);
      setCandidateNums([])
    }



  }

  const resetTheGame = () => {
    setStars(utils.random(1,9))
    setAvailableNums(utils.range(1,9))
    setCandidateNums([])
  }

  return (
    <div className="App-header">
      <div className="game ">
        <div className="help">
          Pick 1 or more numbers that sum to the number of stars
        </div>
        <div className="body">
          <div className="left">
            {gameIsDone ? (<ResetButton  onClick={resetTheGame} />) : (<DisplayStars count={stars} />)}
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
        <div className="timer">Time Remaining: 10</div>
      </div>
    </div>
  );
}

export default App;
