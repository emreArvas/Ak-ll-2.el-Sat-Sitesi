import { Alert, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './HomeScreen';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AddProductPage from './pages/AddProductPage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-paper';
import CartPage from './pages/CartPage';
import OrderPage from './pages/OrderPage';
import InComingOrdersPage from './pages/InComingOrdersPage';
import MyProductsPage from './pages/MyProductsPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';

const Drawer = createDrawerNavigator();

const ProfileScreen = ({ handleLogout }) => {
  return (
    <View style={styles.container}>
      <Button onPress={handleLogout}>Çıkış Yap</Button>
    </View>
  );
}

export default function App() {
  const [isLogin, setIsLogin] = useState(false);
  const login = AsyncStorage.getItem('isLogin');
  

 useEffect(() => {
  const getLoginStatus = async () => {
    try {
      const value = await AsyncStorage.getItem('isLogin');
      
      
      if (value === "true") {
        setIsLogin(true);
      }
    } catch (error) {
      console.error('Error getting login status:', error);
    }
  };

  const interval = setInterval(() => {
    getLoginStatus();
  }, 5000); 

  
  return () => clearInterval(interval);
}, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('isLogin');
      await AsyncStorage.removeItem('id');
      setIsLogin(false);
      Alert.alert("Çıkış", "Çıkış Yapıldı")
      
    } catch (error) {
      console.error('Error setting login status:', error);
    }
  };
console.log(login)
  return (
    
    <NavigationContainer>
      {isLogin ? (
        <Drawer.Navigator initialRouteName="Anasayfa">
          <Drawer.Screen name="Anasayfa" component={HomeScreen} />
          <Drawer.Screen name="Ürünlerim" component={MyProductsPage} />
          <Drawer.Screen name="Siparişlerim" component={OrderPage} />
          <Drawer.Screen name="Gelen Siparişler" component={InComingOrdersPage} />
          <Drawer.Screen name="Ürün Ekle" component={AddProductPage} />
          <Drawer.Screen name="Sepetim" component={CartPage} />
          <Drawer.Screen name="Çıkış Yap" >
            {props => <ProfileScreen {...props} handleLogout={handleLogout} />}
          </Drawer.Screen>
        </Drawer.Navigator>
      ) : (
        <Drawer.Navigator initialRouteName="Anasayfa">
          <Drawer.Screen name="Anasayfa" component={HomeScreen} />
          <Drawer.Screen name="Giriş Yap" component={LoginPage} />
            <Drawer.Screen name="Kayıt ol" component={RegisterPage} />
            <Drawer.Screen name="Şifremi Unuttum" component={ForgotPasswordPage} />
        </Drawer.Navigator>
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});