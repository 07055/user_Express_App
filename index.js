import { PrismaClient } from '@prisma/client';
import express from "express";

const app=express()
const client=new PrismaClient()


app.get("/users",async(req,res)=>{
    try{
        const users=await client.user.findMany();
        res.status(200).json(users);
    }catch(e){
        console.log(e)
        res.status(500).json({message:`something went wrong`})
    }
    
})
const PORT=5000;
app.listen(PORT,()=>{
    console.log(`Server is listening on port ${PORT}`)
});



