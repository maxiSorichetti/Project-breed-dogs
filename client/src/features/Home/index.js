import './index.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDogs, getAllDogs } from '../../redux/actions';
import { Link } from 'react-router-dom';
import { Card } from '../../components/Card'

const Home = () => {
  const dispatch = useDispatch();
  const allDogs = useSelector(state => state.dogs)

  useEffect(() => {
    dispatch(getAllDogs());
  },[dispatch])

  return (
    <div className="ContainerHome">
      <div className="Nav">
        <h2>Estoy en Home NAV</h2>
        <input type="text" /> 
      </div>
      <div className="Filters">
        <h2>filtros, Temperamento - raza (api o creado por nos) - asd o desc (por orden alfabetico o peso)</h2>
      </div>
      <div className="Cards">
        <h2>Espacio para las cards</h2>
        {
          allDogs?.map((dog, i) => {
            return (
              // <Link key={i} to={`/details/${dog.name}`}>
                <Card key={i} name={dog.name} image={dog.image} temperament={dog.temperament} weight={dog.weight} />
              // </Link>
                )
          })
        }
      </div>
      <div className="Paginate">
        Paginado
      </div>
    </div>
  )
};

export { Home }