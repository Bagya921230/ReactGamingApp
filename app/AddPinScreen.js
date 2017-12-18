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
  Alert,
  AsyncStorage,
  ToastAndroid
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import base64 from 'base-64';
import SmsListener from 'react-native-android-sms-listener'

SmsListener.addListener(message => {
  console.log(message)
  Alert.alert(message.toString())
})


export default class AddPinScreen extends Component {

    _onPressButton() {
        // Alert.alert('You tapped the button!')
        Actions.pop();
      }



    constructor(props) {
        super(props);
        this.state = { isLoading: true,
                        pin:''
                      };

       }

      componentWillMount() {
          AsyncStorage.clear(() => AsyncStorage.setItem('@MySuperStore:token', ''))
        }


    async _setToken(value) {
          // AsyncStorage.setItem("token", value);
          // this.setState({"token": value});

          try {
            AsyncStorage.clear();
            await AsyncStorage.setItem('@MySuperStore:token', value);

          } catch (error) {
            // Error saving data
          }
    }


    _loginRequest(){

      if(`${this.state.pin}`==""){

        ToastAndroid.show('Please enter the PIN', ToastAndroid.SHORT);
      }else{
        
      fetch('http://gaming.dialog.lk/api/v2/auth',{  
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            msisdn: `${this.props.msisdn}`,
            pin: `${this.state.pin}`,
            deviceToken: ""
          })
        })
         .then((response) => response.json())
         .then((responseJson) => {
            if(responseJson.responseCode=="00"){
             this.setState({
               isLoading: false,
               authToken: responseJson.responseBody.token,
               userName: responseJson.responseBody.userName,
             }, function() {

                  var toencode = `${this.state.userName}:${this.state.authToken}`
                  var encodedData = base64.encode(`${this.state.userName}:${this.state.authToken}`);
                  console.log(`name= ${this.state.userName}`);
                  console.log(`token= ${this.state.authToken}`);
                  console.log(encodedData);
                  this._setToken("Basic "+encodedData);

                  Actions.actionHomeScreen();
               // In this block you can do something with new state.
             });
           }
         })
         .catch((error) => {
           console.error(error);
         });


      }

    }


    render() {

          return (
        <View style={styles.container}>

          <TouchableOpacity onPress={this._onPressButton}>
            <Image
              style={styles.image}
              source={require('../img/go-back-left-arrow.png')}
            />
          </TouchableOpacity>
          
          <Text style={styles.welcome}>A code was sent to your number for{"\n"} verification. Enter it below to proceed.
          </Text>

          <Text style={styles.hintText}>The PIN</Text>

          <TextInput
              underlineColorAndroid = 'transparent'
              style={styles.textInputStyle}
              value={this.state.pin}
              onChangeText={(pin) => this.setState({pin})}
          />

          <View style={styles.buttonStyle}>

              <Text style={styles.buttonText} onPress={() => this._loginRequest()}>VERIFY</Text>
          </View>

          <Text style={styles.getPin}>Didn't get the PIN?</Text>
          <Text style={styles.resendPin}>RESEND NOW</Text>
        
        </View>

        
      );
    }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#190B48',
  },
  fullWidthContainer: {
    flex: 1,
    justifyContent: 'center',
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
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff'
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
  buttonStyle: {
    height: 55,
    borderWidth: 1,
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    padding: 5,
    backgroundColor: '#e87a04'
  },
  image: {
    marginTop: 35,
    marginLeft: 16,
    width: 17,
    height: 17,
    padding: 5

  },
  getPin: {
    fontSize: 15,
    textAlign: 'center',
    margin: 5,
    marginTop: 100,
    marginLeft: 20,
    marginRight: 20,
    color: '#ffffff',
  },
  resendPin: {
    fontSize: 15,
    textAlign: 'center',
    margin: 5,
    marginTop: 5,
    marginLeft: 20,
    marginRight: 20,
    color: '#e87a04',
    textDecorationLine: 'underline'
  },
});

BackHandler.addEventListener('hardwareBackPress', function() {

 return true;
});