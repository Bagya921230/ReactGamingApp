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
  Dimensions
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { renderIf } from 'render-if';


const window = Dimensions.get('window');

export default class EditProfile extends Component {

    _onPressButton() {
        // Alert.alert('You tapped the button!')
        Actions.pop();
      }

    constructor(props) {
        super(props);
        this.state = { status: false};
    }

    showBottomMenu(){
      if (this.state.status==true) {
        this.setState({status: false});
      }else{
        this.setState({status: true});
      }

    }

    render() {
      return (
        <View style={styles.container}>
          <Text style={styles.welcome}>Create your profile</Text>
          <View style={{flex: 1}}>
          <View style={{
              width: window.width,
              height: 200,
              alignSelf: 'center',
              alignItems: 'center',
              marginLeft: 15,
              marginRight: 15}}>
              <TouchableOpacity onPress={this.showBottomMenu.bind(this)}>
                <Image style={styles.circleImage} source={require('../img/avatar.png')}  />
                <Text style={styles.changeText} >Change Photo</Text>
              </TouchableOpacity>
          </View>
          <Text style={styles.hintText}>Gamer Name</Text>
          <TextInput underlineColorAndroid = 'transparent'style={styles.textInputStyle}/>
          <View style={styles.buttonStyle}>
              <Text style={styles.buttonText}>FINISH</Text>
          </View>
          </View>
          {(this.state.status==true)?
          (
            <View style={styles.openGalleryOrCamera}>
            <Image style={styles.galleryImage} source={require('../img/gallery.png')}/>
            <Image style={styles.cameraImage} source={require('../img/camera.png')}/>
          </View>
          ):(null)
        }
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
    marginTop: 40,
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
  changeText: {
    fontSize: 12,
    textAlign: 'center',
    height: 25,
    width: 100,
    margin: 5,
    marginTop: 125,
    position: 'absolute',
    backgroundColor: '#F80A0618',
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
    padding: 5
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
  circleImage: {
    marginTop:30,
    borderWidth:2,
    borderColor:'#fff',
    alignItems:'center',
    alignSelf:'center',
    justifyContent:'center',
    width:120,
    height:120,
    borderRadius:120,
  },
  openGalleryOrCamera: {
    backgroundColor: '#ffffff',
    height:150,
    justifyContent:'center',
    flexDirection:'row',
  },
  galleryImage: {
      alignItems:'center',
      alignSelf:'center',
      marginRight: 70,
      width:50,
      height:45,
  },
  cameraImage: {
      alignItems:'center',
      alignSelf:'center',
      marginLeft: 70,
      width:50,
      height:42.5,
  },
});

BackHandler.addEventListener('hardwareBackPress', function() {

 return true;
});
