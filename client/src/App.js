import './App.css';
import { Routes, Route } from 'react-router-dom';
import { LandingPage } from './features/LandingPage/index';
import { Home } from './features/Home/index';
import { DetailDog } from './features/DetailDog/index';
import { CreateDog } from './features/CreateDog/index';
import { Card } from './components/Card';
import Temperament from './components/Temperament/index';
import Paginate from './components/Paginate/index';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" exact={true} element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/details/:idRaza" element={<DetailDog />} />
        <Route path="/create" element={<CreateDog />} />
        <Route path="/card" element={<Card />} />
        <Route path="/temperament" element={<Temperament />} />
        <Route path="/paginate" element={<Paginate />} />
      </Routes>
      {/* <h1>Henry Dogs</h1> */}
    </div>
  );
}

export default App;
