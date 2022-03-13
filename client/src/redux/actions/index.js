import { GET_DOGS, POST_DOG, GET_DETAIL_DOG } from '../constants';
import axios from 'axios';

  export function getAllDogs(){
    return async function(dispatch) {
      let res = await axios.get('http://localhost:3001/dogs');
      return dispatch({
        type: GET_DOGS,
        payload: res.data
      })
    }
  }
  
  export function getDogs(){
    return function (dispatch) {
      return fetch("http://localhost:3001/dogs")
      .then(response => response.json())
      .then(data => {
        dispatch({ type: "GET_DOGS", payload: data})
      })
      .catch(err => console.log('err', err))
    } 
  }

  // export function getDetailDog(idRaza){
  //   return async function(dispatch){
  //     return fetch(`http://localhost:3001/dogs/${idRaza}`)
  //     .then(response => {
  //       console.log('response', response)
  //       dispatch({
  //         type: GET_DETAIL_DOG,
  //         payload: response.json()
  //       })
  //     })
  //   }
  // }
  export function getDetailDog(idRaza){
    return function(dispatch){
      return fetch(`http://localhost:3001/dogs/${idRaza}`)
      .then(response => response.json())
      .then(data => {
        console.log('data detail action', data)
        dispatch({
          type:GET_DETAIL_DOG,
          payload: data
        })
      })
    }
  }

// export function postDogs(){
//   return {
//     type: POST_DOG,
//     payload: asyn
//   }
// } 

// export function postRecipes(newRecipe){
//   return async function(){
//     const {data} = await axios.post('http://localhost:3001/recipes/create',newRecipe);
//     console.log('action data post recipe', data)
//     return data;
//   }
// }

