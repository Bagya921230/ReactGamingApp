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

// let avatar = this.state.avatar==null ? require('../img/diamond1.png') : {uri:this.state.avatar};
const window = Dimensions.get('window');
var imageURI = 'http://books.google.com/books/content?id=PCDengEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api'



export default class ProfileScreen extends Component {


    _onPressButton() {
        // Alert.alert('You tapped the button!')
        Actions.pop();
      }

      componentDidMount() {

        this._getToken();

      }
      constructor(props) {
        super(props);
        this.state = { avatar: null,userName: "",currentLevelPoints:1,currentLevelEarnedPoints:0,myWalletAccount:"",balance:""
      ,userSubscriptions:""};

       }

      async _getToken(){
              try {
                const value = await AsyncStorage.getItem('@MySuperStore:token');
                if (value !== null){
                  // We have data!!
                  console.log(value);


                  this.setState({token: value}, () => {
                     this._getUserDetails();
                     this._getLevelPoints();
                     this._getWalletBalance();
                     this._getUserSubscriptions();
                  });


                }
              } catch (error) {
                // Error retrieving data
              }
        }

      _getUserDetails() {

          fetch('http://gaming.dialog.lk/api/v2/tokenValidation',{
            method: 'POST',
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
               userName: responseJson.displayName,
               avatar: responseJson.avatar,
               myWalletAccount: responseJson.myWalletAccount,
             }, function() {
               // In this block you can do something with new state.
             });
            }
           })
           .catch((error) => {
             console.error(error);
           });

       }

       _getLevelPoints() {

         fetch('http://gaming.dialog.lk/api/v2/getLevelPoints',{
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
              currentLevel: responseJson.responseBody.currentLevel,
              currentLevelPoints: responseJson.responseBody.currentLevelPoints,
              currentLevelEarnedPoints:responseJson.responseBody.currentLevelEarnedPoints,
              totalUserPoints:responseJson.responseBody.totalUserPoints,
              lessPointsToNextLevel:responseJson.responseBody.lessPointsToNextLevel,
            }, function() {
              // In this block you can do something with new state.
            });
           }
          })
          .catch((error) => {
            console.error(error);
          });

      }

      _getWalletBalance() {

        fetch('http://gaming.dialog.lk/api/v2/getWalletBalance',{
          method: 'POST',
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
             balance: responseJson.responseBody.balance,
             myWalletAccount: responseJson.responseBody.myWalletAccount,
           }, function() {
             // In this block you can do something with new state.
           });
          }
         })
         .catch((error) => {
           console.error(error);
         });

      }

      _getUserSubscriptions() {

        fetch('http://gaming.dialog.lk/api/v2/getUserSubscriptions',{
          method: 'POST',
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
             userSubscriptions: responseJson.responseBody,
           }, function() {
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
            <ScrollView>
              <View style={styles.container}>

                <Image
                    style={styles.fullWidthContainer}
                    source={require('../img/cover.png')}
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
                    <TouchableOpacity
                       onPress={() => Actions.actionEditProfile()}>
                      <Image
                          style={styles.image1}
                          source={require('../img/ic_edit_profile.png')}
                        />
                    </TouchableOpacity>
                  </View>



                  <View style={styles.buttonStyle}>

                    <Image style={styles.circleImage}
                                    source={this.state.avatar==null ? require('../img/avatar.png'):{uri:this.state.avatar}}
                                  />

                    <Text style={styles.userNameText}>{this.state.userName}</Text>
                    <Text style={styles.levelText}>{this.state.currentLevel}</Text>

                  </View>

                </Image>

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                    <Text style={styles.pointLabelText}>Points    </Text>
                    <Text style={styles.pointsText}>{this.state.totalUserPoints}</Text>
                </View>


                <View style={styles.getStarted}>
                  <ProgressBar borderWidth={0} borderColor={'#542831'} unfilledColor={'#542831'} progress={this.state.currentLevelEarnedPoints/this.state.currentLevelPoints} width={window.width-2} height={5} color={'#E87E04'} borderRadius={4} />
                </View>

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginLeft: 15,
                    marginRight: 15
                  }}>
                    <Text style={styles.pointLabelText}>{this.state.lessPointsToNextLevel} points more</Text>
                    <Text style={styles.pointLabelText}>Level {this.state.currentLevel+1}</Text>
                </View>

                <View style={{
                    flexDirection: 'row',
                    marginLeft: 15,
                    marginTop: 10
                  }}>
                    <Text style={styles.gameCountText}>{this.state.userSubscriptions.length}  </Text>
                    <Text style={styles.gameLabelText}>Games</Text>
                </View>

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginLeft: 15,
                    marginRight: 15
                  }}>
                    <View style={{
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}>
                      <Text style={styles.walletLabelText}>MY WALLET</Text>
                      <Text style={styles.walletBalanceText}> {this.state.myWalletAccount==null ? "N/A":"Rs. "+this.state.balance}</Text>
                    </View>
                    <TouchableOpacity style = {{marginTop: 20}} onPress={() => Actions.actionTopUpWallet()}>
                        <View style = {{backgroundColor: '#E87E04', marginTop: 20,
                        alignItems: 'center', height: 30 , padding: 10, borderRadius: 2,
                                        justifyContent: 'center'}}
                               >
                            <Text style = {{color: 'white'}}>TOP-UP WALLET</Text>
                        </View>
                    </TouchableOpacity>
                </View>


                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginLeft: 15,
                    marginTop: 10,
                    marginRight: 15
                  }}>
                  <Text style={styles.purchasedLabelText}>PURCHASED GAMES</Text>
                  <Text style={styles.pointsText}>See More</Text>

                </View>


                <FlatList
                  horizontal={true}
                  data={this.state.userSubscriptions
                }

                  renderItem={({item}) =>
                  <View style={{
                            marginLeft: 15,
                            marginTop: 10,
                            height: 115,
                            width: 100,
                            backgroundColor: '#ffffff',
                            borderRadius: 3,

                          }}>

                            <Image

                                style={styles.roundedSquare}
                                source={{uri:item.icon}}
                              >
                            </Image>


                            <Text style={styles.gameNameText}>{item.key}</Text>
                  </View>
                }
                />
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginLeft: 15,
                    marginRight: 15,
                    marginTop: 10
                  }}>

                  <Text style={styles.accountLabelText}>CONNECT ACCOUNTS</Text>
                  <Text style={styles.pointsText}>Edit Accounts</Text>

                </View>

                <View style={styles.facebookAccountContainer}>

                      <Text style={styles.welcome}>Facebook</Text>
                      <TouchableOpacity>
                        <View style = {{backgroundColor: 'transparent',marginRight: 15,borderColor:'white',
                        alignItems: 'center', height: 30 ,width: 110, padding: 10, borderRadius: 2,borderWidth: 0.7,
                                        justifyContent: 'center'}}
                               >
                            <Text style = {{color: 'white',fontSize: 12}}>CONNECT</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.googleAccountContainer}>

                      <Text style={styles.welcome}>Google</Text>
                      <TouchableOpacity>
                        <View style = {{backgroundColor: 'transparent',marginRight: 15,borderColor:'white',
                        alignItems: 'center', height: 30 ,width: 110, padding: 10, borderRadius: 2,borderWidth: 0.7,
                                        justifyContent: 'center'}}
                               >
                            <Text style = {{color: 'white',fontSize: 12}}>CONNECT</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.accountContainer}>

                      <Text style={styles.welcome}>Dialog Home Broadband</Text>
                      <TouchableOpacity>
                        <View style = {{backgroundColor: 'transparent',marginRight: 15,borderColor:'white',
                        alignItems: 'center', height: 30 ,width: 110, padding: 10, borderRadius: 2,borderWidth: 0.7,
                                        justifyContent: 'center'}}
                               >
                            <Text style = {{color: 'white',fontSize: 12}}>CONNECT</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.accountContainer}>

                      <Text style={styles.welcome}>Dialog Mobile Broadband</Text>
                      <TouchableOpacity>
                        <View style = {{backgroundColor: 'transparent',marginRight: 15,borderColor:'white',
                        alignItems: 'center', height: 30,width: 110, padding: 10, borderRadius: 2,borderWidth: 0.7,
                                        justifyContent: 'center'}}
                               >
                            <Text style = {{color: 'white',fontSize: 12}}>CONNECT</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.accountContainer}>

                      <Text style={styles.welcome}>Dialog TV</Text>
                      <TouchableOpacity>
                        <View style = {{backgroundColor: 'transparent',marginRight: 15,borderColor:'white',
                        alignItems: 'center', height: 30 ,width: 110, padding: 10, borderRadius: 2,borderWidth: 0.7,
                                        justifyContent: 'center'}}
                               >
                            <Text style = {{color: 'white',fontSize: 12}}>CONNECT</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity>
                  <View style={styles.logOut}>

                        <Text style={styles.getStartedFont} onPress={this.logout.bind(this)}>LOG OUT</Text>
                  </View>
                </TouchableOpacity>

              </View>

            </ScrollView>



      );
    }
