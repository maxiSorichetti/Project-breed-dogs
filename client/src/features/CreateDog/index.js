import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments, postDogs } from "../../redux/actions";
import { Link } from "react-router-dom";

import './index.css'

const CreateDog = () => {
  const dispatch = useDispatch();
  const allTemperaments = useSelector(state => state.temperament);
  const [error, setError] = useState({});
  const [input, setInput] = useState({
    name: "",
    heightMin: "",
    heightMax: "",
    height: "",
    weight: "",
    weightMin: "",
    weightMax: "",
    life_span: "",
    temperament: [],
  });

  useEffect(() => {
    dispatch(getTemperaments());
  },[dispatch]);

  const validate = (input) => {
    const errors = {};
    if(!input.name){
      errors.name = "Nombre es requerido";
    }else if (!/^[a-z A-Z]+$/.test(input.name)){
      errors.name = "Nombre permite solo letras Minusculas y/o Mayusculas"
    }else if(!input.heightMin){
      errors.height = "Altura mínima es requerida";
    }else if(!input.heightMax){
      errors.height = "Altura máxima es requerido";
    }else if(input.heightMax < input.heightMin){
      errors.height = "La altura mínimo debe ser menor a la máxima";
    }
    return errors
  }

  const handleInput = (e) => {
    if(e.target.name === "temperament"){
      if(!(input.temperament.includes(e.target.value))){
        setInput({
          ...input,
          temperament: [...input.temperament, e.target.value]
        });
      }
    }else{
      setInput({
        ...input,
        [e.target.name]: e.target.value
      });
    };
    setError(validate({
      ...input,
      [e.target.name]: e.target.value
    }))
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postDogs({
      ...input,
      height: `${input.heightMin} - ${input.heightMax}`,
      weight: `${input.weightMin} - ${input.weightMax}`
    }));
    setInput({
      name: "",
      heightMin: "",
      heightMax: "",
      height: "",
      weight: "",
      weightMin: "",
      weightMax: "",
      life_span: "",
      temperament: [],
    })
    alert("Formulario enviado con èxito")
  }

  const handleDelete = (event) => {
    event.preventDefault();
    const tempFilter = input.temperament.filter(e => e !== event.target.value)
    setInput({
      ...input,
      temperament: tempFilter
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
          {error.name && (<p>{error.name}</p>)}
        </div>
        <div>
          <input
            className="form-inputs-small" 
            type="text"
            value={input.heightMin}
            onChange={(e)=>handleInput(e)} 
            name="heightMin"
            placeholder="Altura Min (ejemplo: 20)"
          />
          <input
            className="form-inputs-small" 
            type="text"
            value={input.heightMax}
            onChange={(e)=>handleInput(e)} 
            name="heightMax"
            placeholder="Altura Max (ejemplo: 30)"
            />
            {error.height && (<p>{error.height}</p>)}
        </div>
        <div>
          <input
            className="form-inputs-small" 
            type="text"
            value={input.weightMin}
            onChange={(e)=>handleInput(e)} 
            name="weightMin"
            placeholder="Peso Min (ejemplo: 15)"
          />
          <input
            className="form-inputs-small" 
            type="text"
            value={input.weightMax}
            onChange={(e)=>handleInput(e)} 
            name="weightMax"
            placeholder="Peso Max (ejemplo: 25)"
            />
            {error.weight && (<p>{error.weight}</p>)}
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
          <select className="form-select" name="temperament" onChange={(e) => handleInput(e)}>
          {allTemperaments?.map((e, i) => {
              return <option key={i} value={e.name}>{e.name}</option>
            })
          }
          </select>
        </div>
        <div>
          <ul>
          {
            input.temperament?.map((f,i) => {
              return (
                <div key={i} className="temperament-select">
                  <p>{f}</p>
                  <button className="button-delete" value={f} onClick={(e) => handleDelete(e)}>X</button>
                </div>
              )
            })
          }
          </ul>
        </div>
        <input className={Object.keys(error).length ? "disabled-button-submit" : "form-button-submit"} onClick={(e) => handleSubmit(e)} type="submit" value="Enviar formulario" disabled={Object.keys(error).length ? true : false} />
      </form>
    </div>
  )
}

export { CreateDog }; 