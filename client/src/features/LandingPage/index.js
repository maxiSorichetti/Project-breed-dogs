import './index.css';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="ContainerLanding">
      <h2>Queres conocer mas sobre razas de perros?</h2>
      <Link to="/home">
        <button className="ButtonHome">Ingresar al Inicio</button>
      </Link>
    </div>
  )
};

export { LandingPage }