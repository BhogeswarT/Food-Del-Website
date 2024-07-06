//modifying food items details in database  which is used by admin

import foodModel from "../models/foodModel.js";
import fs from 'fs'  //importing file system


//add food item
const addFood = async(req,res) => {
    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name: req.body.name,
        description : req.body.description,
        price: req.body.price,
        category: req.body.category,
        image:image_filename
    })

    try {
        await food.save();   // saving food details in database
        res.json({success:true,message:"Food item Added"})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:"Error"})
    }
}

//all food list
const listFood = async (req,res) => {
  try {
    const foods = await foodModel.find({});  //finds all, since id is not given
    res.json({success:true,data:foods})
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
  }
}

//remove food item 
const removeFood = async (req,res) =>{
   try {
     const food = await foodModel.findById(req.body.id);
     fs.unlink(`uploads/${food.image}`,()=>{})  //food item is removed from folder

     await foodModel.findByIdAndDelete(req.body.id);  // removing food item from database
     res.json({success:true,message:"Food item is removed"})

   } catch (error) {
     console.log(error);
     res.json({success:false,message:"Error"})
   }
}

export {addFood,listFood,removeFood}