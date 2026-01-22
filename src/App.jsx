import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AccueilPage from './pages/accueilPage';
import Convertisseur from './pages/Convertisseur';
import ConverterPicture from './pages/ConverterPicture';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AccueilPage/>} />
        <Route path="/convertisseur" element={<Convertisseur/>} />
        <Route path="/co/image" element={<ConverterPicture/>} />
      </Routes>            
    </BrowserRouter>
  );
}

export default App;