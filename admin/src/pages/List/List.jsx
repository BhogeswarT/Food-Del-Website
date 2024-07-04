import React, { useEffect, useState } from 'react'
import './List.css'
import axios from "axios"
import { toast } from 'react-toastify'


const List = ({url}) => {

  const [list, setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);  //it is a route defined in backend, which gives response of food items data
    // console.log(response.data);
    if (response.data.success) {
      setList(response.data.data); //saving response in list variable
    }
    else {
      toast.error("Error")  //notification as Error on webpage
    }
  }

  const removeFood = async(foodId)=>{
    //  console.log(foodId);
    const response = await axios.post(`${url}/api/food/remove`,{id:foodId});  //this food item is removed from database
    await fetchList();  //reloading site again to show changes 
    if(response.data.success){
      toast.success(response.data.message)  //that message is response send by backend server
    }
    else{
      toast.error("Error")
    }
  }

  useEffect(() => {
    fetchList();
  }, [])

  return (
    <div className='list add flex-col'>
      <p className='heading'>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          //displaying items list on webPage
          return (
            <div key={index} className='list-table-format'>
              <img src={`${url}/images/` + item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p onClick={()=>removeFood(item._id)} className='cursor'>X</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List
