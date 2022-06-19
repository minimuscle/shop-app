import './App.css'
import Shop from './views/shop/Shop'
import About from './views/About'
import CreateShopItem from './views/admin/create/CreateShopItem'
import { Routes, Route } from 'react-router-dom'
import CardInfo from './views/shop/CardInfo'
import NoMatch from './views/NoMatch'
import Product from './views/shop/Product'

function App() {
  return (
    <Routes>
      <Route index element={<Shop />} />
      <Route path="about" element={<About />} />
      <Route path="*" element={<NoMatch />} />

      {/** Routes for the product */}
      <Route path="shop" element={<Shop />} />
      <Route path="shop/product" element={<Product />}>
        <Route path=":productId" element={<CardInfo />} />
      </Route>

      {/* // TODO: Hide these behind a login wall */}
      <Route path='create' element={<CreateShopItem />} />


    </Routes>
  );
}

export default App;
