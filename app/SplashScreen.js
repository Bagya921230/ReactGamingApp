// app/ScarletScreen.js

import {StyleSheet, View, Text, Image, TouchableOpacity,BackHandler,AsyncStorage} from 'react-native';
import React, {Component} from 'react';
import { Actions } from 'react-native-router-flux'; // New code




export default class SplashScreen extends Component {

  componentWillMount(){
    this._getToken();
  }

  async _getToken(){
          try {
            const value = await AsyncStorage.getItem('@MySuperStore:token');
            if (value !== null){
              setTimeout (() => {
                Actions.actionHomeScreen();
              }, 2000);
            }else{
              setTimeout (() => {
                Actions.OnBoarding();
              }, 2000);
            }
          } catch (error) {
            // Error retrieving data
          }
    }

    render() {
        return (
            <View style = {styles.container}>
              <Image style = {styles.backgroundImage} source = {require('../img/background.png')}>
                <Image  style = {styles.backgroundImage} source = {require('../img/backgroundtransparent.png')}>
                  <Image style = {styles.image} source = {require('../img/bitmap.png')}></Image>
                </Image>
              </Image>
            </View>
        );
    }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    resizeMode: 'contain',
    height:100,
    marginBottom: 200,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

BackHandler.addEventListener('hardwareBackPress', function() {
  exitApp();
 return false;
});
