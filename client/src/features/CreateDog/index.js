import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments, postDogs } from "../../redux/actions";
import { Link } from "react-router-dom";

import './index.css'

const CreateDog = () => {
  const dispatch = useDispatch();
  const allTemperaments = useSelector(state => state.temperament);
  console.log('allTemperaments create dog', allTemperaments)
  //ver si es temperament en la db
  const [error, setError] = useState("");
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
    if(input.heightMax < input.heightMin){
      return setError({
        ...error,
        height: "El peso mínimo debe ser menor al màximo"
      })
    } 
    if(input.weightMax < input.weightMin){
      return setError({
        ...error,
        weight: "La altura mínima debe ser menor a la màxima"
      })
    } 
    dispatch(postDogs({
      ...input,
      height: `${input.heightMin} a ${input.heightMax}`,
      weight: `${input.weightMin} a ${input.weightMax}`
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
            className="form-inputs" 
            type="text"
            value={input.heightMin}
            onChange={(e)=>handleInput(e)} 
            name="heightMin"
            placeholder="Altura Min (ejemplo: 20)"
          />
          <input
            className="form-inputs" 
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
            className="form-inputs" 
            type="text"
            value={input.weightMin}
            onChange={(e)=>handleInput(e)} 
            name="weightMin"
            placeholder="Peso (ejemplo: 15 a 25)"
          />
          <input
            className="form-inputs" 
            type="text"
            value={input.weightMax}
            onChange={(e)=>handleInput(e)} 
            name="weightMax"
            placeholder="Peso (ejemplo: 15 a 25)"
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
            input.temperament?.map((e, i) => {
              return <li key={i}>{e}</li>
            })
          }
          </ul>
        </div>
        <input className={error.name ? "disabled-button-submit" : "form-button-submit"} onClick={(e) => handleSubmit(e)} type="submit" value="Enviar formulario" disabled={error.name || error.height || error.weight ? true : false} />
      </form>
    </div>
  )
}

export { CreateDog }; 