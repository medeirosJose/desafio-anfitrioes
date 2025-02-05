import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Liked from './pages/Liked';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import HouseDetail from './pages/HouseDetail';

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <div id='root'>
        <Header />
        <div className='main-content'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/liked' element={<Liked />} />
            <Route path='/house/:id' element={<HouseDetail />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
};
