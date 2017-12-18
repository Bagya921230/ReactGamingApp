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


export default class GameHome extends Component {

    _onPressButton() {
        // Alert.alert('You tapped the button!')
        Actions.pop();
      }

    render() {

          return (
            <View style={styles.container}>

              <Text style={styles.welcome}>GameHome
              </Text>
            
            </View>

        
      );
    }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#190B48',
  },
  welcome: {
    fontSize: 15,
    textAlign: 'center',
    margin: 5,
    marginTop: 140,
    marginLeft: 20,
    marginRight: 20,
    color: '#ffffff',
  }
});

BackHandler.addEventListener('hardwareBackPress', function() {

 return true;
});