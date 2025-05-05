import React, { useEffect, useState } from 'react'
import { getProductsForUser } from '../server/api';
import MyProductListPage from '../component/MyProductListPage';

const MyProductsPage = () => {
    const id = localStorage.getItem('id');
    const isLogin = localStorage.getItem('isLogin');
    const [products, setProducts] = useState([]);
    useEffect(() => {
          getProductsForUser(id)
            .then((res) => {
                setProducts(res.data);
            })
            .catch((err) => {
                console.error("Error fetching products:", err);
            });
    }, [])
    console.log(products);
  return (
    <div>
          <div id='products'>
              {products.map((product, index) => {
                  return <MyProductListPage key={index} product={product}></MyProductListPage>
              })}
      </div>
    </div>
  )
}

export default MyProductsPage
