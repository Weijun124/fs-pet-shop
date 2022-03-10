const express = require("express");
const fs = require("fs");
const readPetsFile  = require("./util.js");//{readPetsFile:[function:readPetsfile]}
const app = express();

app.use(express.json())


app.get("/pets/", (req, res) => {
  readPetsFile((err, data) => {//so if i use readPetsFile here will be the function
    res.json(data);
  });
});


app.get("/pets/:index", (req, res) => {
  const {index}  = req.params;
  readPetsFile((err, data) => {
    if (!data[index]) {
      res.setHeader("Content-Type", "text/plain");
      res.status(404).send("Not Found");
    } else {
      res.json(data[index]);
    }
  });
})

  app.post("/pets",(req,res)=>{
    var newpet={};
    newpet.name=req.body.name;
    newpet.age=req.body.age;
    newpet.kind=req.body.kind;
    fs.readFile("pets.json","utf-8",(err, data) => {
      if(err){
        res.status(500);
        res.end('serverside')
      }else{
        var parsedata=JSON.parse(data)
        parsedata[parsedata.length]=newpet;
        let toWrite=JSON.stringify(parsedata);
        console.log(toWrite);
        fs.writeFileSync('./pets.json',toWrite);
        res.send(toWrite)
        res.end();
      }
      })
});

app.listen(8080);




// const express = require("express");
// const fs = require("fs");
// const app = express();

// app.get('/animals', (req, res) => {
//     // YOUR CODE HERE
//     fs.readFile("./cats.txt","utf8",function(err,data){
//         if(err){
//             throw err;
//         }else{
//             res.json(data)
//         }
//     })
// })

// app.listen(4000);