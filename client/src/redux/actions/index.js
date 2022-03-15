import { GET_DOGS, POST_DOG, GET_DETAIL_DOG, GET_FILTER_DOG, GET_TEMPERAMENTS, GET_FILTER_TEMPERAMENT, ORDER_DOGS, PAGINATE_DOGS } from '../constants';
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
        console.log('res.data getallDogs', res.data)
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
        console.log('data temperaments action', data)
        dispatch({
          type:GET_TEMPERAMENTS,
          payload: data
        })
      // .catch(err => console.log('err', err))
      })
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
    console.log('newDog', newDog)
    return async function(dispatch){
      const {data} = await axios.post('http://localhost:3001/dogs/create', newDog)
      console.log('data reducer', data)
      return dispatch({
        type: POST_DOG,
      })
    } 
  }

  export function orderDogsAction(value){
    console.log('value order action', value)
    return {
      type: ORDER_DOGS,
      payload: value
    }
  }

  export function PaginateAction(value){
    console.log('value paginate action', value)
    return {
      type: PAGINATE_DOGS,
      payload: value
    }
  }

// export function postRecipes(newRecipe){
//   return async function(){
//     const {data} = await axios.post('http://localhost:3001/recipes/create',newRecipe);
//     console.log('action data post recipe', data)
//     return data;
//   }
// }

