import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Shop from './pages/Shop.jsx'
import Items from './pages/Items.jsx'
import Item from './components/Item.jsx'

export default function App() {
  return (
    <Routes>
      <Route index path="shop" element={<Shop />} />
      <Route path="item" element={<Items />}>
        <Route path=":itemId" element={<Item />} />
      </Route>
    </Routes>
  )
}
