import { GET_DOGS, POST_DOG, GET_DETAIL_DOG } from '../constants';

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
      default:
        return state
  }
}

export default rootReducer;