import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Product = () => {
  const [data,setData] = useState([])
  const getData = ()=>{
    axios.get('http://localhost:8080/getProductData').then(res=>setData(res.data)).catch(err=>console.log(err))
  }

  const deleteData = (id)=>{
    axios.delete(`http://localhost:8080/deleteProduct/${id}`).then(res=>getData()).catch(err=>console.log(err))
  }
  useEffect(()=>{
    getData()
  },[])
  return (
  <div>
    <h1>To-Do-List</h1>
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Title</th>
          <th>Remove</th>
          <th>Edit</th>
         
        </tr>
      </thead>
      <tbody>
        {
          data.map((el)=>(
            <tr key={el.id}>
              <td>{el.id}</td>
              <td><Link to={`/description/${el.id}`}>{el.title}</Link></td>
              <td><button onClick={()=>deleteData(el.id)}>Remove</button></td>
              <td><Link to={`/editProduct/${el.id}`}>Edit</Link></td>
            </tr>
          ))
        }
      </tbody>
    </table>
  </div>
  )
}

export default Product
