import './index.css';
import { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDogs, getFilterDog } from '../../redux/actions';
import { Card } from '../../components/Card/Card';
import Temperament from '../../components/Temperament/index2';
import { Link } from 'react-router-dom';

const Home = () => {
  const dispatch = useDispatch();
  const allDogs = useSelector(state => state.dogs);
  const filterDogState = useSelector(state => state.filterDogs);
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsInPage, setDogsInPage] = useState(8);
  const [orderAscDesc, setOrderAscDesc] = useState("ASC")
  const [dogDborApi, setDogDborApi] = useState("")
  const [text, setText] = useState("");
  const [msj, setMsj] = useState(false);
  
  useEffect(() => {
    dispatch(getAllDogs());
  },[dispatch])

  const handleInput = (e) => {
  setCurrentPage(e.target.name)
}

  const filterDogs = dogDborApi !== "" ? allDogs.filter(e => dogDborApi === "API" ? !e.createdInDb : e.createdInDb) : allDogs

  const orderDogsAscDesc =  filterDogs.sort(function(a, b) {
    if(orderAscDesc === "ASC" || orderAscDesc === "DESC"){
        if(a.name > b.name){
          return orderAscDesc === "ASC" ? 1 : -1;
        }
        if(a.name < b.name){
          return orderAscDesc === "ASC" ? -1 : 1;
        }
        return 0
    }
    if(orderAscDesc === "PESOASC" || orderAscDesc === "PESODESC"){
    if(orderAscDesc === "PESOASC"){ 
      const weightA = isNaN(a.weight) ? " " : a.weight
      return (weightA - b.weight)
    }
    if(orderAscDesc === "PESODESC"){
      const weightA= isNaN(a.weight) ? " " : a.weight
      return b.weight - weightA
    }
    return 0
  }
  return 0
})

  const pageNumbers = [];

  for(let i = 0; i < Math.ceil(orderDogsAscDesc.length/dogsInPage); i++) {
  pageNumbers.push(i+1)
  }
  const indexOfLastDog = currentPage * dogsInPage;
  const indexOfFirstDog = indexOfLastDog - dogsInPage;
  
  const viewDogs = orderDogsAscDesc?.slice(indexOfFirstDog, indexOfLastDog);
  
  const handleInputSort = (e) => {
      setOrderAscDesc(e.target.value)
  }

  const handleDbOrApi = (e) => {
      setDogDborApi(e.target.value)
  }

  const handleInputSearch = (e) => {
    e.preventDefault();
    setText(e.target.value);
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
      const filterDog = orderDogsAscDesc.filter(dog => dog.name.toLowerCase().includes(text));
      filterDog.length ? dispatch(getFilterDog(filterDog)) : setMsj(true)
      setText("");
    }

  const refreshPage = () => {
    window.location.reload(false);
  }

  return (
  <div className="ContainerHome">
    <div className="Nav">
      <input className={msj ?"search-danger" : "search-inputs"} onChange={(e)=>handleInputSearch(e)} type="text" placeholder={msj ? "No existe esa raza" : "Ingrese una raza de perro"} value={text} />
      <button className="search-button" type="submit" onClick={(e) => handleSubmit(e)}>Buscar</button>
      <Link to="/create">
        <button className="create-button" type="button">Crear raza</button>
      </Link>
    </div>
    <div className="Filters">
      <select className="home-select" onChange={(e)=>handleDbOrApi(e)}>
        <option value="">Seleccionar DB o API</option>
        <option value="DB">Dog DB</option>
        <option value="API">Dog API</option>
      </select>
      <select className="home-select" onChange={(e)=>handleInputSort(e)}>
        <option value="">Seleccionar orden</option>
        <option value="ASC">Ascendente</option>
        <option value="DESC">Descendente</option>
        <option value="PESOASC">Peso Ascendente</option>
        <option value="PESODESC">Peso Descentende</option>
      </select>
        <Temperament />
        <button className="search-button" onClick={() => refreshPage()}type="button">Refresh</button>
    </div>
    <div className="Cards">
      { 
        filterDogState.length? <Card name={filterDogState[0].name} image={filterDogState[0].image} temperament={filterDogState[0].createdInDb ? filterDogState[0].temperaments.map((e, i) => i === (filterDogState[0].temperaments.length - 1) ? `${e.name} ` : `${e.name}, `) : filterDogState[0].temperament && filterDogState[0].temperament.split(" ").map((e) => `${e} `)} weight={filterDogState[0].weight} />
        :
        viewDogs?.map((dog, i) => {
          return (
              <Card key={i} name={dog.name} image={dog.image} temperament={dog.createdInDb ? dog.temperaments.map((e, i) => i === (dog.temperaments.length - 1) ? `${e.name} ` : `${e.name}, `) : dog.temperament && dog.temperament.split(" ").map((e) => `${e} `)} weight={dog.weight} />
              )
            })
          }
      </div>
      {
        !filterDogState.length && 
          <div className="Paginate">
            {
              pageNumbers?.map(e => (
                <button className="button-paginate" key={e} name={e} onClick={(e)=>handleInput(e)}>{e}</button>
                ))
            }
          </div>
      }
    </div>
  )
};

export { Home }