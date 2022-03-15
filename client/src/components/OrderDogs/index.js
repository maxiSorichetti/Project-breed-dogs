import { useDispatch } from 'react-redux';
import { orderDogsAction } from '../../redux/actions';

export default function OrderDogs(){
  const dispatch = useDispatch();

  const handleInput = (e) => {
    console.log('e.target.value', e.target.value)
    e.preventDefault();
    dispatch(orderDogsAction(e.target.value))
  }

  return (
    <div>
      <select onChange={(e)=>handleInput(e)}>
        <option value="">Seleccionar orden</option>
        <option value="ASC">Ascendente</option>
        <option value="DESC">Descentende</option>
      </select>
    </div>
  )
}
