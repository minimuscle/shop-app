import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Items() {
  return (
    <div>
      <h1>Items</h1>
      <Outlet />
    </div>
  )
}
