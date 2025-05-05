import React, { useEffect, useState } from 'react'
import { getInComingOrders } from '../server/api';
import InComingOrderList from '../component/InComingOrderList';

const InComingOrdersPage = () => {
    const userId = localStorage.getItem("id");
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        getInComingOrders(userId).then((res) => {
            setOrders(res.data);
           
       }).catch((err)=>{console.log(err)})
        
    },[])
  return (
    <div>
          {
              orders.map((order, index) => {
                return <InComingOrderList key={index} order={order}></InComingOrderList>
            })  
      }
    </div>
  )
}

export default InComingOrdersPage

