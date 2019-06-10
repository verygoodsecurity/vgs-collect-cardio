import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Platform } from 'react-native';
import { CardIOModule, CardIOUtilities } from 'react-native-awesome-card-io';
import CollectView from './CollectView';


export default function App() {
  const [card, setCard] = useState(null);

  useEffect(() => {
    return () => {
      if (Platform.OS === 'ios') {
        CardIOUtilities.preload();
      }
    }
  }, []);
  
  const scanCard = () => {
    const config = {
      suppressConfirmation: true,
      hideCardIOLogo: true,
      requireExpiry: true, 
      requireCardholderName: true,
    }
    CardIOModule
      .scanCard(config)
      .then(card => {
        setCard(card)
        console.log('---->', card)
      })
      .catch(() => {
        // the user cancelled
      })
  }

  

  
  if (!card) {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => scanCard()}><Text>Sceean cardыыы!</Text></TouchableOpacity>
      </View>
      // <CollectView card={card} success={(data) => success(data)} />
      // <CollectView
      //   card={{cardNumber: '4111444111'}}
      // />
    );
  } else {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => scanCard()}><Text>Scan card!</Text></TouchableOpacity>
      </View>
    )
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
})