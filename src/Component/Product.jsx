import React, { useEffect, useState } from 'react'
const PRODUCTS = [
    { id: 1, name: "Laptop", price: 500 },
    { id: 2, name: "Smartphone", price: 300 },
    { id: 3, name: "Headphones", price: 100 },
    { id: 4, name: "Smartwatch", price: 150 },
  ];
  const FREE_GIFT = { id: 99, name: "Wireless Mouse", price: 0, };
const THRESHOLD = 1000;

function Product() {
    const [cart,setcart]=useState([])
    const [total,settotal]=useState(0)
    const [message,setMessage]=useState("")

    useEffect(()=>{
        console.log("cart updated",cart)
    const totals=cart.reduce((sum,item)=>sum+item.price*item.quantity,0);
    settotal(totals)
    },[cart])

    console.log("total issss",total)

    useEffect(()=>{
        if(total>=THRESHOLD){
            const gift=cart.find((item)=>item.id===FREE_GIFT.id)
            if(!gift){
                setcart([...cart,{...FREE_GIFT,quantity:1}])
                setMessage("you got free gift")
            }else{
                setcart(cart.filter((item)=>item.id!==FREE_GIFT.id))
                setMessage("")
            }
        }
    },[cart])
    
    
     const addTocart=(product)=>{

     setcart((prev)=>{
        
     })

    
      }

     const updatequnatity=(id,data)=>{

     }

     console.log("cart issssss",cart)



  return (
    <div className='p-6 bg-gray-100 min-h-screen'>
     <h1 className='text-3xl font-bold text-center md-6'>shopping cart   </h1>
     <h2 className='text-2xlfont-bold  mb-4 '>products</h2>
     <div className='grid grid-cols-1 md:grid -cols-2 lg-:grid-cols-4 gap-4'></div>
     {PRODUCTS.map((product)=>(
        <div key={product.id} className='p-4 bg-white shadow-md rounded-lg '>
        <span className=' block font-medium '>{product.name}-${product.price}</span>
        <button className='md-2 px-4 py-2 bg-blue-500 text-white rounded md' onClick={addTocart(product)}>Add To Cart</button>
        </div>
     ))}

<h2 className=' text-2xl font-semibold mt-6 '>Cart  </h2>

      <div className='mt-2 p-4 bg-white shadow-md rounded-lg'>
        <div className='font-medium '>Sub Total:${total}</div>
        <div className='mt-2 text-sm text-gray-600 '>
            {total<THRESHOLD?`add $${THRESHOLD-total} greater to unlock free prices`:"FREE_GIFT"}
        </div>
      </div>
      {/* {cart.map((item)=>(
        <div key={item.id} className='mt-2 p-4 bg-white shadow md rounded-lg flex-justify-between items-center'> 
        <span className='font medium '>{item.name}-${item.price}*{item.quantity}</span>
        {item.id!==FREE_GIFT.id&&(
            <div className='flext gap-2'>
                <button className='px-3 py-1 bg-green-500 text-white rounded md ' onClick={()=>updatequnatity(item.id,1)}>+</button>
            </div>
        )}
        </div>
      ))} */}
    </div>
  )
}

export default Product
