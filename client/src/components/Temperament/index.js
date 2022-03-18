import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getTemperaments, getFilterTemperament } from '../../redux/actions';

export default function Temperament(){
  const dispatch = useDispatch();
  const allTemperaments = useSelector(state => state.temperament)
  
  useEffect(() => {
    dispatch(getTemperaments());
  },[dispatch])

  const handleTemperaments = (e) => {
    e.preventDefault();
    dispatch(getFilterTemperament(e.target.value))
  }

  return (
    <div>
      <select className="home-select" onChange={(e)=>handleTemperaments(e)}>
        {
          allTemperaments?.map((el, i) => {
            return (
              <option key={i} value={el.name}>{el.name}</option>
              )
          })
        }
      </select>
    </div>
  )
}

