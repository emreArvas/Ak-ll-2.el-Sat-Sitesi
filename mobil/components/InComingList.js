import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { cancelOrder, updateOrderStatus } from '../server/api';


const InComingList = ({ order }) => {
    const status = [
        "Sipariş Alındı", "Onaylandı", "Kargoda", "Teslim Edildi"
    ];
    const [orderS, setOrderS] = useState("");

    const { id, product, orderStatus, datePosted } = order;
    const { image, title, description, price, location } = product;
    
    const handleStatusChange = (value) => {
        setOrderS(value);
    }
    const updateToStatus=async() => {
        const body = {
            status: orderS
        }
         try {
            console.log(body); // 
            const res = await updateOrderStatus(id, body);
            if (res.status === 200) {
                Alert.alert("Sipariş Durumu Güncellendi")
            }
        } catch (err) {
             console.log(err.response.data);
             Alert.alert("Sipariş Durumu Güncellemedi")
        }
        
    }
    const deleteToOrder=async() => {
        try {
            await cancelOrder(id);
            Alert.alert("Sipariş iptal edildi")
            
        } catch (err) {
            Alert.alert("Sipariş iptal edilemedi")
        }
    }

    return (
        <View style={styles.container}>
            <Image source={{ uri: image }} style={styles.image} />
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
             <View style={styles.status}>
<Text>{orderStatus}</Text>
                </View>
            <View style={styles.statusContainer}>
                <Text style={styles.statusLabel}>Sipariş Durumunu Değiştir:</Text>
                
                <Picker
                    selectedValue={orderS}
                    style={{ height: 50, width: 200 }}
                    onValueChange={(itemValue, itemIndex) =>
                        handleStatusChange(itemValue)
                    }>
                    {status.map((stat, index) => (
                        <Picker.Item key={index} label={stat} value={stat} />
                    ))}
                </Picker>
            </View>
            <View style={styles.buttonContainer}>
                <Button onPress={updateToStatus} title="GÜNCELLE" />
                <Button onPress={deleteToOrder} title="İPTAL" />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 20,
        marginBottom: 20,
        borderRadius: 10,
        elevation: 3,
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        borderRadius: 10,
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 18,
        marginBottom: 10,
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    statusLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    status: {
        flexDirection : 'column'
    }
});

export default InComingList;
