import Link from 'next/link'
import React from 'react'


const Hero = () => {
  return (
    <section
  className="bg-gray-200 px-6 py-16 text-center w-full bg-cover bg-center bg-no-repeat"
  style={{
    backgroundImage:
      "url('https://images.unsplash.com/photo-1542219550-37153d387c27?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
  }}
>
  <div className="max-w-4xl mx-auto space-y-8 px-6 sm:px-12 md:px-16 lg:px-24 bg-white/80 pb-10 pt-10 rounded-xl shadow-lg">

    <h1 className="text-4xl font-extrabold text-gray-900 leading-snug md:text-5xl">
      Find the Perfect Product for Every Occasion
    </h1>
    <p className="text-lg text-green-700 max-w-2xl mx-auto">
      Discover a curated selection of high-quality products designed to fit
      your lifestyle.
    </p>
    <Link
      href="/products"
      className="inline-block bg-gray-700 text-white text-lg font-semibold px-8 py-3 rounded-xl shadow-lg hover:bg-green-900 transition-all duration-300"
    >
      Shop Now
    </Link>
  </div>
</section>


  )
}

export default Hero