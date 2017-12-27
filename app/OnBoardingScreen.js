// app/ScarletScreen.js

import {StyleSheet, View, Text, Image, TouchableOpacity,BackHandler,AsyncStorage} from 'react-native';
import React, {Component} from 'react';
import {PagerTabIndicator, IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator} from 'rn-viewpager';
import { Actions } from 'react-native-router-flux'; // New code

export default class OnBoardingScreen extends Component {

  _onPressButton() {
    Alert.alert('You tapped the button!')
  }

  constructor(props) {
    super(props);
    // this._getToken();
   }

   componentDidMount() {


   }
    render() {
        return (
            <View style={{flex:1}}>

                <IndicatorViewPager
                    style={{flex:9}}
                    indicator={this._renderDotIndicator()}>

                    <View style={styles.container}>
                        <Image
                          style={styles.image}
                          source={require('../img/game.png')}
                        />
                        <View style={{flex:1}}>
                          <Text style={styles.welcome}>PLAY GAMES</Text>
                          <Text style={styles.subTitle} >Get access to a unique game library with all your favorite categories</Text>
                        </View>

                    </View>

                    <View style={styles.container}>

                        <Image
                          style={styles.image}
                          source={require('../img/chat.png')}
                        />

                        <View style={{flex:1}}>
                          <Text style={styles.welcome}>SOCIALIZE</Text>
                          <Text style={styles.subTitle} >Get access to a unique game library with all your favorite categories</Text>
                        </View>

                    </View>

                    <View style={styles.container}>
                        <Image
                          style={styles.image}
                          source={require('../img/roulette.png')}
                        />

                        <View style={{flex:1}}>
                          <Text style={styles.welcome}>GET DAILY REWARDS</Text>
                          <Text style={styles.subTitle} >Get access to a unique game library with all your favorite categories</Text>
                        </View>

                    </View>

                    <View style={styles.container}>

                        <Image
                          style={styles.image}
                          source={require('../img/trophy.png')}
                        />

                        <View style={{flex:1}}>
                          <Text style={styles.welcome}>FIND COMPETITIONS</Text>
                          <Text style={styles.subTitle} >Get access to a unique game library with all your favorite categories</Text>
                        </View>


                    </View>

                </IndicatorViewPager>


                  <View style={styles.getStarted}>

                      <Text style={styles.getStartedFont} onPress={() => Actions.actionAddNumber()}>GET STARTED</Text>
                  </View>




            </View>
        );
    }




    _renderDotIndicator() {
        return <PagerDotIndicator pageCount={4} />;
    }



}


const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#190B48',
  },
  welcome: {
    flex: 1,
    fontSize: 25,
    textAlign: 'center',
    marginTop: 15,
    color: '#ffffff'
  },
  subTitle: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
    margin: 5,
    marginLeft: 15,
    marginRight: 15,
    color: '#ffffff',
    marginBottom: 130
  },
  image: {
    marginTop: 90,
    width: 200,
    height: 200,
    justifyContent: 'center',
  },
  getStarted: {
    flex: 1,
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
  exitApp();
 return false;
});
