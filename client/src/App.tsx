import { useState } from 'react'
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';
import { Home, Search, Take, Return, Author, Category } from './pages'
import { Navigation } from './components/Navigation'
import logo from './logo.svg'
import './App.css'

function App() {

  return (
    <BrowserRouter>
        <header className="App-header">
            <Navigation />
        </header>
        <div className="App container text-center" style={{marginTop: '5em'}}>
            <Routes>
                <Route path="/search" element={<Search />} />
                <Route path="/take" element={<Take />} />
                <Route path="/return" element={<Return />} />
                <Route path="/author/:authorName" element={<Author />} />
                <Route path="/category/:categoryName" element={<Category />} />
                <Route path="/" element={<Home /> } />
            </Routes>
        </div>
    </BrowserRouter>
  )
}

export default App
