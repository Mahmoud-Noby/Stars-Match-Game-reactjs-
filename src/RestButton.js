const ResetButton = props => {
  return (
    <div className="game-done">
      <div className="message" style={{ color: props.gameStatus === 'lost' ? 'red' : 'green' }}>
        {props.gameStatus === 'lost' ? 'Game Over' : 'Nice'}
      </div>
      <button onClick={props.onClick}>Reset The Game</button>
    </div>
  )
}


export default ResetButton;