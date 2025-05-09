// const express=require('express');
// const app=express();


// app.get('/',(req,res)=>{
//     res.send("server is connected");
// });


// const mongoose= require('mongoose');

// const mongo_url='mongodb://127.0.0.1:27017/wadlab'

// main().then(()=>{
//     console.log("connected to db");
// })
// .catch((error)=>{
//     console.log("cant connect to db");
// });


// async function main(){
// await mongoose.connect(mongo_url);    
// }
// const userSchema= new mongoose.Schema({
//     name:String,
//     age:Number,
//     email:{type:String, unique:true}
// })
// const user= mongoose.model("tcoer", userSchema);

// user.insertMany([{
//     name:"omkar",
//     age:"21",
//     email:"jadhavomkar2608@gmail.com"
// },
// {
//     name:"Akash",
//     age:"23",
//     email:"jadhavakash11@gmail.com"
// },
// {
//     name:"Msd",
//     age:"42",
//     email:"mahi11@gmail.com"
// }
// ]).then((res)=>{
//     console.log(res);
// });


// //get api
// app.get('/getData', async (_req, res) => {
//     try {
//         const data = await user.find();
//         res.send(data);
//     } catch (err) {
//         res.status(500).send("Error retrieving data");
//     }
// });

// //post request
// app.post('/addUser', async (req,res)=>{
//     try{
//         const newuser=new user(req.body);
//         const saveduser=await newuser.save();
//         res.status(201).json(saveduser);
//     }catch(err){
//    res.status(400).send("error saving user: "+err.message);
//     }
// })


// app.listen(3030,()=>{
//     console.log("port is listening to port 3030");
// });


const express = require('express');
const app = express();
app.use(express.json()); // Needed for POST body parsing

const mongoose = require('mongoose');

const mongo_url = 'mongodb://127.0.0.1:27017/wadlab';

main()
  .then(() => {
    console.log("Connected to DB");
    // Seed only if collection is empty
   // seedUsers(); // <- this will only run once
  })
  .catch((error) => {
    console.log("Can't connect to DB", error);
  });

async function main() {
  await mongoose.connect(mongo_url);
}

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: { type: String, unique: true }
});

const user = mongoose.model("tcoer", userSchema);

// Only seed initial users if DB is empty
async function seedUsers() {
  const count = await user.countDocuments();
  if (count === 0) {
    await user.insertMany([
      {
        name: "omkar",
        age: 21,
        email: "jadhavomkar2608@gmail.com"
      },
      {
        name: "Akash",
        age: 23,
        email: "jadhavakash11@gmail.com"
      },
      {
        name: "Msd",
        age: 42,
        email: "mahi11@gmail.com"
      }
    ]);
    console.log("Initial users inserted.");
  } else {
    console.log("Users already exist — skipping insert.");
  }
}


app.get('/', (req, res) => {
  res.send("Server is connected");
});

// get req
app.get('/getData', async (_req, res) => {
  try {
    const data = await user.find();
    res.json(data);
  } catch (err) {
    res.status(500).send("Error retrieving data");
  }
});

// POST
app.post('/addUser', async (req, res) => {
  try {
    const newuser = new user(req.body);
    const saveduser = await newuser.save();
    res.status(201).json(saveduser);
  } catch (err) {
    res.status(400).send("Error saving user: " + err.message);
  }
});


// PUT - Update a user by ID
app.put('/updateUser/:id', async (req, res) => {
  const userId = req.params.id;
  const updatedData = req.body;

  try {
    const updatedUser = await user.findByIdAndUpdate(userId, updatedData, { new: true, runValidators: true });
    
    if (!updatedUser) {
      return res.status(404).send("User not found");
    }

    res.json(updatedUser);
  } catch (err) {
    res.status(400).send("Error updating user: " + err.message);
  }
});


//delete
// DELETE - Remove a user by ID
app.delete('/deleteUser/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    const deletedUser = await user.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).send("User not found");
    }

    res.json({ message: "User deleted successfully", deletedUser });
  } catch (err) {
    res.status(500).send("Error deleting user: " + err.message);
  }
});



app.listen(3030, () => {
  console.log("Port is listening on 3030");
});
