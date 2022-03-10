const express=require('express');
const app=express();
const {Pool}=require('pg');


const pool= new Pool({
    database:"petshop",
})
//set default value for 

app.use(express.json());


app.post('/pets',(req,res)=>{
    const {age,kind,name}=req.body;
    if(!age||!kind||!name){
        res.status(404).send('Not Found');
        return;
    }
    pool.query('INSERT INTO pets(age,kind,name) VALUES($1, $2, $3) RETURNING *;',[age,kind,name],(err,result)=>{
        if(err){
            res.sendStatus(500);
        }
        res.send(result.rows[0]);  
    })
})

app.get('/pets/:id?',(req,res)=>{
    const {id}=(req.params);
    if(id!==undefined){
        pool.query('SELECT age,kind,name FROM pets WHERE id=$1',[id],(err,result)=>{
            if(err){
                res.sendStatus(500);
            }if(!result.rows[0]){
                res.writeHead(404,'Not Found',{'Content-Type':'text/plain'}).end('Not Found');
            }else{res.send(result.rows[0]);}
        })
    }else{
        pool.query('SELECT * FROM pets',(err,result)=>{
            res.send(result.rows);
        })
    }
})

app.patch('/pets/:id',(req,res)=>{
    const {id}=(req.params);
    const {age,kind,name}=req.body;
    if(!age&&!kind&&!name){
        res.writeHead(404,'Not Found',{'Content-Type':'text/plain'}).end('Not Found');
    }
    const query=`UPDATE pets SET
        age=COALESCE($1,age),
        name=COALESCE($2,name),
        kind=COALESCE($3,kind)
        WHERE id=$4
        RETURNING *`;
        pool.query(query,[age,name,kind,id]).then((result)=>{
        res.send(result.rows[0]);
    }).catch((err)=>{
        res.sendStatus(500);
    });
})



app.delete('/pets/:id',(req,res)=>{
    const id=Number(req.params.id);
    pool.query('DELETE FROM pets WHERE id=$1 RETURNING *',[id],(err,result)=>{
        if(err){
            res.status(500).send('Fail request');
        }else if(result.rows[0]){
            res.status(200).json(result.rows[0]);
                // res.writeHead(404,'Not Found',{'Content-Type':'text/plain'}).end('Not Found');
        }else{
            res.writeHead(404,'Not Found',{'Content-Type':'text/plain'}).end('Not Found');
        }
    })
    
})








// app.get('/pets/:index',(req,res)=>{
//     const {index}=(req.params);
//     fs.readFile('./pets.json','utf-8',(err,data)=>{
//         if(err){
//             res.status(500).send('Internal server error')
//         }
//          let parsedata=JSON.parse(data);
//          console.log(parsedata);
//          if(!parsedata[index]){
//                 res.writeHead(404,'Not Found',{'Content-Type':'text/plain'}).end('Not Found');
//             }
//            else{res.status(201).json(parsedata[index]);} 
//     })
// })


    
// app.delete('/pets/:index',(req,res)=>{
//     const {index}=req.params;
//     fs.readFile('./pets.json','utf-8',(err,data)=>{
//         if(err){
//             res.status(500).send('Internal server error')
//         }const parseData=JSON.parse(data);
//         if(!parseData[index]){
//             res.writeHead(404,'Not Found',{'Content-Type':'text/plain'}).end('Not Found');
//         }else{
//             parseData.splice(index,1);
//             fs.writeFileSync('./pets.json',JSON.stringify(parseData),(err)=>{
//                 if(err){
//                     res.status(500).send('Internal server error');
//                 }
//             })
//         res.end();}
//     })

// })





app.listen(4000);

//how to distinguish the /pets/ and /pets/:index
//for patch and delete, the res.end(), have to put it under the read instead under the writing


// pool.query("SELECT * FROM pets",(err,result)=>{
//     console.log(result.rows);//these result are JS array of objcet
//     //res.json(data.rows);
// })
// pool.query Parameterized
// pool.query('SELECT * FROM $1',[petid],(err,data)=>{

// })

// app.get('/',(req,res)=>{
//     pool.query('SELECT * FROM pets',(err,data)=>{
//         res.json(data.rows);
//     })
// })






// app.post('/pets',(req,res)=>{
//     const {age,kind,name}=req.body;
//     if(!age||!kind||!name){
//         res.status(404).send('Not Found');
//         return;
//     }
//     const newpet={age,kind,name}
//     fs.readFile('./pets.json','utf-8',(err,data)=>{
//         if(err){
//             res.send('Internal server error');
//         }
//         else{
//             const parsedate=JSON.parse(data);
//             parsedate.push(newpet);
//             fs.writeFile('./pets.json', JSON.stringify(parsedate),(err)=>{
//                 if(err){
//                     res.status(500).send('Internal server error');
//                 }else{
//                     res.status(201).send(newpet);
//                 }
//             })
//         }
//     })
// })
  // const newpet={age,kind,name}
    // fs.readFile('./pets.json','utf-8',(err,data)=>{
    //     if(err){
    //         res.send('Internal server error');
    //     }
    //     else{
    //         const parsedate=JSON.parse(data);
    //         parsedate.push(newpet);
    //         fs.writeFile('./pets.json', JSON.stringify(parsedate),(err)=>{
    //             if(err){
    //                 res.status(500).send('Internal server error');
    //             }else{
    //                 res.status(201).send(newpet);
    //             }
    //         })
    //     }
    // })


    // app.patch('/pets/:index',(req,res)=>{
    //     const {index}=(req.params);
    //     const {age,kind,name}=req.body;
    //     const newpet={age,kind,name};
    //     if(!age&&!kind&&!name){
    //         res.status(404).send('Not Found');
    //         return;
    //     }
    //     fs.readFile('./pets.json','utf-8',(err,data)=>{
    //         if(err){
    //             res.status(500).send('Internal server error')
    //         }
    //          let parsedata=JSON.parse(data);
             
    //          if(!parsedata[index]){
    //             res.status(404).send('Not Found');
    //         }
    //          let updatepet=Object.assign(parsedata[index],newpet);//update the specfic object inside of the array
    //          parsedata.splice(index,1,updatepet);
    //          fs.writeFileSync('./pets.json',JSON.stringify(parsedata),(err)=>{
    //              if(err){
    //                  res.status(500).send('Bad Request');
    //               }else{
    //                 res.status(200).send('success');
    //                }
    //               })
    //         })
    //         res.end();
    //     })