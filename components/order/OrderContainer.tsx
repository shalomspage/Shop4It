import React from 'react'
import IndividualOrder from './IndividualOrder'

const OrderContainer = () => {
  return (
    <div className="w-full h-full overflow-y-auto space-y-6 rounded-md">
      <IndividualOrder />
      <IndividualOrder />
      <IndividualOrder />
    </div>
  )
}

export default OrderContainer