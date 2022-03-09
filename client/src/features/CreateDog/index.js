import { Link } from "react-router-dom";
import './index.css'

const CreateDog = () => {

  return (
    <div className="Container-create">
      <Link to="/home">
        <button>Home</button>
      </Link>
      <form className="form-create">
        <h2>Creemos una raza juntos!</h2>
        <div>
          {/* <label>Nombre </label> */}
          <input
            className="form-inputs" 
            type="text" 
            name="name"
            placeholder="Nombre de la raza"
          />
        </div>
        <div>
          {/* <label>Altura </label> */}
          <input
            className="form-inputs" 
            type="text" 
            name="height"
            placeholder="Ejemplo: 20 a 30"
          />
        </div>
        <div>
          {/* <label>Peso </label> */}
          <input
            className="form-inputs" 
            type="text" 
            name="weight"
            placeholder="Eejemplo: 15 a 25"
          />
        </div>
        <div>
          {/* <label>Esperanza de vida </label> */}
          <input
            className="form-inputs" 
            type="text" 
            name="life_span"
            placeholder="Ejemplo 10 a 15"
          />
        </div>
        <div>
          <h2>select temperamentos</h2>
        </div>
        <input className="form-button-submit" type="submit" value="Enviar formulario" />
      </form>
    </div>
  )
}

export { CreateDog }; 