import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getInComingOrders } from '../server/api';
import InComingList from '../components/InComingList';
import { ScrollView } from 'react-native-gesture-handler';


export default function InComingOrdersPage() {
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
            console.error('Error getting user ID:', error.response.data);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (USERID) {
                getInComingOrders(USERID)
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
            {orders.map((order, index) => {
                return <InComingList key={index} order={order}></InComingList>
            })}
        </ScrollView>
    )
}

const styles = StyleSheet.create({})
