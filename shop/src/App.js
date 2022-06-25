import './App.css'
import Shop from './views/pages/Shop'
import About from './views/pages/About'
import CreateShopItem from './views/admin/create/CreateShopItem'
import { Routes, Route } from 'react-router-dom'
import CardInfo from './views/pages/CardInfo'
import NoMatch from './views/pages/NoMatch'
import Product from './views/components/Product'
import Layout from './views/components/Layout'
import { ShoppingCartContext } from './views/context/ShoppingCartContext'

function App() {
  return (
    <ShoppingCartContext.Provider>
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

          {/* // TODO: Hide these behind a login wall */}
          <Route path='create' element={<CreateShopItem />} />

        </Route>



      </Routes>
    </ShoppingCartContext.Provider>

  );
}

export default App;
