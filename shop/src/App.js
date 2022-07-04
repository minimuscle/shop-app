import React from 'react'
import './App.css'
import Shop from './views/pages/Shop'
import About from './views/pages/About'
import { Routes, Route } from 'react-router-dom'
import CardInfo from './views/pages/CardInfo'
import NoMatch from './views/pages/NoMatch'
import Product from './views/components/Product'
import Layout from './views/components/Layout'
import Cart from './views/pages/Cart'
import AddItem from './views/admin/create/AddItem'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Shop />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<NoMatch />} />

        {/** Routes for the product */}
        <Route path="shop" element={<Shop />} />
        <Route path="shop/product" element={<Product />}>
          <Route path=":productId" element={<CardInfo />} />
        </Route>

        <Route path="cart" element={<Cart />} />

        {/* // TODO: Hide these behind a login wall */}
        <Route path='new' element={<AddItem/>} />

      </Route>
    </Routes>

  )
}

export default App
