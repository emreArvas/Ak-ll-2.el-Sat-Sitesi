import React, { useEffect, useState } from 'react';
import {RefreshControl,NativeModules, View, Text, Image, TouchableOpacity, Alert, StyleSheet,Button } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import { useNavigation } from '@react-navigation/native';


const CartListPage = ({ cart,onDelete }) => {
  useEffect(()=>{},[handleDelete])
    const { id, product, user } = cart;
  const { title, description, image, price, location } = product;
  const navigate = useNavigation();
  const [key, setKey] = useState(0);

   const handleDelete=() => {
     onDelete(id);
   }

    const sendDetailPage = () => {
        
    };

    return (
         <View key={key}>
            <View style={styles.productContainer}>
                <TouchableOpacity onPress={handleDelete}>
                    <MaterialCommunityIcons name="close" size={30} style={styles.deleteIcon} />
                </TouchableOpacity>

                <TouchableOpacity onPress={sendDetailPage}>
                    <Image
                        source={{ uri: image }}
                        style={styles.image}
                    />
                </TouchableOpacity>

                <View style={styles.textContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.description}>{description}</Text>
                    <Text style={styles.price}>{price} TL</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
   productContainer: {
        margin: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: 'lightgray',
        borderRadius: 5,
    },
    card: {
        borderRadius: 10,
    },
    deleteIcon: {
        alignSelf: 'flex-end',
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 10,
    },
    textContainer: {
        marginHorizontal: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 16,
    },
    price: {
        fontSize: 18,
        marginTop: 10,
    },
});

export default CartListPage;
