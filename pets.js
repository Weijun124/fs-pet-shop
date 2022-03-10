const fs=require('fs');
var subcommand=process.argv[2];


fs.readFile("./pets.json",'utf8',function(err,data){
    let parseddata=JSON.parse(data);
   
    if(err){
        console.error("Usage: node pets.js [read | create | update | destroy]")
        process.exit(1);
    }if(subcommand==="read"){
        let number=Number.parseInt(process.argv[3]);
        if(!number){
            console.log(parseddata);
            process.exit(1);
        }
        if(typeof number!=="number"){
            console.error("Usage: node pets.js read INDEX")
            process.exit(1);
        }
        if(parseddata[number]===undefined){
            console.error("Usage: node pets.js read INDEX")
            process.exit(1);
        }else{
            console.log(parseddata[number]);
        }
    }if(subcommand==='create'){
        let newpets={};
        let petage=Number.parseInt(process.argv[3]);
        let petkind=process.argv[4];
        let petname=process.argv[5];
        
        if(!petage||!petkind||!petname){
            console.log('Usage: node pets.js create AGE KIND NAME');
            process.exit(1);
        }if(typeof petage!=="number"){
            console.log('Usage: node pets.js create AGE KIND NAME');
            process.exit(1);
        }
        if(petage<=0){
            console.log('Usage: node pets.js create AGE KIND NAME');
            process.exit(1);
        }else{
            
            parseddata[parseddata.length] = obj(petage,petkind,petname);
            var towrite = JSON.stringify(parseddata);
    
            fs.writeFileSync("pets.json", towrite);
            console.log(obj(petage,petkind,petname));
        }
    }
    if(subcommand==='update'){
        let updateindex=Number.parseInt(process.argv[3]);
    let petage=Number.parseInt(process.argv[4]);
        let petkind=process.argv[5];
        let petname=process.argv[6];
        // let updateobj={};
        if(!petage||!petkind||!petname){
            console.error("Usage: node pets.js update INDEX AGE KIND NAME")
            process.exit(1);
        }if(typeof updateindex!=='number'||typeof petage!=="number"){
            console.error("Usage: node pets.js update INDEX AGE KIND NAME")
            process.exit(1);
        }
        if(parseddata[updateindex]===undefined||petage<0){
            console.error("Usage: node pets.js update INDEX AGE KIND NAME")
            process.exit(1);
        }else{
            parseddata[updateindex]=obj(petage,petkind,petname)
            var towrite = JSON.stringify(parseddata);
            fs.writeFileSync("pets.json", towrite);
            console.log(parseddata[updateindex]);
             }
        }
        if(subcommand==='destroy'){
            let deleteindex=Number.parseInt(process.argv[3]);
            
            if(!deleteindex){
                console.error("Usage: node pets.js destroy INDEX")
                 process.exit(1);
            }
            //using || to determine if the one of these condition are true, they will all execute error
            if(typeof deleteindex!=="number"||deleteindex<0||deleteindex>parseddata.length){
                console.error("Usage: node pets.js destroy INDEX")
                 process.exit(1);

            }
            else{
                var newobj=JSON.stringify(parseddata.splice(deleteindex,1))
                fs.writeFileSync('./pets.json',newobj)
                console.log(newobj);
            }
        }
    
})
function obj(petage,petkind,petname){
    let updateobj={};
    updateobj.age=petage;
    updateobj.kind=petkind;
    updateobj.name=petname;
    return updateobj;
}
// function err(petage,petkind,petname){

// }





// switch (subcommand) {
//     case "read":
//       fs.readFile("./pets.json", "utf8", function (error, data) {
//         if (error) {
//           console.error("Usage: node pets.js [read | create | update | destroy]");
//           process.exit(1);
//         }
//         const parsedata = JSON.parse(data);
//         const index = Number.parseInt(process.argv[3]);
//         if(!index){
//           console.log(parsedata);
//           process.exit(1);
//       }
//         if (index < 0 || index >= parsedata.length) {
//           console.error("Usage: node pets.js [read | create | update | destroy]");
//           process.exit(1);
//         }
//         console.log(parsedata[index]);
//       });
//       break;