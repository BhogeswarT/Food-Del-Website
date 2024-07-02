//logic to connect with database

import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://bhogeswar1603:7036284673@cluster0.qgseqis.mongodb.net/food-del').then(()=>console.log("DB connected"));
}