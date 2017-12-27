import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage
} from 'react-native';
import { Router, Scene } from 'react-native-router-flux';

import OnBoardingScreen from './app/OnBoardingScreen';
import AddNumberScreen from './app/AddNumberScreen';
import AddPinScreen from './app/AddPinScreen';
import HomeScreen from './app/HomeScreen';
import ProfileScreen from './app/ProfileScreen';
import TopUpScreen from './app/TopUpWallet'
import EditProfileScreen from './app/EditProfile'
import AddToBill from './app/AddToBill'
import ScratchCard from './app/ScratchCard'
import GameHome from './app/GameHomeTab'
import Categories from './app/CategoriesTab'
import LeaderBoard from './app/LeaderBoard'
import GameDetails from './app/GameDetails'
import SearchScreen from './app/SearchScreen'
import CategoryDetails from './app/CategoryDetails'
import SplashScreen from './app/SplashScreen'
//'./img/go-back-left-arrow.png'
// static navigationOptions = { header: null }

const App = () => {
// this._getToken();
  return (
    <Router>

      <Scene key="actionRoot">
        <Scene key="OnBoarding"
          component={OnBoardingScreen}
          hideNavBar = {true}
          // initial={this.state.loggedIn}
          // initial
        />
        <Scene key="Splash"
          component={SplashScreen}
          hideNavBar = {true}
          // initial={this.state.loggedIn}
          initial
        />
        <Scene key="actionAddNumber"
          component={AddNumberScreen}
          hideNavBar = {true}

        />

        <Scene key="actionAddPin"
          component={AddPinScreen}
          hideNavBar = {true}
        />

        <Scene key="actionHomeScreen"
          component={HomeScreen}
          hideNavBar = {true}
          // initial={this.state.loggedOut}
        />

        <Scene key="actionProfileScreen"
          component={ProfileScreen}
          hideNavBar = {true}
        />

        <Scene key="actionEditProfile"
          component={EditProfileScreen}
          hideNavBar = {true}
        />


        <Scene key="actionTopUpWallet"
          component={TopUpScreen}
          hideNavBar = {true}
        />

        <Scene key="actionAddToBill"
          component={AddToBill}
          hideNavBar = {true}
        />

        <Scene key="actionScratchCard"
          component={ScratchCard}
          hideNavBar = {true}
        />

        <Scene key="actionGameHome"
          component={GameHome}
          hideNavBar = {true}
        />

        <Scene key="actionCategories"
          component={Categories}
          hideNavBar = {true}
        />

        <Scene key="actionLeaderBoard"
          component={LeaderBoard}
          hideNavBar = {true}
        />

        <Scene key="actionGameDetail"
          component={GameDetails}
          hideNavBar = {true}
        />

        <Scene key="actionSearch"
          component={SearchScreen}
          hideNavBar = {true}
        />

        <Scene key="actionCategoryDetails"
          component={CategoryDetails}
          hideNavBar = {true}
        />





      </Scene>

    </Router>
  );
}
// async _getToken(){
//         try {
//           const value = await AsyncStorage.getItem('@MySuperStore:token');
//           if (value !== null){
//             this.setState({
//               loggedIn: true,
//               loggedOut: false,
//             }, function() {
//               // In this block you can do something with new state.
//             });
//           }else{
//             this.setState({
//               loggedIn: false,
//               loggedOut: true,
//             }, function() {
//               // In this block you can do something with new state.
//             });
//           }
//         } catch (error) {
//           // Error retrieving data
//         }
//   }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold',
  },
  navBarColor: {
    marginTop: 15,
    backgroundColor: 'transparent'
  },
  navBarTitleColor: {
    color: '#00F5FCFF',
    opacity: 100
  }
});

export default App;
