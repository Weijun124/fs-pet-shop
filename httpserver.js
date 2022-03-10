const http = require("http");
const fs = require("fs");
const { nextTick } = require("process");

const petRegExp = /^\/pets\/(.*)$/;
function readPetsFile(callback){
  fs.readFile('./pets.json',"utf-8",(err,data)=>{
    if(err) callback(err); //callback==>asynchronous method rather than return as synchronous
    callback(null,JSON.parse(data));
  })
}

const server = http.createServer((req, res) => {
 
  if (req.method === "GET" && petRegExp.test(req.url)) {
    const index = req.url.match(petRegExp)[1];
//var index = req.url.match(petRegExp)==>shows as array[/pets/1,"1",index:0,input.......] so you only need index[1]value
    readPetsFile((err,data)=>{ //this data already convert to parsedata
      if(err){
        res.statusCode=500;
        res.statusMessage="server side wrong";
        res.end();
      }
        if(!data[index]){
        res.statusCode=404;
        res.setHeader("Content-Type","text/plain")
     
        res.end("Not Found");
      }
      else{
        res.setHeader("Content-Type","application/json");//?find meaning of setHeader
        // const parseData=JSON.parse(data);//change the data as JS object
        // console.log(typeof parseData)//objecr which you know in this case is array
        // console.log(typeof data); //string
        res.write(JSON.stringify(data[index]));//get the value we want,then transfer to JSON STRING type for server display==>does not works
        // res.end(JSON.stringify(parseData[index]));
        res.end()
      }
    })
  }if(req.method==="POST"&&req.url==="/pets/post"){
      readPetsFile((err,data)=>{
     
       req.text='';
        req.setEncoding('utf8')
        req.on('data',(chunk)=>{
          req.text+=chunk;
          console.log(req.text)})

          



        // req.body={};    need middleware
        // req.setEncoding('utf8')
        // req.on('data',(chunk)=>{
        //   req.body+=chunk;
        //   console.log(req.body),'utf8'})






        // req.text='';
        // req.setEncoding('utf8')
        // req.on('data',(chunk)=>{
        //   req.text+=chunk;
        //   console.log(req.text),'utf8'})
        }
        })
      }
  
});

server.listen(8080);
