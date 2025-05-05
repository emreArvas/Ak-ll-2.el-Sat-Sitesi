import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import { deleteProduct, updateProduct } from '../server/api';
import { useNavigation } from '@react-navigation/native';

const MyProductListPage = ({ product }) => {
    const { id, title, description, image, price, location, userId, user, datePosted } = product;
    const [body, setBody] = useState({
        title: title,
        description: description,
        price: price
    });
    const [edit, setEdit] = useState(false);
    const navigation = useNavigation();

    const offEditMode = () => {
        setEdit(false);
    }

    const onEditMode = () => {
        setEdit(true);
    }

    const delProduct = () => {
        deleteProduct(id)
            .then((res) => {
                if (res.status == 200) {
                    Alert.alert("Ürün Silindi");
                  navigation.navigate("Ürünlerim");
                  setEdit(false)
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const editProduct = () => {
        const bodies = {
            title: body.title,
            description: body.description,
            image: image,
            price: body.price,
            location: location
        };

        updateProduct(id, bodies)
            .then((res) => {
                if (res.status == 200) {
                    Alert.alert("Ürün Güncellendi")
                  navigation.navigate("Ürünlerim")
                  setEdit(false)
                }
            })
            .catch((err) => {
                console.log(err.response.data);
            });
    }

    const inputChange = (name, value) => {
        setBody({ ...body, [name]: value });
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.username}>{user.username}</Text>
            </View>

            {edit ?
                <View style={styles.editContainer}>
                    <TextInput
                        style={styles.input}
                        value={body.title}
                        onChangeText={(value) => inputChange('title', value)}
                    />
                    <TextInput
                        style={[styles.input, { height: 100 }]}
                        value={body.description}
                        onChangeText={(value) => inputChange('description', value)}
                        multiline={true}
                    />
                    <TextInput
                        style={styles.input}
                        value={body.price}
                        onChangeText={(value) => inputChange('price', value)}
                        keyboardType="numeric"
                    />
                </View>
                :
                <View>
                    {image && image.includes('image') ?
                        <Image
                            style={styles.image}
                            source={{ uri: image }}
                        />
                        :
                        null
                    }
                </View>
            }

            <Text style={styles.title}>{title}</Text>
            <Text style={styles.price}>{price} TL</Text>

            <View style={styles.buttons}>
                <TouchableOpacity style={styles.button} onPress={edit ? offEditMode : onEditMode}>
                    <Text>{edit ? "İptal" : "Düzenle"}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={edit ? editProduct : delProduct}>
                    <Text>{edit ? "Tamam" : "Sil"}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = {
    container: {
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
    username: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    editContainer: {
        marginVertical: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        marginVertical: 5,
        padding: 5,
    },
    image: {
        width: 200,
        height: 200,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    price: {
        fontSize: 14,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    button: {
        backgroundColor: 'lightblue',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
};

export default MyProductListPage;
