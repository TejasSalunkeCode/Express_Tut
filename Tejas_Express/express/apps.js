import {MongoClient} from "mongodb";

const client=new MongoClient("mongodb://127.0.0.1");
await client.connect();

const db=client.db("mongodb_nodejs_db");
const userCollection=db.collection("users");

// userCollection.insertOne({name:"Tejas salunke",age:19})


userCollection.insertMany([
    {name:"yash",role:"user",age:18},
    {name:"om",role:"user",age:19},
    {name:"mohit",role:"user",age:20},
])

//Read

// const usersCursor=userCollection.find();
// console.log(usersCursor);

// for await(const user of usersCursor){
//     console.log(user);
    
// }


// const usersCursor=await userCollection.find().toArray();
// console.log(usersCursor);


// const user=await userCollection.findOne({name:"om"})
// console.log(user);
// console.log(user._id.toHexString());



//update
// await userCollection.updateOne({name:"om"},{$set:{age:30}});


//delete

const result=await userCollection.deleteOne({name:"om"});
console.log(`${result.deletedCount} document deleted.`);
