import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTemperaments, getFilterTemperament } from '../../redux/actions';

export class Temperament extends Component {

  componentDidMount() {
    this.props.getTemperaments();
  }
//creo el metodo de la clase para manejar el evento, y queda bindeado en el callback =>
  handleTemperaments = (e) => {
    e.preventDefault();
    this.props.getFilterTemperament(e.target.value);
  }
  
  render() {

    return (
      <div>
        <select className="home-select" onChange={(e)=>this.handleTemperaments(e)}>
        {
          this.props.temperament?.map((el, i) => {
            return (
              <option key={i} value={el.name}>{el.name}</option>
              )
          })
        }
      </select>
    </div>
    )
  }
};

export const mapStateToProps = (state) => {
  return {
    temperament: state.temperament
  }
};

export const mapDispatchToProps = (dispatch) => {
  return {
    getTemperaments: () => {
      dispatch(getTemperaments());
    },
    getFilterTemperament: (value) => {
      dispatch(getFilterTemperament(value));
    }
  }
};

//El mapStateToProps y mapDispatchToProps se ocupa de su tienda Redux state y dispatch, respectivamente. state y dispatch se proporcionará a sus funciones mapStateToProps o mapDispatchToProps como el primer argumento.
export default connect(mapStateToProps, mapDispatchToProps)(Temperament);