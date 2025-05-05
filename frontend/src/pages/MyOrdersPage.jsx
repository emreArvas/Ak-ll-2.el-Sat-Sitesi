import React, { useEffect, useState } from 'react'
import { getOrders } from '../server/api';
import MyOrderListPage from '../component/MyOrderListPage';

const MyOrdersPage = () => {
    const userId = localStorage.getItem("id");
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        getOrders(userId).then((res) => {
            setOrders(res.data);
       }).catch((err)=>{console.log(err)})
        
    },[])
    return (
        <div>
            <h1 style={{textAlign : 'center'}}>Siparişlerim</h1>
            <div id='products'>
            
          {
              orders.map((order, key) => {
                  return <MyOrderListPage order={order} key={key}></MyOrderListPage>
              })
      }
    </div>
        </div>
        
  )
}

export default MyOrdersPage
