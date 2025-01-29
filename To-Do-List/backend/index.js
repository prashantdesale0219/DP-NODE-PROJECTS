const express = require("express");
const fs = require("fs");
const app = express();
const cors = require('cors');

app.use(cors())
app.use(express.json());


// Get Products
app.get("/getProductData", (req, res) => {
  fs.readFile("./db.json", "utf-8", (err, data) => {
    if (err) {
      res.send(err);
    } else {
      const newData = JSON.parse(data);
      fs.writeFile("./db.json", JSON.stringify(newData), (err) => {
        if (err) {
          res.send(err);
        } else {
          res.send(newData)
        }
      });
    }
  });
});

// Get Single Product Data
app.get("/getProductData/:id", (req, res) => {
  const {id} = req.params 
  fs.readFile("./db.json", "utf-8", (err, data) => {
    if (err) {
      res.send(err);
    } else {
      const newData = JSON.parse(data);
      const index = newData.findIndex(el=>el.id == id)
      if(index != -1){
        newData[index] = {...newData[index],...req.body}
        fs.writeFile("./db.json", JSON.stringify(newData), (err) => {
          if (err) {
            res.send(err);
          } else {
            res.send(newData[index])
          }
        });
      }
    
    }
  });
});


// Delete Product Data
app.delete('/deleteProduct/:id',(req,res)=>{
  const {id} = req.params //2
  fs.readFile('./db.json','utf-8',(err,data)=>{
    if(err){
      res.send(err)
      }else{
        let deleteData = JSON.parse(data)
        deleteData = deleteData.filter(el=>el.id != id)
          fs.writeFile('./db.json',JSON.stringify(deleteData),(err)=>{
            if(err){
              res.send(' product not deleted')
            }else{
              res.send(id)
            }
            })
      }
})
})


// Edit Product Data
app.put('/editProductData/:id',(req,res)=>{
    const {id} = req.params
    fs.readFile('./db.json','utf-8',(err,data)=>{
      if(err){
        res.send(err)
        }else{
          let newData = JSON.parse(data)
          const index = newData.findIndex(el=>el.id == id)
          if(index != -1){
            newData[index] = {...newData[index],...req.body}
            fs.writeFile('./db.json',JSON.stringify(newData),(err)=>{
              if(err){
                res.send('product not updated')
              }else{
                res.send(newData[index])
              }

            })
            }
}})
})

// Generate Id
function generateRandomId() {
  return Date.now() + Math.floor(Math.random() * 10000);
}


// Add Product Data
app.post('/addProduct',(req,res)=>{
  fs.readFile('./db.json','utf-8',(err,data)=>{
      if(err){
         res.send(err)
      }
      else{
          const newData = JSON.parse(data)
          req.body.id = generateRandomId();
          newData.push(req.body)
          fs.writeFile('./db.json',JSON.stringify(newData),(err)=>{
              if(err){
                  res.send(err)
              }
              else{
                  res.send("Product Added")}
          })

      }
  })
})


app.listen(8080, () => {
  console.log("server is running on port 8080");
});
