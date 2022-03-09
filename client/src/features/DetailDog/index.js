import { Link } from 'react-router-dom';

const DetailDog = ({image, name, temperament, height, weight, life_span}) => {
  return (
    <div>
      <Link to="/create">
        <button>Crear mi propia raza</button>
      </Link>
      <img src={image} alt={name} width="200" height="200" />
      <h2>Nombre: {name}</h2>
      <h2>Temperamento: {temperament && temperament.forEach(t => t)}</h2>
      <h2>Altura: {height}</h2>
      <h2>Peso: {weight}</h2>
      <h2>Esperanza de vida: {life_span}</h2>
    </div>
  )
}

export { DetailDog }