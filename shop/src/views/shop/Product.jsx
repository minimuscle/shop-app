import React from 'react'
import { Outlet } from 'react-router-dom'

function Product() {
  return (
    <div>
      {/* // TODO: Create a overall style for this page for each card info, with the CardInfo page only having the mapping function*/}
      <Outlet />
    </div>
  )
}

export default Product
