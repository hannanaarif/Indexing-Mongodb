import express from "express";
import mongoose from "mongoose";
import User from "./models/usermodel.js";
import dotenv from "dotenv";

dotenv.config();

const MongoDB_URI = process.env.MongoDB_URI;

console.log(typeof MongoDB_URI);

const app = express();

const mongoDBConnection = async () => {
    try {
        await mongoose.connect(MongoDB_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(error);
    }
  
};



async function main() {
  try {
    
    // Clear existing data
    // await User.deleteMany({});
    // console.log('Existing data cleared');

    // // Insert 10 million documents
    // console.time('Insert 10 million documents');
    // for (let i = 0; i < 100; i++) {
    //   const user = await User.create({ username: `user${i}`, age: Math.floor(Math.random() * 100) });
    // }
    // console.timeEnd('Insert 10 million documents');

    // Test query without indexing
    console.time('Query without indexing');
    await User.find({ username: 'user50' }).exec();
    console.timeEnd('Query without indexing');

    // Create index on username
    console.time('Create index on username');
    await User.collection.createIndex({ username: 1 });
    console.timeEnd('Create index on username');

    // Test query with indexing
    console.time('Query with indexing');
    await User.find({ username: 'user50' }).exec();
    console.timeEnd('Query with indexing');

    // Close the connection
    await mongoose.connection.close();
    console.log('Connection closed');

  } catch (err) {

    console.error(err);
  }
}



app.listen(3000, () => {
  mongoDBConnection();
  console.log("Server is running on port 3000");
  main();
});
