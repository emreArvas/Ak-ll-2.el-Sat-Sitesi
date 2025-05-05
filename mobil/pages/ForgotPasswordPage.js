import { Alert, Button, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TextInput, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

export default function ForgotPasswordPage() {
    const navigation = useNavigation();
    const handleLogin=() => {
       navigation.navigate("Giriş Yap")
  }
  const send = () => {
    
  }
  return (
     <View>
        <SafeAreaView style={styles.container}>
        <View>
          <Text style={styles.title}>Şifremi Unuttum</Text>
          <TextInput  style={styles.input} placeholder='Email'></TextInput>
              
              <Button color='white' title='Gönder' ></Button>
             
          </View>
           <TouchableWithoutFeedback style={styles.link}  >
              <Text onPress={handleLogin}>Giriş Yap</Text>
              
      </TouchableWithoutFeedback>
          
    </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
     title: {
        marginBottom: 25, 
        textAlign: 'center',
        fontSize: 25,
        
    },
    input: {
    width: 270,
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',    
    },
    container : {
    alignItems : "center",
    paddingTop: 150,
    },
    link: {
        marginRight : 200,
        marginTop : 20,
        alignItems : 'flex-start'
  },
})