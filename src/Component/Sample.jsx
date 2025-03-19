import React from 'react'


function Sample() {
  return (
    <nav className="bg-green-600 p-4">
  <div className="container mx-auto flex justify-between items-center">
    <h1 className="text-black text-2xl font-bold">MyApp</h1>
    <ul className="hidden md:flex space-x-6">
      <li><a href="#" className="text-[#572552] bg-[#877788]">Home</a></li>
      <li><a href="#" className="text-white">About</a></li>
      <li><a href="#" className="text-white">Contact</a></li>
    </ul>
    <button className="md:hidden text-white">☰</button>
  </div>
</nav>

  )
}

export default Sample
