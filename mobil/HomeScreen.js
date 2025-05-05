import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ProductsPage from './components/ProductsPage';
import { getProducts } from './server/api';
import { ScrollView } from 'react-native-gesture-handler';

export default function HomeScreen() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    
    
    
  const interval = setInterval(() => {
    getProducts()
      .then((res) => {
        
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  }, 5000); 

  
  return () => clearInterval(interval);
  }, []);

  const renderProduct = ({ item }) => (
    <ProductsPage product={item} />
  );

  return (
    <ScrollView >
      <Text style={styles.input}>Ürünler</Text>
      {
        products.map((product,index) => {
          return <ProductsPage key={index} product={product}></ProductsPage>
        })
      }
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  input: {
    margin: 15,
    padding : 5,
    alignItems :'center',
    textAlign: 'center',
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
});