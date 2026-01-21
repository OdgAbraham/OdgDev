import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AccueilPage from './pages/accueilPage';
import Convertisseur from './pages/Convertisseur';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AccueilPage/>} />
        <Route path="/convertisseur" element={<Convertisseur/>} />
      </Routes>            
    </BrowserRouter>
  );
}

export default App;