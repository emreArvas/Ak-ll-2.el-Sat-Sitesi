import { Alert, Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createOrder, deleteCart, listCart } from '../server/api';
import ProductsPage from '../components/ProductsPage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import CartListPage from '../components/CartListPage';

export default function CartPage() {
    const [products, setProducts] = useState([]);
    const [userId, setUserId] = useState(null);
    const [total, setTotal] = useState(0);

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

    const payOrder = async () => {
        try {
            for (const product of products) {
                await createOrder(userId, product.product.id);
                await deleteCart(product.id);
            }
            const updatedCart = await listCart(userId);
            setProducts(updatedCart.data);
            setTotal(0); 
            Alert.alert("Ödendi");
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {       
        const interval = setInterval(() => {
            if(userId) {
                listCart(userId)
                    .then((res) => {
                        setProducts(res.data);
                        const total = res.data.reduce((acc, cart) => acc + cart.product.price, 0);
                        setTotal(total);
                    })
                    .catch((err) => {
                        console.error("Error fetching products:", err);
                    });
            }
        }, 5000); 
        return () => clearInterval(interval);
    }, [userId]);

    const handleDeleteFromCart = async (cartId) => {
        try {
            await deleteCart(cartId);
            // Yeniden listeleme
            listCart(userId)
                .then((res) => {
                    Alert.alert("Ürün Sepetten Kaldırıldı")
                    setProducts(res.data);
                })
                .catch((err) => {
                    console.error("Error fetching products:", err);
                });
        } catch (error) {
            console.error("Error deleting product from cart:", error);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.totalContainer}>
                <Text style={styles.totalText}>Toplam Fiyat: {total} TL</Text>
                <Button onPress={payOrder} color={'white'} backgroundColor='black'  title='Öde'></Button>
            </View>
            {
                products.map((product, index) => {
                    return <CartListPage key={index} cart={product} onDelete={handleDeleteFromCart} ></CartListPage>
                })
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 25,
        marginTop : 15,
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});