import React, { useEffect, useState } from 'react';
import { View, Text, Button, Image, StyleSheet, Alert } from 'react-native';
import { IconButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage'; // AsyncStorage eklendi
import { useNavigation } from '@react-navigation/native';
import { addCart } from '../server/api';
import { ScrollView } from 'react-native-gesture-handler';

const ProductsPage = ({ product }) => {
    const { id, title, description, image, price, location, userId, user, datePosted } = product;
  const [USERID, setUSERID] = useState(null); 
  
    const navigation = useNavigation();

    
    useEffect(() => {
        const interval = setInterval(() => {
            getUserID();
            console.log("user: " +USERID);
  }, 5000); 

  
  return () => clearInterval(interval);
      
    }, []);

    const getUserID = async () => {
        try {
           const id = JSON.parse(await AsyncStorage.getItem('id'));
            setUSERID(id);
            if (id == null) {
                setUSERID(null);
            }
          console.log("id: "+id)
        } catch (error) {
            console.error('Error getting user ID:', error);
        }
    };

    const addCartClick = () => {
        if (USERID == null) {
            Alert.alert("Hata", "Ürünü Sepete eklemek için giriş yap");
        } else if (userId == USERID) {
            Alert.alert("Hata", "Kendi Ürününü Sepete Ekleyemezsin");
        } else {
            addCart(USERID, id)
                .then((res) => {
                    if (res.status == 200) {
                        Alert.alert("Başarılı", "Ürün Sepete Eklendi");
                        
                    }
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }

    return (
        <ScrollView style={styles.productContainer}>
            <View style={styles.header}>
                <IconButton icon="account-circle" size={30} />
                <Text>{user.username}</Text>
            </View>
             <View>
                    {image && image.includes('image') ?
                        <Image style={styles.image} source={{ uri: image }} /> :
                        image && image.includes('video') ?
                            <Video style={styles.video} source={{ uri: image }} /> :
                            <Image style={styles.avatar} source={{uri : image}} /> // Varsayılan avatar resmini göster
                    }
                </View>
            <View style={styles.content}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.location}>{location}</Text>
                <Text style={styles.description}>{description}</Text>
                <Text style={styles.price}>{price} TL</Text>
            </View>
            <View style={styles.actions}>
                <IconButton icon="cart" size={30} onPress={addCartClick} />
                <Text onPress={addCartClick}>Sepete Ekle</Text>
            </View>
            <Text style={styles.date}>{datePosted}</Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    productContainer: {
        margin: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: 'lightgray',
        borderRadius: 5,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        height: 220,
        resizeMode: 'contain',
    },
    video: {
        height: 280,
        width: '100%',
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    content: {
        marginTop: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    location: {
        fontSize: 14,
    },
    description: {
        fontSize: 16,
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    date: {
        marginTop: 10,
        fontSize: 12,
        textAlign: 'right',
    },
});

export default ProductsPage;
