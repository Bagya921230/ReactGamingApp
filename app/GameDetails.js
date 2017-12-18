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
  Dimensions,
  FlatList,
  ScrollView,
  AsyncStorage
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import ProgressBar from 'react-native-progress/Bar';
import { RecyclerListView, DataProvider, LayoutProvider } from "recyclerlistview";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';


const window = Dimensions.get('window');
var imageURI = 'http://books.google.com/books/content?id=PCDengEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api'



export default class GameDetails extends Component {


    _onPressButton() {
        // Alert.alert('You tapped the button!')
        Actions.pop();
      }

      constructor(props) {
        super(props);
        this.state = { isLoading: true
                      };

       }

      async _getToken(){
            try {
              const value = await AsyncStorage.getItem('@MySuperStore:token');
              if (value !== null){
                // We have data!!
                console.log(value);

                this.setState({token: value}, () => { 
                    // Do something here. 
                    this._onPressButtonGET();
                });


              }
            } catch (error) {
              // Error retrieving data
            }
      }

    componentDidMount() {

        this._getToken();
        // this._onPressButtonGET();
     }


    _onPressButtonGET(){


    
        fetch(`http://gaming.dialog.lk/api/v2/getAppDetails/?id=${this.props.appId}`,{  
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `${this.state.token}`
          }
        })
         .then((response) => response.json())
         .then((responseJson) => {
            if(responseJson.responseCode=="00"){
               this.setState({
                 isLoading: false,
                 gameDescription: responseJson.responseBody.description,
                 gameTitle: responseJson.responseBody.appName,
                 gameIcon: responseJson.responseBody.icon,
                 buttonText: responseJson.responseBody.buttonText,
                 gameSize: responseJson.responseBody.fileSize,


               }, function() {
                   // Alert.alert(responseJson.responseBody.toString())
                 // In this block you can do something with new state.
               });
           }
         })
         .catch((error) => {
           console.error(error);
         });
    }



    render() {

          return (
              <View style={styles.container}>
                
                <Image
                    style={styles.fullWidthContainer}
                    source={require('../img/game_detailed_cover.png')}
                  >   

                  <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginLeft: 15,
                    marginRight: 15,
                    marginTop: 30
                  }}>
                    <TouchableOpacity onPress={this._onPressButton}>
                      <Image
                          style={styles.image}
                          source={require('../img/go-back-left-arrow.png')}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Image
                          style={styles.image1}
                          source={require('../img/sharing-interface.png')}
                        />
                    </TouchableOpacity>
                  </View>

                  

                  <View style={styles.buttonStyle}>

                    <Image style={styles.roundedSquare}
                                    source={{uri:this.state.gameIcon}}
                                  />

                  </View>

                </Image>

                 <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginLeft: 20,
                    marginRight: 15
                  }}>
                    <View style={{
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}>
                      <Text style={styles.walletBalanceText}>{this.state.gameTitle}</Text>
                    </View>
                    <TouchableOpacity style = {{marginTop: 20}}>
                        <View style = {{backgroundColor: '#E87E04', marginTop: 5,
                        alignItems: 'center', height: 30 ,width:100, padding: 10, borderRadius: 2,
                                        justifyContent: 'center'}}
                               >
                            <Text style = {{color: 'white'}}>{this.state.buttonText}</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{
                    marginLeft: 15,
                    marginRight: 15
                  }}>
                    <Text style={styles.gameSize}>Game Size: {this.state.gameSize} MB</Text>
                </View>


                <View style={{
                  marginTop: 15,
                    marginLeft: 15,
                    marginRight: 15
                  }}>


                    <Text style={styles.welcome}>{this.state.gameDescription}</Text>
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
  walletBalanceText: {
    fontSize: 22,
    textAlign: 'left',
    height: 50,
    width: 180,
    marginTop: 15,
    color: '#ffffff',
  },
  fullWidthContainer: {
    height:250,
    width: window.width,
    resizeMode: 'stretch',
    backgroundColor:'#190B48',
  },
  welcome: {
    fontSize: 12,
    textAlign: 'justify',
    margin: 5,
    marginLeft: 10,
    color: '#ffffff',
  },
  gameSize: {
    fontSize: 12,
    textAlign: 'right',
    margin: 5,
    marginLeft: 10,
    color: '#ffffff',
  },
  userNameText: {
    fontSize: 13,
    textAlign: 'center',
    marginTop: 10,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  levelText: {
    fontSize: 12,
    textAlign: 'center',
    margin: 3,
    color: '#ffffff'
  },
  buttonStyle: {
    height: 55,
    marginTop: 85,
    marginLeft: 15,
    marginRight: 15,
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    width: 17,
    height: 17,
    padding: 5,
    marginRight:10

  },
  circleImage: {
    borderWidth:2,
    borderColor:'#fff',
    alignItems:'center',
    justifyContent:'center',
    width:72,
    height:72,
    borderRadius:35,
  },
  roundedSquare: {
    width: 100,
    height: 95,
    borderRadius: 6,
    resizeMode: 'stretch',
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