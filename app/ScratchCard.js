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

          <View style={styles.innerContainer}>
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

                      <Text style={styles.titleText}>Scratch Card</Text>
                      
            </View>
            <Image
                  style={styles.topupImage}
                  source={require('../img/scratchcardback.png')}
                />
            <Text style={styles.hintText}>Enter the  PIN</Text>

            <TextInput
                underlineColorAndroid = 'transparent'
                style={styles.textInputStyle}
            />
          </View>

          <View style={styles.getStarted}>

              <Text style={styles.getStartedFont}>RECHARGE</Text>
          </View>
        
        </View>

        
      );
    }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#190B48',
    justifyContent: 'space-between'
  },
  innerContainer: {
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
    alignSelf: 'center',
    width: 100,
    height: 100,
    padding: 5

  },
  hintText: {
    fontSize: 15,
    textAlign: 'left',
    margin: 5,
    marginTop: 30,
    marginLeft:15,
    color: '#ffffff',
  },
  textInputStyle: {
    height: 40,
    borderColor: '#ffffff',
    borderWidth: 1,
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 2,
    padding: 5,
    color: '#ffffff',
  },
  getStarted: {
    height:60,
    width: window.width,
    backgroundColor: '#e87a04',
    justifyContent: 'center',
  },
  getStartedFont: {
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff'
  },
});

BackHandler.addEventListener('hardwareBackPress', function() {

 return true;
});