import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler';
import { Button } from 'react-native';

export default function MyOrderListPage({ order, cancelClick }) {
   const { id, product, orderStatus, datePostes } = order;
  const { image, title, description, price, location } = product;
  const sendDetailPage=() => {
    
  }
  const cancelButton=() => {
    cancelClick(id);
  }
  return (
    
      <ScrollView>
            <View style={styles.container}>
                <View style={styles.productCard}>
                 <View >
                    {image && image.includes('image') ?
                        <Image style={styles.image} source={{ uri: image }} /> :
                        image && image.includes('video') ?
                            <Video style={styles.video} source={{ uri: image }} /> :
                            <Image style={styles.avatar} source={{uri : image}} /> // Varsayılan avatar resmini göster
                    }
          </View>
        
                    <View style={styles.cardContent}>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.description}>{description}</Text>
                        <Text style={styles.orderStatus}>{orderStatus}</Text>
                        <Button
                            onPress={cancelButton}
                            title="İPTAL"
                            color="red"
                            style={styles.cancelButton}
                        />
                    </View>
                </View>
            </View>
        </ScrollView>
    
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  productCard: {
    flexDirection: 'column',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
  },
  image: {
    height: 220,
    width: 'auto', 
    resizeMode: 'cover', 
    borderRadius: 10, 
  },
  cardContent: {
    flex: 1,
    padding: 10,
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
  orderStatus: {
    fontSize: 16,
    marginBottom: 10,
  },
  cancelButton: {
    marginTop: 10,
  },
});

