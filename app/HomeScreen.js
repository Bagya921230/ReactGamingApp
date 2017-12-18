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
  AsyncStorage
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import BottomNavigation, { Tab } from 'react-native-material-bottom-navigation'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import OctIcon from 'react-native-vector-icons/Octicons'
import { TabNavigator } from 'react-navigation';
import ProgressBar from 'react-native-progress/Bar';
import Tabs from './Tabs';
import GameHomeTab from './GameHomeTab';
import CategoriesTab from './CategoriesTab';
import Leaderboard from './LeaderBoard';

// import Icon1 from 'react-native-vector-icons/Ionicons'
const window = Dimensions.get('window');

export default class HomeScreen extends Component {

    _onPressButton() {
        // Alert.alert('You tapped the button!')
        Actions.pop();
      }

        //this method will called when the screen is first loading
    componentDidMount() {

      this._getToken();

    }

    constructor(props) {
      super(props);
      this.state = { text: '' ,
                      isLoading: true
                    };

     }
      
    //get Token from the storage  
    async _getToken(){
            try {
              const value = await AsyncStorage.getItem('@MySuperStore:token');
              if (value !== null){
                // We have data!!
                console.log(value);


                this.setState({token: value}, () => { 
                   this._getUserDetails();

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
            <View style={styles.container}>

              <View style={styles.toolBar}>

              <TouchableOpacity onPress={() => Actions.actionProfileScreen()}>
                <View style={styles.avatarIcon}>
                  <Image style={styles.circleImage}
                            source={{uri:this.state.avatar}}
                          />
                  <Text style={styles.welcome}>{this.state.userName}</Text>

                </View>

              </TouchableOpacity>

                <View style={styles.editIcon}>
                    <Image style={{ width: 50, height: 50, marginBottom: 10 ,alignItems:'center'}}
                            source={require('../img/diamond1.png')}
                          >
                            <Text style={styles.levelText}>01</Text>
                    </Image>
                </View>

              </View>

              <View style={styles.getStarted}>
                  <ProgressBar borderWidth={0} borderColor={'#542831'} unfilledColor={'#542831'} progress={0.3} width={window.width} height={5} color={'#E87E04'} borderRadius={4} />
              </View>
              <View style={styles.mainContainer}>
                        <Tabs>
                  {/* First tab */}
                  <View title="Home" style={styles.content}>
                    <GameHomeTab></GameHomeTab>
                  </View>

                  {/* Second tab */}
                  <View title="Categories" style={styles.content}>
                    <CategoriesTab></CategoriesTab>
                  </View>

                  {/* Third tab */}
                  <View title="Leaderboard" style={styles.content}>
                    <Leaderboard></Leaderboard>
                  </View>

                </Tabs>
              </View>


              <BottomNavigation
                labelColor="white"
                rippleColor="white"
                showLabel={true}
                shifting={false}
                style={{ height: 56, elevation: 8, position: 'absolute', left: 0, bottom: 0, right: 0 }}
              >

                <Tab
                  barBackgroundColor="#08001E"
                  label="Games"
                  labelColor="#667178"
                  activeLabelColor="#ffffff"
                  showLabel={true}
                  onTabChange={() => Actions.actionHomeScreen()}
                  onTabSelected={(newTabIndex) => alert(`New Tab at position ${newTabIndex}`)}
                  activeIcon={<Ionicon size={24} color="#ffffff" name="ios-game-controller-b" />}
                  icon={<Ionicon size={24} color="#667178" name="ios-game-controller-b" />}
                />
                <Tab
                  barBackgroundColor="#08001E"
                  label="Messages"
                  labelColor="#667178"
                  activeLabelColor="#ffffff"
                  showLabel={true}
                  onTabChange={() => Actions.actionHomeScreen()}
                  onTabSelected={(newTabIndex) => alert(`New Tab at position ${newTabIndex}`)}
                  activeIcon={<MaterialIcon size={24} color="#ffffff" name="message-processing" />}
                  icon={<MaterialIcon size={24} color="#667178" name="message-processing" />}
                />
                <Tab
                  barBackgroundColor="#08001E"
                  label="Events"
                  labelColor="#667178"
                  activeLabelColor="#ffffff"
                  onTabChange={() => Actions.actionHomeScreen()}
                  onTabSelected={(newTabIndex) => alert(`New Tab at position ${newTabIndex}`)}
                  activeIcon={<OctIcon size={24} color="#ffffff" name="calendar" />}
                  icon={<OctIcon size={24} color="#667178" name="calendar" />}
                />
              </BottomNavigation>
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
    fontSize: 14,
    textAlign: 'center',
    color: '#ffffff',
    height: 40,
    padding: 10
  },
  levelText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    alignSelf:'center',
    color: '#ffffff',
    marginTop:6,
    height: 40,
    padding: 10
  },
  image: {
    marginTop: 35,
    marginLeft: 16,
    width: 17,
    height: 17,
    padding: 5

  },
  toolBar: {
    height: 45,
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    margin:5
  },
  getStarted: {
    height: 5,
    flexDirection: 'row',
    marginTop: 12,
    justifyContent: 'space-between',
    borderRadius:4
  },
  mainContainer: {
    flex: 4,
    backgroundColor:'transparent',
    marginBottom: 56
  },
  circleImage: {
    borderWidth:1,
    borderColor:'#fff',
    alignItems:'center',
    justifyContent:'center',
    width:35,
    height:35,
    borderRadius:35,
  },
  avatarIcon: {
    padding:10,
    flex: 1, 
    flexDirection: 'row'
  },
  editIcon: {
    padding:10,
    width: 50, 
    height: 50,
    marginRight:10,
    marginBottom:10
  },
  diamond:{
    width: 35,
    height: 35,
    transform: [
      {rotate: '45deg'}
    ],
  }
});

BackHandler.addEventListener('hardwareBackPress', function() {

 return true;
});