import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllDogs, PaginateAction } from '../../redux/actions';

export default function Paginate(){
  const dispatch = useDispatch();
  const allDogs = useSelector(state => state.dogs)
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsInPage, setDogsInPage] = useState(8);
  const indexOfLastDog = currentPage * dogsInPage;
  const indexOfFirstDog = indexOfLastDog - dogsInPage;
  const currentDogs = allDogs?.slice(indexOfFirstDog, indexOfLastDog);
  
  const pageNumbers = [];
  for(let i = 0; i <= Math.ceil(allDogs.length/dogsInPage); i++) {
    pageNumbers.push(i+1)
  }
  console.log('pageNumbers', pageNumbers)

useEffect(() => {
  dispatch(getAllDogs());
},[dispatch]);

const handleInput = (e) => {
  console.log('e.target.name', e.target.name)
  e.preventDefault();
  setCurrentPage(e.target.name)
  PaginateAction(currentDogs)
}
console.log('currentPage', currentPage)
console.log('curentDogs', currentDogs)

  return (
    <nav>
      <ul>
        {
          pageNumbers?.map(e => (
              <button name={e} onClick={(e)=>handleInput(e)}>{e}</button>
          ))
        }
      </ul>
    </nav>
  )
}