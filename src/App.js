import { Route, Routes } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import Articles from './pages/Articles/articles';
import Gallery from './pages/Gallery/Gallery';
import ChronicleVOL2 from './pages/articles/chronicle-02';
import LegendV0L2 from './pages/articles/Aleah';
import LegendVOl3 from './pages/articles/Legends-4'
import DefaultArticle from './compoments/GenericArticle/GenericArticle';
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from './firebase'
import LifeLover from './pages/articles/Chronicle-lifeLover';
import Vertigo from './pages/articles/Vertigo-archive';


function App() {
  // Initialize Firebase

  {/**firestore */}

   

  return (
    <>
        <Routes>
      <Route path='/' element ={<Home/> }/>
      <Route path='/articles-page' element={<Articles />} />
      <Route path='/Art-Gallery-page' element={<Gallery />} />
      <Route path='/Chronicles_of_the_underworld_vol-2_archive' element={<ChronicleVOL2 />} />
      <Route path='/legends-2-archive' element={<LegendV0L2 />} />
      <Route path='/legends-4-archive' element={<LegendVOl3 />} />
      <Route path='//Vertigo-archive' element={<Vertigo />} />

      <Route path='/article/:name' element={<DefaultArticle/>}/>
      
    </Routes>

    </>
  );
}

export default App;
