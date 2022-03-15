import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDetailDog } from '../../redux/actions'
import { useParams } from "react-router-dom"
import "./index.css"

const DetailDog = ({image, name, temperament, height, weight, life_span}) => {
  const dispatch = useDispatch();
  const dataDog = useSelector(state => state.detailDog);
  const { idRaza } = useParams();

  useEffect(() => {
    dispatch(getDetailDog(idRaza))
  },[]);
  console.log('dataDog', dataDog)
  console.log('dataDog.createdInDb', dataDog.createdInDb)
  return (
    <div className="detail-container">
      {Object.keys(dataDog).length > 0 ? (
          <div className="card-detail">
            <div className="imgContainer">
              <img className="picDog" src={dataDog.createdInDb ? dataDog.image : dataDog.image.url} alt={"Dog pics not found"} width="250" height="250" />
            </div>
            <div className="info-detail">
              <h2>Nombre: {dataDog.name}</h2>
              <h2>Altura: {dataDog.createdInDb ? dataDog.height : dataDog.height.metric}</h2>
              <h2>Peso: {dataDog.createdInDb ? dataDog.weight : dataDog.weight.metric}</h2>
              <h2>Esperanza de vida: {dataDog.life_span}</h2>
              {/* <h2>Temperamento: {dataDog.createdInDb ? dataDog.temperament.map((e, i) => i === (dataDog.temperament.length - 1) ? `${e.name} ` : `${e.name}, `) : dataDog.temperament && dataDog.temperament.split(" ").map(t => t)}</h2> */}
              <h2>Temperamento: {dataDog.createdInDb ? dataDog.temperament.map((e, i) => i === (dataDog.temperament.length - 1) ? `${e} ` : `${e}, `) : dataDog.temperament && dataDog.temperament.split(" ").map((e) => `${e} `)}</h2>
            </div>
          </div>
        ) : "No se encontro la raza indicada"
      }
      <div className="link-create">
        <Link to="/create">
          <button className="button">Crear mi propia raza</button>
        </Link>
      </div >
    </div>
  )
}

export { DetailDog }