const express=require("express");
const mongoose=require("mongoose");
const app=express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/studentDB").then(()=>console.log("mongodb connected succesfully")).catch((err)=>console.log(err));

const studentSchema=mongoose.Schema({
    name:{
        type : String,
        required : true
    },
    email:{
        type : String,
        required : true,
        unique:true
    }
});

const Student=mongoose.model("Student",studentSchema);

app.get("/students",async(req,res)=>{
    const students=await Student.find();
    res.send(students);
});

app.post("/students",async(req,res)=>{
    const student=await Student.create(req.body);
    res.send(student);
});

app.put("/students/:id",async(req,res)=>{
    const students=await Student.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );
    res.send(students);
});

app.delete("/students/:id",async(req,res)=>{
    const students=await Student.findByIdAndDelete(
        req.params.id
    );
    res.send("student deleted succesfully");
});

app.listen(3000,()=>{
    console.log("server running at http://localhost:3000");
});