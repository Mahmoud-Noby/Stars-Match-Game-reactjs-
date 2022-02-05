
import { useEffect } from 'react';
import useGameState from './useGameState';
import './App.css';
import Numbers from './Numbers';
import DisplayStars from './DisplayStars';
import ResetButton from './RestButton';
import utils from './utils'
const Game = props => {

  const { stars, availableNums, candidateNums, timeOut, setGameState, setTimeOutSeconds } = useGameState()

  const areCandidatesWrong = utils.sum(candidateNums) > stars;
  const gameStatus = availableNums.length === 0 ? 'won' : timeOut === 0 ? 'lost' : 'active';
  const numberClicked = (number, currentStatus) => {
    console.log(number, currentStatus);
    if (currentStatus === "used" || gameStatus !== 'active') {
      return;
    }

    const newCandidateNums = currentStatus === "available" ?
      candidateNums.concat(number) :
      candidateNums.filter(cn => cn !== number);
    setGameState(newCandidateNums);
  }


  useEffect(() => {
    console.log(props);
    if (timeOut > 0 && availableNums.length > 0) {
      const timeID = setTimeout(() => {
        setTimeOutSeconds(timeOut - 1)
      }, 1000);

      return () => clearTimeout(timeID);
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

  return (
    <div className="App-header">
      <div className="game ">
        <div className="help">
          Pick 1 or more numbers that sum to the number of stars
        </div>
        <div className="body">
          <div className="left">
            {gameStatus !== 'active' ?
              (<ResetButton onClick={props.getNewGame} gameStatus={gameStatus} />) :
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