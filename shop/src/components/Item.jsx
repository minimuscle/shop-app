import React from 'react'
import { useParams } from 'react-router-dom'

export default function Item() {
  const { itemId } = useParams()
  return (
    <div>
      <h1>Item</h1>
      {itemId}
    </div>
  )
}
