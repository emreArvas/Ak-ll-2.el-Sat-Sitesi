import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {  cancelOrder, getOrders } from '../server/api';
import MyOrderListPage from '../components/MyOrderListPage';
import { ScrollView } from 'react-native-gesture-handler';

export default function OrderPage() {
    const [orders, setOrders] = useState([]);
    const [USERID, setUserId] = useState();

    useEffect(() => {
        getUserID();
    }, []);

    const getUserID = async () => {
        try {
            const id = JSON.parse(await AsyncStorage.getItem('id'));
            setUserId(id);
            console.log("id: " + id);
        } catch (error) {
            console.error('Error getting user ID:', error);
        }
    };

    const cancelOrderClick = async (id) => {
         try { 
        await cancelOrder(id);
             Alert.alert("Sipariş iptal edildi")
              getOrders(USERID)
                    .then((res) => {
                        setOrders(res.data);
                    })
                    .catch((err) => {
                        console.log(err.response.data);
                    });
             
         } catch (err) {
             console.log(err.response.data);
          Alert.alert("Sipariş iptal edilemedi")
      }
    };

    useEffect(() => {
        getUserID();
        const interval = setInterval(() => {
            if (USERID) {
                getOrders(USERID)
                    .then((res) => {
                        setOrders(res.data);
                    })
                    .catch((err) => {
                        console.log(err.response.data);
                    });
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [USERID]);

    return (
        <ScrollView>
            <Text>Siparişlerim</Text>
            {orders.map((order, index) => {
                return <MyOrderListPage key={index} order={order} cancelClick={cancelOrderClick}></MyOrderListPage>;
            })}
        </ScrollView>
    );
}

const styles = StyleSheet.create({});
