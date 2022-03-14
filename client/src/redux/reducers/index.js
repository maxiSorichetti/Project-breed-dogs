import { GET_DOGS, POST_DOG, GET_DETAIL_DOG, GET_FILTER_DOG, GET_TEMPERAMENTS } from '../constants';

const initialState = {
  dogs: [],
  filterDogs: [],
  temperaments: [],
  detailDog: {},
}

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DOGS:
      console.log('action.payload', action.payload)
      return {
        ...state,
        dogs: action.payload
      }
    case GET_DETAIL_DOG:
      console.log('action.payload reducer', action.payload)
      return {
        ...state,
        detailDog: action.payload
      }
    case POST_DOG:
      return {
        ...state
      }
    case GET_FILTER_DOG:
      const allDogs = state.dogs
      const filterDog = allDogs.filter(dog => dog.name.toLowerCase().includes(action.payload));
      return {
        ...state,
        dogs: filterDog
      }
    case GET_TEMPERAMENTS:
      return {
        ...state,
        temperaments: action.payload
      }
      default:
        return state
  }
}

export default rootReducer;