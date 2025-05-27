import React from 'react'
import Soldcourses from './Soldcourses'
import Paymentdetail from './Paymentdetail'

const Payment = () => {
  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className='flex flex-row gap-6'>
        <Paymentdetail />
        <Soldcourses />
        
      </div>
      
      
    </div>
  )
}

export default Payment
