const http=require("http")
const fs = require('fs')
const server=http.createServer((req,res)=>{
    console.log(req.url)
    if(req.method == "GET" && req.url == "/home")
    {
        res.end('<h1>This Is Home Page</h1>')
    }
    else if(req.method == "GET" && req.url == "/about"){
        res.end('<h1>This is about page</h1>')
    }
    else if(req.method == "GET" && req.url == "/getProductData"){
        fs.readFile('./db.json','utf-8',(err,data)=>{
            if(err){
                console.log(err)
            }
            else{
                const productsData = JSON.parse(data).products
                res.end(JSON.stringify(productsData))
            }
        })
    }
    else if(req.method == "GET" && req.url == "/user"){
        fs.readFile('./db.json','utf-8',(err,data)=>{
            if(err){
                console.log(err)
            }
            else{
                const userData = JSON.parse(data).user
                res.end(JSON.stringify(userData))
            }
        })
    }
    else{
        res.end('<h1>Page NOt Found</h1>')
    }
})

server.listen(8080,()=>{
    console.log("server is running")
})