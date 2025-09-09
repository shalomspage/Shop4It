import React from 'react'
import OrderContainer from './OrderContainer'

const PurchasedOrder = () => {
  return (
    <div className="h-full">
      <p className="font-semibold text-2xl max-sm:text-[16px] text-gray-800 my-4 text-center">
        Purchased Orders
      </p>

      <OrderContainer />
    </div>
  )
}

export default PurchasedOrder