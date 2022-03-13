import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers/index";
import thunk from "redux-thunk";

// Esta línea instancia nuestro store central de Redux.
// La función `createStore` recibe el reducer
// que es responsable de la actualización del store , junto
//con cualquier estado inicial con el que queramos que
//empiece el store (que en este caso es ninguno).
//applyMiddleware es un metodo de redux
//thunk es un middleware creado por la comunidad, me sirve para trabajar las llamadas async que hago en el action, frena la llamada a la api del dispatch, va a esperar, y cuando detecta que que hay una repsuesta, ahi le da acceso para que vaya al reducer
//compose es la libreria que hace automatico el window
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
