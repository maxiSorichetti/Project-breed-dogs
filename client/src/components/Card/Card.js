import './index.css'
import { Link } from 'react-router-dom'

const Card = ({image, name, temperament, weight}) => {
  const style= {
    textDecoration: 'none'
  }

  return (
    <Link style={style} to={`/details/${name}`}>
      <div className="cardContainer"> 
        <div className="imgContainer">
          <img className="picDog" src={image} alt={name} width="270" height="160" margin="10" />
        </div>
        <div className="text-Card">
          <h2 >{name}</h2>
          <h3>Peso {weight} kg.</h3>
          <h3>Temperamentos: {temperament}</h3>
        </div>
      </div>
    </Link>
  )
}

export { Card }


