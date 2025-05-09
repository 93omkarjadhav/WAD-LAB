// const express=require('express');
// const app=express();
// const mongoose=require('mongoose');

// const url= "mongodb://localhost:27017/practice";


// main().then(()=>{
//     console.log("connected to db");
// })
// .catch((error)=>{
//     console.log("cant connect to db");
// });


//  async function main(){

//     await mongoose.connect(url);    
// }

// const userSchema= new mongoose.Schema({
//         name:String,
//         age:Number,
//         email:String
//     })

//     const user= mongoose.model("mongos", userSchema);

//     user.insertMany([{
//             name:"omkar",
//             age:"2",
//             email:"newemail123@gmail.com"
//         },
//         {
//             name:"Akash",
//             age:"23",
//             email:"jadhavakash11@gmail.com"
//         },
//         {
//             name:"Msd",
//             age:"42",
//             email:"mahi11@gmail.com"
//         }
//         ]).then((res)=>{
//             console.log(res);
//         });


// //get api
// app.get('/', (req,res)=>{
//     res.send("hello omkar!!");
// });

// app.get('/getData', async (_req, res) => {
//         try {
//             const data = await user.find();
//             res.send(data);
//             console.log(data);
//         } catch (err) {
//             res.status(500).send("Error retrieving data");
//         }
//     });


// //post api
// app.post('/addUser', async (req,res)=>{
//         try{
//             const newuser=new user(req.body);
//             const saveduser=await newuser.save();
//             res.status(201).json(saveduser);
//         }catch(err){
//        res.status(400).send("error saving user: "+err.message);
//         }
//     })


// app.listen(3333, ()=>{
//     console.log("server is listening to port 3333");
// })

const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.use(express.json()); // To parse JSON in POST/PUT

const url = "mongodb://localhost:27017/practice";

main().then(() => {
    console.log("Connected to DB");
    seedUsers(); // optional, runs only if needed
}).catch((error) => {
    console.log("Can't connect to DB");
});

async function main() {
    await mongoose.connect(url);
}

const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: { type: String, unique: true } // prevents duplicates
});

const user = mongoose.model("mongos", userSchema);

// 🌱 Seed initial data only once
async function seedUsers() {
    const count = await user.countDocuments();
    if (count === 0) {
        await user.insertMany([
            { name: "omkar", age: 2, email: "newemail123@gmail.com" },
            { name: "Akash", age: 23, email: "jadhavakash11@gmail.com" },
            { name: "Msd", age: 42, email: "mahi11@gmail.com" }
        ]);
        console.log("Sample users added");
    }
}

// GET root
app.get('/', (req, res) => {
    res.send("Hello Omkar!!");
});

// GET all users
app.get('/getData', async (_req, res) => {
    try {
        const data = await user.find();
        res.send(data);
    } catch (err) {
        res.status(500).send("Error retrieving data");
    }
});

// POST a new user
app.post('/addUser', async (req, res) => {
    try {
        const newUser = new user(req.body);
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(400).send("Error saving user: " + err.message);
    }
});

// ✅ PUT (update user by ID)
app.put('/updateUser/:id', async (req, res) => {
    try {
        const updatedUser = await user.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedUser);
    } catch (err) {
        res.status(400).send("Error updating user: " + err.message);
    }
});

// ✅ DELETE user by ID
app.delete('/deleteUser/:id', async (req, res) => {
    try {
        const deletedUser = await user.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).send("User not found");
        }
        res.json({ message: "User deleted", deletedUser });
    } catch (err) {
        res.status(500).send("Error deleting user: " + err.message);
    }
});

// Start server
app.listen(3333, () => {
    console.log("Server is listening on port 3333");
});