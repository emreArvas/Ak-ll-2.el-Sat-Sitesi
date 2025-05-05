// AppDrawer.js

import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';


import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-paper';
import { Alert, View } from 'react-native';


import HomeScreen from '../HomeScreen';
import AddProductPage from '../pages/AddProductPage'
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage'
import { useNavigation } from '@react-navigation/native';
const Drawer = createDrawerNavigator();

const ProfileScreen = ({ handleLogout }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button onPress={handleLogout}>Çıkış Yap</Button>
    </View>
  );
}
const navigation = useNavigation();

const AppDrawer = ({ isLogin }) => {
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('isLogin');
      await AsyncStorage.removeItem('id');
      
        Alert.alert("Çıkış", "Çıkış Yapıldı")
        
    } catch (error) {
      console.error('Error setting login status:', error);
    }
  };

  return (
    <Drawer.Navigator initialRouteName={isLogin ? "Anasayfa" : "Giriş Yap"}>
      {isLogin ? (
        <>
          <Drawer.Screen name="Anasayfa" component={HomeScreen} />
          <Drawer.Screen name="Ürünlerim" component={HomeScreen} />
          <Drawer.Screen name="Siparişlerim" component={HomeScreen} />
          <Drawer.Screen name="Gelen Siparişler" component={HomeScreen} />
          <Drawer.Screen name="Ürün Ekle" component={AddProductPage} />
          <Drawer.Screen name="Sepetim" component={HomeScreen} />
          <Drawer.Screen name="Çıkış Yap">
            {props => <ProfileScreen {...props} handleLogout={handleLogout} />}
          </Drawer.Screen>
        </>
      ) : (
        <>
          <Drawer.Screen name="Anasayfa" component={HomeScreen} />
          <Drawer.Screen name="Giriş Yap" component={LoginPage} />
          <Drawer.Screen name="Kayıt ol" component={RegisterPage} />
        </>
      )}
    </Drawer.Navigator>
  );
}

export default AppDrawer;
