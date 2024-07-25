const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const mongoUrl = "mongodb://127.0.0.1:27017/wanderlust";

main()
.then(()=> console.log("Connection successfull"))
.catch((err)=> console.log(err));

async function main(){
    await mongoose.connect(mongoUrl);
}

const initDb = async ()=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({...obj, owner:"65c79c4355933399b4ed457a"}));
    await Listing.insertMany(initData.data);
    console.log("Data inserted");
};

initDb();