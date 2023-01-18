import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'

import Footer from './components/layout/footer/Footer'
import Header from './components/layout/header/Header'
import Home from './components/pages/home/Home'
import Catalog from './components/pages/catalog/Catalog'

import './App.css'

function App() {

  return (
    <div className="App">

      <Header/>

      <div className="main">

        <Routes>
          <Route path="/" element={<Home/>}/>
          {/* <Route path="/catalog" element={<Catalog />}/> */}
        </Routes>

      </div>

      <Footer/>

    </div>
  )
}

export default App
