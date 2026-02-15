import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
// import Login from './Component/Login';
import { useEffect, useState } from 'react';
import ProductPage from './Pages/ProductPage/ProductPage'
import ProductTable from './Pages/ProductPage/ProductTable'
import HomeAbout from './Pages/Aboutus/HomeAbout';
import AboutTeam from './Pages/Aboutus/AboutTeam';
import Testimonial from './Pages/Aboutus/Testimonial';
import Dashboard from './Dashboard/Dashboard';
import Order from './Pages/Order/Order';

function App() {

  const [login, setlogin] = useState(false);

  useEffect(() => {
    setlogin((localStorage.getItem("login")))
  }, [login])

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={< Dashboard />} />
          <Route path='/aboutus' element={< HomeAbout />} />
          <Route path='/team' element={< AboutTeam />} />
          <Route path='/testimonials' element={< Testimonial />} />
          <Route path='/addproduct' element={< ProductPage />} />
          <Route path='/addproduct/:id' element={< ProductPage />} />
          <Route path='/product' element={< ProductTable />} />
          <Route path='/orders' element={< Order />} />
        </Routes>
        {/* <div className="main_form d-flex">
          {
            login ?
              <>
                <Sidebar />
                <div className="main-content p-2 p-lg-4 mt-5 mt-lg-0 mt-md-0 flex-grow-1">
                  <Routes>
                    <Route path='/' element={<ProductPage />} />
                    <Route path='/ProductData' element={<MainProductData />} />
                  </Routes>
                </div>
              </>
              :
              <>
                <div className="main_login flex-grow-1">
                  <Routes>
                    <Route path='/' element={<Login setlogin={setlogin} />} />
                    <Route path='*' element={<Login setlogin={setlogin} />} />
                  </Routes>
                </div>
              </>
          }
        </div> */}
      </BrowserRouter>
    </>
  );
}

export default App;