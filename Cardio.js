import React, { useState, useEffect } from 'react'
import { TouchableOpacity, StyleSheet, Text, Platform, Button } from 'react-native'
import { CardIOModule, CardIOUtilities } from 'react-native-awesome-card-io'

export default function Cardio(props) {
  const [rawCard, setRawCard] = useState(null)
  // const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    return () => {
      if (Platform.OS === 'ios') {
        CardIOUtilities.preload()
      }
    }
  }, []);
  
  const scanCard = () => {
    const config = {
      requireCardholderName: true,
    }
    CardIOModule
      .scanCard(config)
      .then(rawCard => {
        setRawCard(rawCard)
        
        fetch('https://tntxwjvjals.SANDBOX.verygoodproxy.com/post', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            expiryYear: rawCard.expiryYear,
            expiryMonth: rawCard.expiryMonth,
            cvv: rawCard.cvv,
            cardNumber: rawCard.cardNumber,
            cardholderName: rawCard.cardholderName,
          }),
        })
        .then((response) => {
          return response.json()
        })
        .then((responseJson) => {
          props.onSuccess(JSON.parse(responseJson.data))
          setRawCard(null)
          return responseJson;
        })
        .catch((error) => {
          console.log(error)
        });

      })
      .catch(() => {
        // the user cancelled
      })
  }

  
  if (!rawCard) {
    return (
      <TouchableOpacity
        accessibilityLabel="Press to start scaning credit card"
        style={props.styles.VGSCardIOWrapper}
        onPress={() => scanCard()}
      >
        <Text style={props.styles.VGSCardIOText}>{props.children}</Text>
      </TouchableOpacity>

    );
  } else {
    return (
      <Text>{props.loader? props.loader : 'Loading...'}</Text>
    )
  }
  
}
