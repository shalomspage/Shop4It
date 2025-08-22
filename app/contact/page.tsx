import Spinner from '@/components/common/Spinner'
import React from 'react'

const ContactUs = () => {
  return (
   <div className="flex flex-col min-h-screen max-w-2xl gap-8 mx-auto p-6 text-center items-center justify-center">
    <Spinner lg />
    <p>Loading details...</p>
  </div>
  )
}

export default ContactUs