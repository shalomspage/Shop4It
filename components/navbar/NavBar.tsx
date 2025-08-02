import Link from 'next/link'
import React from 'react'

const NavBar = () => {
  return (
    
       <nav className="bg-[whitesmoke] sticky top-0 z-20 w-full py-4">
        <div className="flex justify-between items-center main-max-width mx-auto padding-x">
            <Link href='/'>
             <h1 className='text-2xl font-extrabold text-gray-900'>Loms-Shop</h1>
            </Link>

          

        </div>
       </nav>
   
  )
}

export default NavBar