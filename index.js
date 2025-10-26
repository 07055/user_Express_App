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

app.post("/users",async(req,res)=>{
    try{
        const {firstName,lastName,emailAddress}=req.body;
        const user= await client.user.create({
            data:{
                firstName,
                lastName,
                emailAddress
            }
        })

        res.status(201).json(user);
    }catch(e){
        res.status(500).json({message:"something went wrong"})
    }
})

app.get("/user/:id",(req,res){
    try{
        const {id}=req.params;
        const user = await client.user.findUnique({
            where:{
                id
            }

        })
        if(!user){
            res.status(404).json({message:"sorry User not found"})
            return;
        }

    }catch{
        res.status(500).json({message:"opp!something went wrong"})

    }
})

app.delete("/user/:idOfTheUser", async function (req, res) {
  try {
    const { idOfTheUser } = req.params;

    await client.user.update({
      where: {
        id: Number(idOfTheUser),
      },
      data: {
        isDeleted: true,
      },
    });

    res.status(200).send('User deleted successfully');
  } catch (e) {
    console.error(e);
    res.status(500).send('Something went wrong');
  }
});




const PORT=5000;
app.listen(PORT,()=>{
    console.log(`Server is listening on port ${PORT}`)
});



