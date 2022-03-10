const fs=require("fs");
function readPetsFile(callback){
    fs.readFile("pets.json","utf-8",(err,data)=>{
        if(err){
            callback(err);

        }else{
            const parseData=JSON.parse(data);//covert it to js object
            callback(null, parseData);
        }
    });
}
// console.log(readPetsFile);//==>[function:readPetsfile]
// console.log({readPetsFile});//==>{readPetsFile:[function:readPetsfile]}
module.exports=readPetsFile; //
//you can have multiple parameter
//module.exports={readPetsFile,writePetsFile.....etc};