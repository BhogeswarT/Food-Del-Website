import userModel from "../models/userModel.js"

//add items to user cart
const addToCart = async (req,res) => {
  try {
    let userData = await userModel.findOne({_id:req.body.userId}); //after middlerware converting token to userId ,we get user details
    let cartData = await userData.cartData;
    if(!cartData[req.body.itemId]){
        cartData[req.body.itemId] = 1;
    }
    else{ //if that item is already added in cart then we increase its value
       cartData[req.body.itemId] += 1;
    }
    //updating user cart with new cart items
    await userModel.findByIdAndUpdate(req.body.userId,{cartData});
    res.json({success:true,message:"Added to cart"});
  } catch (error) {
     console.log(error);
     res.json({success:false,message:"Error"})
  }
}


//remove items from user cart
const removeFromCart = async (req,res)=>{
   try {
    let userData = await userModel.findById(req.body.userId); //after middlerware converting token to userId ,we get user details
    let cartData = await userData.cartData;
    if(cartData[req.body.itemId] > 0){ //if item to be removed is in cart
       cartData[req.body.itemId] -= 1; //then decrease its value by 1
    }
    //update new cart data  in usercart
    await userModel.findByIdAndUpdate(req.body.userId,{cartData});
    res.json({success:true,message:"Removed From Cart"})
   } catch (error) {
    res.json({success:false,message:"Error"})
   }
}

//fetch user cart data
const getCart = async (req,res) =>{
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    res.json({success:true,cartData})
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
  }

}

export {addToCart,removeFromCart,getCart};