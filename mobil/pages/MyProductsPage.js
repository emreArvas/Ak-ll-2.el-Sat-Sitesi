import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getProductsForUser } from '../server/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyProductListPage from '../components/MyProductListPage';
import { ScrollView } from 'react-native-gesture-handler';

export default function MyProductsPage() {
  const [products, setProducts] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    getUserID();
  }, []);

  const getUserID = async () => {
    try {
      const id = JSON.parse(await AsyncStorage.getItem('id'));
      setUserId(id);
      console.log("id: " + id);
    } catch (error) {
      console.error('Error getting user ID:', error.response.data);
    }
  };

  useEffect(() => {
    if (userId) {
      const interval = setInterval(() => {
        getProducts(userId);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [userId]);

  const getProducts = (id) => {
    getProductsForUser(id)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("Error fetching products:", err.response.data);
      });
  }

  return (
    <ScrollView>
      {products.map((product, index) => {
        return <MyProductListPage key={index} product={product}></MyProductListPage>
      })}
    </ScrollView>
  )
}

const styles = StyleSheet.create({})
