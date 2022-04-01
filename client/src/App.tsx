import { useState } from 'react'
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';
import { Search, Take, Return, Author, Category } from './pages'
import { Home } from './pages'
import logo from './logo.svg'
import './App.css'

function App() {

  return (
    <BrowserRouter>
        <div className="App container text-center">
          <header className="App-header">
            <h1 className="display-1">School library</h1>
            <Routes>
                <Route path="/search" element={<Search />} />
                <Route path="/take" element={<Take />} />
                <Route path="/return" element={<Return />} />
                <Route path="/author/:authorName" element={<Author />} />
                <Route path="/category/:categoryName" element={<Category />} />
                <Route path="/" element={<Home /> } />
            </Routes>
          </header>
        </div>
    </BrowserRouter>
  )
}

export default App
