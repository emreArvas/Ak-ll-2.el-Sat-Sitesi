import { Alert, Button, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TextInput, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { createUser } from '../server/api'

export default function RegisterPage() {
  const [body, setBody] = useState({ username: '', email: '', password: '' })
  const [error,setError]=useState("")
  const usernameChange=(text) => {
    setBody({ ...body, username: text });
    setError("");
    console.log(body);
  }
  const emailChange=(text) => {
    setBody({ ...body, email: text });
    setError("");
    console.log(body);
  }
  const passwordChange=(text) => {
    setBody({ ...body, password: text });
    setError("");
    console.log(body);
  }
  const navigation = useNavigation();
  const registerClick=() => {
       createUser(body).then((res) => { 
            if (res.status == 200) {
                Alert.alert("Kayıt Başarılı")
                navigation.navigate("Giriş Yap")
            }
        }).catch((err) => {
          console.log(err.response.data.errors);
          setError("Lütfen bilgileri doğru bir biçimde girin")
            
      })
  }
  const handleLogin = () => {
    navigation.navigate("Giriş Yap")
  }
  return (
    <View>
        <SafeAreaView style={styles.container}>
        <View>
          {error !== "" && 
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                </View>}
          <Text style={styles.title}>Kayıt Ol</Text>
          <TextInput onChangeText={usernameChange}  style={styles.input} placeholder='Kullanıcı Adı'></TextInput>
              <TextInput onChangeText={emailChange}  style={styles.input} placeholder='Email'></TextInput>
              <TextInput onChangeText={passwordChange} style={styles.input} placeholder='Şifre'></TextInput>
              <Button color='white' title='Kayıt' onPress={registerClick}></Button>
             
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
    errorContainer: {
        backgroundColor: 'red',
        padding: 10,
        marginBottom: 10,
        borderRadius: 10,
    },
    errorText: {
        color: 'white',
    },
})