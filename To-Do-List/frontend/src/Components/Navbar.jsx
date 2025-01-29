import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='navbar'>
        <NavLink to={'/'}>Home</NavLink>
        <NavLink to={'/getProduct'}>Product</NavLink>
        <NavLink to={'/addProduct'}>Add Product</NavLink>
    </div>
  )
}

export default Navbar
