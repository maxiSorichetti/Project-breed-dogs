import { GET_DOGS, POST_DOG, GET_DETAIL_DOG, GET_FILTER_DOG, GET_TEMPERAMENTS, GET_FILTER_TEMPERAMENT} from '../constants';
import axios from 'axios';


  export function getAllDogs(){
    return async function(dispatch) {
        let res = await axios.get('http://localhost:3001/dogs');
        console.log('res.data', res.data)
        return dispatch({
          type: GET_DOGS,
          payload: res.data
        })
    }
  }
  
  //me traigo los dogs con fetch y promesa
  // export function getDogs(){
  //   return function (dispatch) {
  //     return fetch("http://localhost:3001/dogs")
  //     .then(response => response.json())
  //     .then(data => {
  //       dispatch({ type: "GET_DOGS", payload: data})
  //     })
  //     .catch(err => console.log('err', err))
  //   } 
  // }

  export function getDetailDog(idRaza){
    return function(dispatch){
      return fetch(`http://localhost:3001/dogs/${idRaza}`)
      .then(response => response.json())
      .then(data => {
        dispatch({
          type:GET_DETAIL_DOG,
          payload: data
        })
      }).catch(err => console.log('err', err))
    }
  }

  export function getTemperaments(){
    return function(dispatch){
      return fetch('http://localhost:3001/temperament')
      .then(response => response.json())
      .then(data => {
        dispatch({
          type:GET_TEMPERAMENTS,
          payload: data
        })
      }).catch(err => console.log('err', err))
    }
  }
  
  export function getFilterTemperament(value){
    return {
      type: GET_FILTER_TEMPERAMENT,
      payload: value
    }
  }

  export function getFilterDog(value){
    return {
      type: GET_FILTER_DOG,
      payload: value
    }
  }

  export function postDogs(newDog){
    return async function(dispatch){
      const {data} = await axios.post('http://localhost:3001/dogs/create', newDog)
      return dispatch({
        type: POST_DOG,
      })
    } 
  }

  // export function orderDogsAction(value){
  //   console.log('value order action', value)
  //   return {
  //     type: ORDER_DOGS,
  //     payload: value
  //   }
  // }