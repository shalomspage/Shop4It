'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import SearchForm from './SearchForm'
import SearchButton from './SearchButton'
import NavItems from './NaveItems'
import MobileNavbar from './MobileNavBar'



const NavBar = () => {

  const [showSearchForm, setShowSearchForm] = useState(false);

  const handleSearch = () => {
    setShowSearchForm((curr) => !curr);
  };
  return (
    <>
       <nav className="bg-[whitesmoke] sticky top-0 z-20 w-full py-4">
        <div className="flex justify-between items-center main-max-width mx-auto padding-x">
            <Link href='/'>
             <h1 className='text-2xl font-extrabold text-gray-900'>Loms-Shop</h1>
            </Link> 
            <div className='max-lg:hidden'>
              <SearchForm/>
            </div>
            <div className='max-lg:flex hidden'>
                  <SearchButton
              handleSearch={handleSearch}
              showSearchForm={showSearchForm}
            />
            </div>
            <div className='max-md:hidden'>
               <NavItems />
            </div>
            <div className='max-md:block hidden'>
                 <MobileNavbar />
            </div>
        </div>
       </nav>
         {showSearchForm && (
        <div className="w-[300px] mx-auto mt-4 max-lg:block hidden">
          <SearchForm />
        </div>
      )}
   </>
  )
}

export default NavBar