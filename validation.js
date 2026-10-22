const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/studentDB").then(() => console.log("mongodb connected succesfully")).catch((err) => console.log(err));

const studentSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true,
        match: [/^\S+\.\S+$/, "enter vaild email"]
    },
    course: {
        type: string,
        default: 'Not assigned',
        enum: ['msc.it', 'BCA', 'bsc.it'],
        reuired: true
    }
});

const Student = mongoose.model("Student", studentSchema);

app.get("/students", async (req, res) => {//no chages
    try {
        const students = await Student.find();
        res.send(students);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post("/students", async (req, res) => {
   try{
     const student = await Student.create(req.body);
    res.status(201).json(student); //// herre only add status and .json
   }catch(err){
    res.status(400).json({error : err.message})
   }
});

app.put("/students/:id", async (req, res) => {
    try{
        const students = await Student.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    if(!students){
        res.status(404).json({message:"student not found"})
    }
    res.json(students); // only chage send to json & add if condition
    }catch(err){
    res.status(400).json({error : err.message})
   }
});

app.delete("/students/:id", async (req, res) => {
    try{
        const students = await Student.findByIdAndDelete(/// chage update to delete when copy
        req.params.id
    );
    if(!students){
        res.status(404).json({message:"student not found"})// only chage send to json with add msg var & add if condition
    }
    res.json({message :"student deleted succesfully"});

    }catch(err){
    res.status(400).json({error : err.message})
   }
});

app.listen(3000, () => {
    console.log("server running at http://localhost:3000");
});