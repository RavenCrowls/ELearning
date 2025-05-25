import React from 'react'
import Soldcourses from './Soldcourses'
import Paymentdetail from './Paymentdetail'

const Payment = () => {
  return (
    <div className='flex flex-row gap-6 bg-white border border-gray-200 rounded-lg shadow-sm p-6'>
        <Soldcourses />
        <Paymentdetail />
      
    </div>
  )
}

export default Payment
