import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import  Stripe from "stripe"


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

//placing user order for frontend
const placeOrder = async (req,res) => {
    const frontend_url = "http://localhost:5173";
   
    try {
        const newOrder = new orderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            adderss:req.body.adderss
        })
        await newOrder.save();
        //Clearing user's cart after placing order
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});

        //creatig lineItems (necessary for stripe payments)
        const line_items = req.body.items.map((item)=>({
          price_data:{
            currency:"usd",
            product_data:{
                name:item.name
            },
            unit_amount:item.price*100
          },
          quantity:item.quantity
        }))

        line_items.push({
            price_data:{
                currency:"usd",
                product_data:{
                    name:"Delivery Charges"
                },
                unit_amount:2*100
            },
            quantity:1
        })

       //creating one session
        const session = await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:'payment',
            success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,  //if payment is successful we will be redirected to this Page
            cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`  //if payment is successful we will be redirected to this Page
        })


        res.json({success:true,session_url:session.url})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

const verifyOrder = async (req,res) => {
   const {orderId,success} = req.body;
   try {
    if(success=="true"){
        await orderModel.findByIdAndUpdate(orderId,{payment:true});
        res.json({success:false,message:"Not paid"})
    }
   } catch (error) {
     console.log(error);
     res.json({success:false,message:"Error"})
   }
}

//user orders for front end
const userOrders = async (req,res)=>{
   try{
       const orders = await orderModel.find({userId:req.body.userId});
       res.json({success:true,data:orders})
   }catch(error){
       console.log(error);
       res.json({success:false,message:"Error"})
   }
}

// Listing Order for Admin panel
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, data: orders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

export {placeOrder,verifyOrder,userOrders,listOrders}