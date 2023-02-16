

import MainNav from './components/MainNav'
import Footer from './components/Footer'
import Home from './pages/HomePage'
import Movies from './pages/MoviesPage'
import Error from './pages/ErrorPage';
import Documentation from './pages/DocumentationPage'

import Sidebar from './components/Sidebar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SingleMoviePage from './pages/SingleMoviePage';
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import React from 'react';
import "./App.css";



function App() {
  return (

    <>

      <MainNav />
      <Sidebar />
      <BrowserRouter>
        <Routes>

          <Route path='/' element={<Home />} />

          <Route path='/movies' element={<Movies />} />
          
          <Route path='/movie' element={<SingleMoviePage />} />
          <Route path='/documentation' element={<Documentation />} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>

          <Route path='*' element={<Error />} />
        </Routes>
        <Footer />
      </BrowserRouter>



    </>
  )
}

export default App;

