import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const DescriptionPage = () => {
    const {id} = useParams()
    const initialData = {
        title: '',
        category:'',
        description: '',
        price: '',
        image: ''
    }
    const [singleData,setSingleData] = useState(initialData)
    const getSingleData = ()=>{
        axios.get(`http://localhost:8080/getProductData/${id}`)
        .then(res=>setSingleData(res.data))
        .catch(err=>console.log(err))
    }
    const {title,category,description,price,image}=singleData

    useEffect(()=>{
        getSingleData()
    },[id])
  return (
    <div className='descriptionBox'>
      <h1>{title}</h1>
      <img src={image} alt={title} height={300} width={300} />
      <h3>{price}</h3>
      <h3>{category}</h3>
      <p>{description}</p>

    </div>
  )
}

export default DescriptionPage
