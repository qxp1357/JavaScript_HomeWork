import logo from './logo.svg';
import './App.css';
import styled from 'styled-components';
import React from 'react';
import {Route, Routes} from "react-router-dom";
import Intro from './view/intro';
import PostPage from './view/postPage';
import DetailPage from './view/detailPage';


function App() {

  return (
    <Routes>
      <Route path ="/" element ={<Intro/>}/>
      <Route path="/postPage/:userId" element={<PostPage/>}/>
      <Route path="/:userId/:index/:rawData" element={<DetailPage/>}/>
    </Routes>
  );
}

export default App;
