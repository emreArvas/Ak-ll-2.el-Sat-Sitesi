import React, { useEffect, useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, TextInput, View, Image, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';

import * as ImagePicker from "expo-image-picker";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addProduct } from '../server/api';
import { useNavigation } from '@react-navigation/native';

export default function AddProductPage() {
 const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('Adana');
  const [image, setImage] = useState(null);
  const [USERID, setUSERID] = useState(null); 
  const [error, setErrors] = useState('');
  const navigation = useNavigation();
 
  const turkishCities = [
    "Adana", "Adıyaman", "Afyonkarahisar", "Ağrı", "Amasya", "Ankara", "Antalya", "Artvin", "Aydın", "Balıkesir",
    "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur", "Bursa", "Çanakkale", "Çankırı", "Çorum", "Denizli", "Diyarbakır",
    "Edirne", "Elazığ", "Erzincan", "Erzurum", "Eskişehir", "Gaziantep", "Giresun", "Gümüşhane", "Hakkari", "Hatay",
    "Isparta", "Mersin", "İstanbul", "İzmir", "Kars", "Kastamonu", "Kayseri", "Kırklareli", "Kırşehir", "Kocaeli",
    "Konya", "Kütahya", "Malatya", "Manisa", "Kahramanmaraş", "Mardin", "Muğla", "Muş", "Nevşehir", "Niğde", "Ordu",
    "Rize", "Sakarya", "Samsun", "Siirt", "Sinop", "Sivas", "Tekirdağ", "Tokat", "Trabzon", "Tunceli", "Şanlıurfa",
    "Uşak", "Van", "Yozgat", "Zonguldak", "Aksaray", "Bayburt", "Karaman", "Kırıkkale", "Batman", "Şırnak", "Bartın",
    "Ardahan", "Iğdır", "Yalova", "Karabük", "Kilis", "Osmaniye", "Düzce"
  ];

  const getUserID = async () => {
    try {
      const id = JSON.parse(await AsyncStorage.getItem('id'));
      setUSERID(id ? id : null);
    } catch (error) {
      console.error('Error getting user ID:', error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getUserID();
    }, 5000); 

    return () => clearInterval(interval);  
  }, []);

  const handleImagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    const body = {
      title: title,
      description: description,
      location: location,
      price: price,
      image: image
    };

    addProduct(USERID, body)
      .then((res) => {
        if (res.status === 200) {
          Alert.alert("Ürün Eklendi");
          navigation.navigate("Ürünlerim");
        }
      })
      .catch((err) => {
        setErrors("Lütfen düzgün biçimde girin");
        console.log(err.response.data);
      });
  };
  
 
  return (
   <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View>
          {error !== "" && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}
          <Text style={styles.title}>Ürün Ekle</Text>
          <TextInput
            style={styles.input}
            placeholder='Başlık'
            value={title}
            onChangeText={(text) => {
              setTitle(text);
              setErrors('');
            }}
          />
          <TextInput
            style={[styles.input, styles.descriptionInput]}
            placeholder='Açıklama'
            multiline={true}
            numberOfLines={4}
            value={description}
            onChangeText={(text) => {
              setDescription(text);
              setErrors('');
            }}
          />
          <TextInput
            style={styles.input}
            placeholder='Fiyat'
            keyboardType='numeric'
            value={price}
            onChangeText={(text) => {
              setPrice(text);
              setErrors('');
            }}
          />
          <View style={styles.pickerContainer}>
            <Text style={styles.pickerLabel}>Konum:</Text>
            <Picker
              style={styles.picker}
              selectedValue={location}
              onValueChange={(itemValue, itemIndex) => {
                setLocation(itemValue);
                setErrors('');
              }}
            >
              {turkishCities.map(city => (
                <Picker.Item key={city} label={city} value={city} />
              ))}
            </Picker>
          </View>
          
          <View style={styles.imageContainer}>
            <TouchableOpacity onPress={handleImagePicker}>
              <Text style={styles.imagePickerButton}>Resim Seç</Text>
            </TouchableOpacity>
            {image && <Image source={{ uri: image }} style={styles.imagePreview} />}
          </View>
          <Button color='white' title='Ekle' onPress={handleSubmit} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  imagePreview: {
  width: 100,
  height: 100,
  resizeMode: 'cover',
  marginBottom: 10,
},
  container: {
    flex: 1,
    padding: 20,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  descriptionInput: {
    height: 100,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  pickerLabel: {
    marginRight: 10,
    fontSize: 16,
  },
  picker: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  imageContainer: {
    marginBottom: 20,
  },
  imageLabel: {
    fontSize: 16,
    marginBottom: 10,
  },
  imagePickerButton: {
    fontSize: 16,
    color: 'blue',
    marginBottom: 10,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  errorContainer: {
        backgroundColor: 'red',
        padding: 10,
        marginBottom: 10,
        borderRadius: 10,
    },
    errorText: {
        color: 'white',
    },
});