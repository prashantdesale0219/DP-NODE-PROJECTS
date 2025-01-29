import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../Pages/HomePage'
import Product from './Product'
import EditProduct from './EditProduct'
import AddProduct from './AddProduct'
import DescriptionPage from './DescriptionPage'

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/getProduct' element={<Product/>}/>
        <Route path='/description/:id' element={<DescriptionPage/>}/>
        <Route path='/editProduct/:id' element={<EditProduct/>}/>
        <Route path='/addProduct' element={<AddProduct/>}/>
      </Routes>
    </div>
  )
}

export default AllRoutes
