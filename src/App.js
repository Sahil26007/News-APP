import './App.css';


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';

export default class App extends Component {
  pagesize = "6"
  render() {
    return (
      <Router>
         <Navbar/>
      <Routes>
          <Route exact path='/' element={<News key="" pagesize= {this.pagesize} />} />
          <Route exact path='/sports' element={<News key="sports"pagesize= {this.pagesize} category = 'sports' />} />
          <Route exact path='/general' element={<News key="general" pagesize= {this.pagesize} category = 'general' />} />
          <Route exact path='/business' element={<News key="business" pagesize= {this.pagesize} category = 'business' />} />
          <Route exact path='/science' element={<News key="science" pagesize= {this.pagesize} category = 'science' />} />
          <Route exact path='/health' element={<News key="health" pagesize= {this.pagesize} category = 'health' />} />
          <Route exact path='/entertainment' element={<News key="entertainment" pagesize= {this.pagesize} category = 'entertainment' />} />
          <Route exact path='/technology' element={<News key="technology" pagesize= {this.pagesize} category = 'technology' />} />
      
      </Routes>
    </Router>
    )
  }
}