logout(){
  //
  AsyncStorage.removeItem('@MySuperStore:token');
  Actions.OnBoarding();
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#190B48',
  },
  fullWidthContainer: {
    height:200,
    width: window.width,
    resizeMode: 'contain',
    backgroundColor:'#190B48',
  },
  welcome: {
    fontSize: 12,
    textAlign: 'center',
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
  pointLabelText: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
    color: '#ffffff',
  },
  gameNameText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#000000',
    paddingTop:3,
    paddingBottom:10
  },
  pointsText: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
    color: '#E87E04',
  },
  gameCountText: {
    fontSize: 22,
    textAlign: 'center',
    marginTop: 15,
    color: '#ffffff',
    fontWeight: 'bold'
  },
  gameLabelText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    color: '#ffffff',
  },
  walletBalanceText: {
    fontSize: 22,
    textAlign: 'left',
    marginTop: 5,
    color: '#ffffff',
    fontWeight: 'bold'
  },
  walletLabelText: {
    fontSize: 16,
    textAlign: 'left',
    marginTop: 25,
    color: '#ffffff'
  },
  purchasedLabelText: {
    fontSize: 16,
    textAlign: 'left',
    marginTop: 20,
    color: '#ffffff',
  },
  accountLabelText: {
    fontSize: 16,
    textAlign: 'left',
    color: '#ffffff',
    marginTop: 20
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
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    padding: 5,
    alignItems: 'center'
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
  getStarted: {
    height: 5,
    flexDirection: 'row',
    marginTop: 12,
    justifyContent: 'space-between',
    borderRadius:4
  },
  roundedSquare: {
    width: 100,
    height: 95,
    borderRadius: 3,
    resizeMode: 'stretch',
},
  gameContainer: {
   flex: 1,
   flexDirection: 'column',
   justifyContent: 'space-between',
   paddingTop: 22,

  },
  facebookAccountContainer: {
    marginTop:10,
    marginRight:15,
    marginLeft:15,
    height:70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: window.width-30,
    backgroundColor: '#3b5998',
    borderRadius:4,
    marginBottom:10
  },
  googleAccountContainer: {
    marginTop:10,
    marginRight:15,
    marginLeft:15,
    height:70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: window.width-30,
    backgroundColor: '#dd4b39',
    borderRadius:4,
    marginBottom:10
  },
  accountContainer: {
    marginTop:10,
    marginRight:15,
    marginLeft:15,
    height:70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: window.width-30,
    backgroundColor: '#bc274b',
    borderRadius:4,
    marginBottom:10
  },
  logOut: {
    flex: 1,
    height: 70,
    backgroundColor: '#110440',
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
