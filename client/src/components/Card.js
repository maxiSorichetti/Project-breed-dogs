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
          <img className="picDog" src={image} alt={name} width="280" height="180" margin="20" />
        </div>
        <div className="text-Card">
          <h1 >Nombre: {name}</h1>
          <h3>Peso: {weight}</h3>
          <h3>Temperamento: {temperament}</h3>
        </div>
      </div>
    </Link>
  )
}

export { Card }

    // <div className="cardContainer"> 
    //   <div className="imgContainer">
    //     <img className="picDog" src={image} alt={name} width="180" height="180" margin="20" />
    //   </div>
    //   <div className="h2-Card">
    //   <h1>Nombre: {name}</h1>
    //   <h1>Temperamento: {temperament && temperament.split(" ").map(t => t)}</h1>
    //   <h1>Peso: {weight}</h1>
    //   </div>
    // </div>
