const http=require("http");
const fs=require('fs');
const petRegExp = /^\/pets\/(.*)$/;

const servers=http.createServer((req,res)=>{
    if(req.method==='GET'&&req.url.test(petRegExp)){
        console.log(req.url.match(petRegExp));
        const index=req.url.match(petRegExp)[1];
        //var index = req.url.match(petRegExp)==>shows as array[/pets/1,"1",index:0,input.......] so you only need index[1]value
        fs.readFile('./pets.json','utf8',function(err,data){
            if(err){
                throw err;
            }if(index<0||index>1){
                res.statusCode(500);
                res.statusMessage("......");
                res.end();
            }else{
                res.setHeader("Content");
                res.write
            }
        })

    }
}