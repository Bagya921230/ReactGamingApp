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
  ToastAndroid
} from 'react-native';
import { Actions } from 'react-native-router-flux';


export default class AddNumberScreen extends Component {

    _onPressButton() {
        Alert.alert('You tapped the button!')
      }

      constructor(props) {
        super(props);
        this.state = { isLoading: true,
                        number:''
                      };

       }

    _sendPinRequest(){

      if(`${this.state.number}`==""){

        ToastAndroid.show('Please enter the Mobile Number', ToastAndroid.SHORT);

      }else{  

          fetch('http://gaming.dialog.lk/api/v2/auth',{  
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Basic dGVzdGluZzphNzc5Nzc5OS1hYWRlLTRhYzItOTI0YS1hYTMxMzRiNjgyYWJER0E='
              },
              body: JSON.stringify({
                msisdn: `${this.state.number}`,
                pin: null,
                deviceToken: ""
              })
            })
             .then((response) => response.json())
             .then((responseJson) => {
                if(responseJson.responseCode=="00"){
                   this.setState({
                     isLoading: false,
                     description: responseJson.responseDescription
                   }, function() {

                        Actions.actionAddPin({msisdn: this.state.number});
                       // Alert.alert(`${this.state.description}`)
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
          <Image 
          style={styles.image}
          resizeMode="contain"
          source={require('../img/bitmap.png')}
          />
          <Text style={styles.welcome}>Join and become a part of {"\n"}Sri Lanka's largest gaming community</Text>

          <Text style={styles.hintText}>Your mobile number</Text>

          <TextInput
              underlineColorAndroid = 'transparent'
              style={styles.textInputStyle}
              value={this.state.number}
              onChangeText={(number) => this.setState({number})}
              keyboardType = 'numeric'
          />

          <View style={styles.buttonStyle}>

              <Text style={styles.buttonText}  onPress={() => this._sendPinRequest()} >ENTER</Text>
          </View>
        
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
    marginTop: 15,
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
    marginTop: 100,
    width: 189,
    height: 100,
    alignSelf:'center'
  },
});

BackHandler.addEventListener('hardwareBackPress', function() {

 return true;
});