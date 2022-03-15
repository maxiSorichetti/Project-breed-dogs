import './index.css';
import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTemperaments, getAllDogs } from '../../redux/actions';
import { Card } from '../../components/Card';
import SearchBar from '../../components/SearchBar/index';
import Temperament from '../../components/Temperament/index';
import OrderDogs from '../../components/OrderDogs/index';
import Paginate from '../../components/Paginate/index';

const Home = () => {
  const dispatch = useDispatch();
  const allDogs = useSelector(state => state.dogs);
  const allTemperaments = useSelector(state => state.temperament);

  useEffect(() => {
    dispatch(getAllDogs());
    dispatch(getTemperaments());
  },[dispatch])

  console.log('allTemperaments', allTemperaments)
  return (
    <div className="ContainerHome">
      <div className="Nav">
        {/* <h2>Estoy en Home NAV</h2> */}
      <SearchBar />
      </div>
      <div className="Filters">
        {/* <h2>filtros, Temperamento - raza (api o creado por nos) - asd o desc (por orden alfabetico o peso)</h2> */}
        <Temperament />
        <OrderDogs />
      </div>
      <div className="Cards">
        {
          allDogs?.map((dog, i) => {
            return (
                <Card key={i} name={dog.name} image={dog.image} temperament={dog.createdInDb ? dog.temperaments.map((e, i) => i === (dog.temperaments.length - 1) ? `${e.name} ` : `${e.name}, `) : dog.temperament && dog.temperament.split(" ").map((e) => `${e} `)} weight={dog.weight} />
                )
          })
        }
      </div>
      <div className="Paginate">
        <Paginate />
      </div>
    </div>
  )
};

export { Home }