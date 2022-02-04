
import './App.css';

const Numbers = props => {
  const colors = {
    available: 'lightgray',
    used: 'lightgreen',
    wrong: 'lightcoral',
    candidate: 'deepskyblue',
  };
return (
  <button 
  className="number"  
  style={{ backgroundColor: colors[props.status] }}
  key={props.number} 
  onClick={ (e) => props.onNumClicked(props.number, props.status ) } > 
  {props.number}
  </button>
)
}
export default Numbers;