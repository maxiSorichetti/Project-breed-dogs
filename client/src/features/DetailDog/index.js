import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDetailDog } from '../../redux/actions'
import { useParams } from "react-router-dom"
import "./index.css"

const DetailDog = () => {
  const dispatch = useDispatch();
  const dataDog = useSelector(state => state.detailDog);
  const { idRaza } = useParams();

  useEffect(() => {
    dispatch(getDetailDog(idRaza))
  },[]);

  return (
    <div className="detail-container">
      <div className="detail-nav">
            <div className="link-create">
              <Link to="/create">
                <button className="button" type="button">Crear mi propia raza</button>
              </Link>
            </div >
            <div className="link-create">
              <Link to="/home">
                <button className="button" type="button">Volver a Inicio</button>
              </Link>
            </div >
      </div>
      <div>
      {Object.keys(dataDog).length > 0 ? (
        <div className="card-detail">
            <div className="imgContainer">
              <img className="picDog" src={dataDog.createdInDb ? dataDog.image : dataDog.image.url} alt={"Dog pics not found"} width="500" height="300" />
            </div>
            <div className="info-detail">
              <h1>{dataDog.name}</h1>
              <h2>Height: {dataDog.createdInDb ? dataDog.height : dataDog.height.metric} cm</h2>
              <h2>Weight: {dataDog.createdInDb ? dataDog.weight : dataDog.weight.metric} kg</h2>
              <h2>Life span: {dataDog.life_span}</h2>
              <h2>Temperament: {dataDog.createdInDb ? dataDog.temperament.map((e, i) => i === (dataDog.temperament.length - 1) ? `${e} ` : `${e}, `) : dataDog.temperament && dataDog.temperament.split(" ").map((e) => `${e} `)}</h2>
            </div>
          </div>
        ) : "No se encontro la raza indicada"
      }
      </div>
    </div>
  )
}

export { DetailDog }