import './App.css'
import Shop from './views/shop/Shop'
import About from './views/About'
import CreateShopItem from './views/admin/create/CreateShopItem'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Shop />} />
      <Route path="about" element={<About />} />
      <Route path="products/product" element={<Shop />} />

      {/* // TODO: Hide these behind a login wall */}
      <Route path='create' element={<CreateShopItem />} />


    </Routes>
  );
}

export default App;
