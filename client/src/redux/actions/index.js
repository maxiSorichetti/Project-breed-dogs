import { GET_DOGS, POST_DOG, GET_DETAIL_DOG, GET_FILTER_DOG, GET_TEMPERAMENTS } from '../constants';
import axios from 'axios';

//API
//const getApiInfo_Axios =  () => {
// return axios.get("https://api.thedogapi.com/v1/breeds?api_key=" + API_KEY)
  // .then((result) => {
    // const apiInfo =  result.data.map((el) => {
      // return {

  export function getAllDogs(){
    return async function(dispatch) {
      try{
        let res = await axios.get('http://localhost:3001/dogs');
        return dispatch({
          type: GET_DOGS,
          payload: res.data
        })
      }catch(err) {
        console.log('err', err)
      }
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
      // .catch(err => console.log('err', err))
      })
    }
  }

  export function getTemperaments(){
    return function(dispatch){
      return fetch('http://localhost:3001/temperament')
      .then(response => response.json())
      .then(data => {
        console.log('data temperaments', data)
        dispatch({
          type:GET_TEMPERAMENTS,
          payload: data
        })
      // .catch(err => console.log('err', err))
      })
    }
  }

  export function getFilterDog(value){
    return {
      type: GET_FILTER_DOG,
      payload: value
    }
  }

  export function postDogs(newDog){
    console.log('newDog', newDog)
    return async function(dispatch){
      const {data} = await axios.post('http://localhost:3001/dogs/create', newDog)
      console.log('data reducer', data)
      return dispatch({
        type: POST_DOG,
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

