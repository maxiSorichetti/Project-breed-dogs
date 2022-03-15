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
    console.log('e.target.value', e.target.value)
    e.preventDefault();
    dispatch(getFilterTemperament(e.target.value))
  }

  console.log('allTemperaments', allTemperaments)
  return (
    <div>
      <select onChange={(e)=>handleTemperaments(e)}>
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

