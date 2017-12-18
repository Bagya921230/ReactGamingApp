// app/ScarletScreen.js

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View ,
  Image ,
  BackHandler,
  TextInput,
  Button,
  TouchableOpacity,
  Alert
} from 'react-native';
import { Actions } from 'react-native-router-flux';


export default class TopUpWallet extends Component {

    _onPressButton() {
        // Alert.alert('You tapped the button!')
        Actions.pop();
      }

    render() {

          return (
        <View style={styles.container}>

          <View style={{
                      flexDirection: 'row',
                      marginLeft: 10,
                      marginTop: 5
                    }}>
                    <TouchableOpacity onPress={this._onPressButton}>
                      <Image
                        style={styles.image}
                        source={require('../img/go-back-left-arrow.png')}
                      />
                    </TouchableOpacity>

                    <Text style={styles.titleText}>Recharge Mode</Text>
                    
          </View>
          <Text style={styles.gameLabelText}>CURRENT BALANCE</Text>
          <Text style={styles.gameCountText}>Rs. 0.00</Text>
          <Text style={styles.gameLabelText}>SELECT RECHARGE MODE</Text>
              
          <TouchableOpacity onPress={() => Actions.actionScratchCard()}>
            <Image
                style={styles.topupImage}
                source={require('../img/scratchcardback.png')}
              />
            <Text style={styles.methodText}>Scratch Card</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => Actions.actionAddToBill()}>
            <Image
                style={styles.topupImage}
                source={require('../img/invoice.png')}
              />
            <Text style={styles.addToBillMethodText}>Add To Bill</Text>
          </TouchableOpacity>

        
        </View>

        
      );
    }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#190B48',
  },
  methodText: {
    fontSize: 14,
    textAlign: 'left',
    marginTop: 15,
    marginLeft: 70,
    color: '#ffffff',
  },
  addToBillMethodText: {
    fontSize: 14,
    textAlign: 'left',
    marginTop: 15,
    marginLeft: 77,
    color: '#ffffff',
  },
  gameCountText: {
    fontSize: 22,
    textAlign: 'left',
    marginTop: 15,
    color: '#ffffff',
    fontWeight: 'bold',
    marginLeft: 20,
  },
  gameLabelText: {
    fontSize: 16,
    textAlign: 'left',
    marginTop: 20,
    color: '#ffffff',
    marginLeft: 20,
  },
  welcome: {
    fontSize: 15,
    textAlign: 'center',
    margin: 5,
    marginTop: 140,
    marginLeft: 20,
    marginRight: 20,
    color: '#ffffff',
  },
  titleText: {
    fontSize: 22,
    textAlign: 'left',
    margin: 5,
    marginTop: 30,
    marginLeft:30,
    color: '#ffffff',
  },
  image: {
    marginTop: 35,
    marginLeft: 10,
    width: 17,
    height: 17,
    padding: 5

  },
  topupImage: {
    marginTop: 30,
    marginLeft: 50,
    width: 100,
    height: 100,
    padding: 5

  }
});

BackHandler.addEventListener('hardwareBackPress', function() {

 return true;
});