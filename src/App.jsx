import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AccueilPage from './pages/accueilPage';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AccueilPage/>} />
      </Routes>            
    </BrowserRouter>
  );
}

export default App;