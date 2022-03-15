import { GET_DOGS, POST_DOG, GET_DETAIL_DOG, GET_FILTER_DOG, GET_TEMPERAMENTS, GET_FILTER_TEMPERAMENT, ORDER_DOGS, PAGINATE_DOGS } from '../constants';

const initialState = {
  dogs: [],
  filterDogs: [],
  temperament: [],
  detailDog: {},
}
{/* <h2>Temperamento: {dataDog.createdInDb ? dataDog.temperaments.map((e, i) => i === (dataDog.temperaments.length - 1) ? `${e.name} ` : `${e.name}, `) : dataDog.temperament && dataDog.temperament.split(" ").map(t => t)}</h2> */}


function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DOGS:
      console.log('action.payload', action.payload)
      return {
        ...state,
        dogs: action.payload,
        filterDogs: action.payload
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
      const infoFilterDogs = state.filterDogs    
      const filterDog = infoFilterDogs.filter(dog => dog.name.toLowerCase().includes(action.payload));
      return {
        ...state,
        dogs: filterDog
      }
      case GET_TEMPERAMENTS:
        return {
          ...state,
          temperament: action.payload
        }
      case GET_FILTER_TEMPERAMENT:
        const infoDogs = state.filterDogs    
        const filterUndefined = infoDogs.filter(e => e.temperament !== undefined)
        const filterDogTemperament = filterUndefined.filter(el => el.temperament.includes(action.payload))
        return {
          ...state,
          dogs: filterDogTemperament
        }
      case ORDER_DOGS:
        const infoDogsSort = state.filterDogs    
        const orderDogs = action.payload === "ASC" ?
          infoDogsSort.sort(function(a, b) {
            if(a.name > b.name){
              return 1;
            }
            if(a.name < b.name){
              return -1;
            }
            return 0
          }) :
          infoDogsSort.sort(function(a, b) {
            if(a.name > b.name){
              return -1;
            }
            if(a.name < b.name){
              return 1;
            }
            return 0
          })
          console.log('orderDogs reducer', orderDogs)
          return {
            ...state,
            dogs: orderDogs
          }
        case PAGINATE_DOGS:
          console.log('reducer paginate', action.payload)
          return {
            ...state,
            dogs: action.payload
          }
      default:
        return state
  }
}

export default rootReducer;