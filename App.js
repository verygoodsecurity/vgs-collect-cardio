import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import Cardio from '.';


export default function App() {
  const [card, setCard] = useState([]);
  
  const storeCard = cardItem => {
    setCard([
      ...card,
      cardItem
    ]);
  }
  
  return (
    <View style={styles.container}>
      {card.map((item, key) => (
        <Text key={key}>{item.cardNumber} - {item.expiryMonth} / {item.expiryYear}</Text>
      ))}

      <Cardio 
        onSuccess={(card) => storeCard(card)}
        styles={{
          VGSCardIOWrapper: styles.VGSCardIOWrapper,
          VGSCardIOText: styles.VGSCardIOText
        }}
        loader="Loader text"
      >
        Scan BTN!
      </Cardio>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  VGSCardIOWrapper: { 
    marginTop: 20,
    padding: 20,
    backgroundColor: 'green',
  },
  VGSCardIOText: {
    color: 'red',
  }
})
