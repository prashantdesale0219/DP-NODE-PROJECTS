import axios from 'axios'
import React, { useState } from 'react'

const AddProduct = () => {
  const initialData= {
    id:'',
    title:'',
    price:0,
    description:'',
    category:'',
    image:''
  }
  const [formData,setFormData] = useState(initialData)
  const handleChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }
  const {title,image,category,description,price}=formData
  const handleSubmit=(e)=>{
    e.preventDefault()
    axios.post('http://localhost:8080/addProduct',formData).then((res)=>{setFormData(res.data)
      alert('data added')
    }).catch(err=>console.log(err))
  }
  return (
    <div>
      <h1  style={{textAlign:"center",paddingTop:"20px"}}>ADD PRODUCT</h1>
       <form onSubmit={(e)=>handleSubmit(e)}>
          <input type="text" placeholder="Image" name='image' value={image} onChange={(e)=>handleChange(e)}/> 
          <input type="text" placeholder="title" name='title' value={title} onChange={(e)=>handleChange(e)}/> 
          <select  onChange={(e)=>handleChange(e)} value={category} name='category'>
            <option>select Your Category</option>
            <option value={"men's clothing"}>men's clothing</option>
            <option value={"jewelery"}>jewelery</option>
            <option value={"electronics"}>electronics</option>
            <option value={"women's clothing"}>women's clothing</option>
          </select>
          <input type="text" placeholder="Price" name='price' value={price} onChange={(e)=>handleChange(e)}/>
          <input type="text" placeholder="description" name='description' value={description} onChange={(e)=>handleChange(e)}/> 
          <input type="submit"/>
        </form>
    </div>
  )
}

export default AddProduct
