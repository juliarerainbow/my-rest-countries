//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";
import 'primeicons/primeicons.css';
import Home from './pages/Home'
import NoPage from './pages/NoPage'
import {Routes, Route } from "react-router-dom";
import Header from './components/Header';
import { PrimeReactProvider } from 'primereact/api';


function App() {

  return (
    <PrimeReactProvider>
    <div >
      <Header/>
      <div style={{color:'#FF0000',marginLeft:'30px',marginRight:'30px'}}>
          <Routes>
            <Route index element={<Home />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
      </div>
    </div>
    </PrimeReactProvider>
  );
}

export default App;