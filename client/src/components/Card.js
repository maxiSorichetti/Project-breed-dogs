
const Card = ({image, name, temperament, weight}) => {
  return (
    <div> 
      <img src={image} alt={name} width="150px" height="150px"/>
      <h2>Nombre: {name}</h2>
      <h2>Temperamento: {temperament && temperament.forEach(t => t)}</h2>
      <h2>Peso: {weight}</h2>
    </div>
  )
}

export { Card }