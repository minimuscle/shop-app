import './App.css'
import Shop from './views/Shop'
import About from './views/About'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Shop />} />
      <Route path="about" element={<About />} />
    </Routes>
  );
}

export default App;
