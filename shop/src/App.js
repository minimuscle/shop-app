import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Shop from './pages/Shop'
import Items from './pages/Items'
import Item from './components/Item'
import Layout from './context/Layout'
import NoMatch from './pages/NoMatch'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="*" element={<NoMatch />} />
        <Route index path="shop" element={<Shop />} />
        <Route path="item" element={<Items />}>
          <Route path=":itemId" element={<Item />} />
        </Route>
      </Route>
    </Routes>
  )
}
