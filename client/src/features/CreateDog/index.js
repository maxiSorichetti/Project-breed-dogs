import { useState } from "react";
import { Link } from "react-router-dom";

import './index.css'

const CreateDog = () => {
  //ver si es temperament en la db
  const [input, setInput] = useState({
    name: "",
    height: "",
    weight: "",
    life_span: "",
    temperament: [],
  });

  const handleInput = (e) => {
    if(e.target.name === "temperament"){
      setInput({
        ...input,
        temperament: [...input.temperament, e.target.value]
      });
      console.log('input.temperament', input.temperament);
    }else{
      setInput({
        ...input,
        [e.target.name]: e.target.value
      });
    };
    console.log('input', input)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('input', input)
    setInput({
      name: "",
      height: "",
      weight: "",
      life_span: "",
      temperament: [],
    })
  }

  return (
    <div className="Container-create">
      <Link to="/home">
        <button className="form-button-home">Home</button>
      </Link>
      <form className="form-create">
        <h2 className="2-form">Creemos una raza juntos!</h2>
        <div>
          <input
            className="form-inputs" 
            type="text"
            value={input.name}
            onChange={(e)=>handleInput(e)} 
            name="name"
            placeholder="Nombre de la raza"
          />
        </div>
        <div>
          <input
            className="form-inputs" 
            type="text"
            value={input.height}
            onChange={(e)=>handleInput(e)} 
            name="height"
            placeholder="Altura (ejemplo: 20 a 30)"
          />
        </div>
        <div>
          <input
            className="form-inputs" 
            type="text"
            value={input.weight}
            onChange={(e)=>handleInput(e)} 
            name="weight"
            placeholder="Peso (ejemplo: 15 a 25)"
          />
        </div>
        <div>
          <input
            className="form-inputs" 
            type="text"
            value={input.life_span}
            onChange={(e)=>handleInput(e)} 
            name="life_span"
            placeholder="Esperanza de vida (ejemplo 10 a 15)"
          />
        </div>
        <div>
          <h2 className="2-form">Selecciona temperamentos</h2>
          <select className="form-select" name="temperament" onChange={(e) => handleInput(e)}>
            <option value="temperamentA">A</option>
            <option value="temperamentB">B</option>
            <option value="temperamentC">C</option>
          </select>
        </div>
        <input className="form-button-submit" onClick={(e) => handleSubmit(e)} type="submit" value="Enviar formulario" disabled={false} />
      </form>
    </div>
  )
}

export { CreateDog }; 