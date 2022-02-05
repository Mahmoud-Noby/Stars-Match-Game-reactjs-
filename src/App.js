import Game from './Game';
import {useState} from 'react'

const App = () => {
  const [gameId, setGameID] = useState(1)
  return (
    <Game key={gameId} getNewGame={ () => setGameID(gameId + 1) } />
  );
}

export default App;
