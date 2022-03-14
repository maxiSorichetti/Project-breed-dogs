import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getFilterDog } from '../../redux/actions/index';
import './index.css';

export default function SearchBar() {
  const dispatch = useDispatch();
  const [text, setText] = useState("");

// function handleInput(e){
//     e.preventDefault();
//     console.log('text', text)
//     setText(e.target.value);
//   }
  const handleInput = (e) => {
    e.preventDefault();
    console.log('text', text)
    setText(e.target.value);
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('text', text)
    dispatch(getFilterDog(text));
    setText("");
  }

  return (
    <div className="search-container">
      <input className="search-inputs" onChange={(e)=>handleInput(e)} type="text" placeholder={text} value={text} />
      <button className="search-button" type="submit" onClick={(e) => handleSubmit(e)}>Buscar</button>
    </div>
  )
}

