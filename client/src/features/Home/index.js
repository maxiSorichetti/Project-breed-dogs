import './index.css';

const Home = () => {

  return (
    <div className="ContainerHome">
      <div className="Nav">
        <h2>Estoy en Home NAV</h2>
        <input type="text" /> 
      </div>
      <div className="Filters">
        <h2>filtros, Temperamento - raza (api o creado por nos) - asd o desc (por orden alfabetico o peso)</h2>
      </div>
      <div className="Cards">
        <h2>Espacio para las cards</h2>
      </div>
      <div className="Paginate">
        Paginado
      </div>
    </div>
  )
};

export { Home }