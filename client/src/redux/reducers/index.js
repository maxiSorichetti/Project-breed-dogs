import { GET_DOGS, POST_DOG, GET_DETAIL_DOG, GET_FILTER_DOG, GET_TEMPERAMENTS, GET_FILTER_TEMPERAMENT} from '../constants';

const initialState = {
  dogs: [],
  filterDogs: [],
  temperament: [],
  detailDog: {},
}

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DOGS:
      return {
        ...state,
        dogs: action.payload,
      }
    case GET_DETAIL_DOG:
      return {
        ...state,
        detailDog: action.payload
      }
    case POST_DOG:
      return {
        ...state
      }
    case GET_FILTER_DOG:
      return {
        ...state,
        filterDogs: action.payload
      }
      case GET_TEMPERAMENTS:
        return {
          ...state,
          temperament: action.payload
        }
      case GET_FILTER_TEMPERAMENT:
        const infoDogs = [...state.dogs]    
        const filterUndefined = infoDogs.filter(e => e.temperament !== undefined)
        const filterDogTemperament = filterUndefined.filter(el => el.temperament.includes(action.payload))
        return {
          ...state,
          dogs: filterDogTemperament
        }

      default:
        return state
  }
}

export default rootReducer;

      // case ORDER_DOGS:
      //   const infoDogsSort = [
      //     ...state.filterDogs
      //   ]    
      //   const orderDogs = action.payload === "ASC" ?
      //     infoDogsSort.sort(function(a, b) {
      //       if(a.name > b.name){
      //         return 1;
      //       }
      //       if(a.name < b.name){
      //         return -1;
      //       }
      //       return 0
      //     }) :
      //     infoDogsSort.sort(function(a, b) {
      //       if(a.name > b.name){
      //         return -1;
      //       }
      //       if(a.name < b.name){
      //         return 1;
      //       }
      //       return 0
      //     })
      //     console.log('orderDogs reducer', orderDogs)
      //     return {
      //       ...state,
      //       dogs: orderDogs
      //     }