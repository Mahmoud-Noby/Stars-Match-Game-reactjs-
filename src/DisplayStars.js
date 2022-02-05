import utils from "./utils";

const DisplayStars = props => {
  console.log(props);
  return (
    <>
      {utils.range(1, props.count).map(star => <div key={star} className="star" />)}
    </>
  )
}

export default DisplayStars;