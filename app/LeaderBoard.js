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
  ScrollView
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import ProgressBar from 'react-native-progress/Bar';
import { RecyclerListView, DataProvider, LayoutProvider } from "recyclerlistview";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Search from 'react-native-search-box';


const window = Dimensions.get('window');



export default class LeaderboardTab extends Component {


    _onPressButton() {
        // Alert.alert('You tapped the button!')
        Actions.pop();
      }

    constructor(props) {
    super(props);
    this.state = { text: '' };
     }



    render() {

          return (
            <ScrollView>
              <View style={styles.container}>

                 <FlatList
                  vertical={true}
                  data={[
                    {key: '1','name': 'John','score': '10900'},
                    {key: '2','name': 'Jack','score': '10000'},
                    {key: '3','name': 'Peter','score': '9000'},
                    {key: '4','name': 'Rabbit','score': '8000'},
                    {key: '5','name': 'Fox','score': '1200'},
                    {key: '6','name': 'Bear','score': '1000'},
                    {key: '7','name': 'Deer','score': '900'},
                    {key: '8','name': 'Ann','score': '800'},
                    {key: '9','name': 'Ant','score': '200'},
                    {key: '10','name': 'Shark','score': '30'},
                   ]
                }

                  renderItem={({item}) => 

                  <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginLeft: 5,
                            marginTop: 10,
                            height: 30,
                            width: window.width-20,
                            backgroundColor: 'transparent',
                            borderRadius: 3,
                            
                          }}>
                          <View style={{
                            flexDirection: 'row',
                            marginLeft: 5,
                            height: 30,
                            backgroundColor: 'transparent',
                            borderRadius: 3,
                            
                          }}>

                            
                            <Text style={styles.placeText}>{item.key}</Text>
                            <Text style={styles.gamerNameText}>{item.name}</Text>
                          </View>

                          <Text style={styles.gamerNameText}>{item.score}</Text>

                  </View>
                }
                />

              </View>
              
            </ScrollView>
        
      );
    }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#190B48',
  },
  pointLabelText: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
    color: '#ffffff',
  },
  placeText: {
    fontSize: 14,
    textAlign: 'left',
    marginLeft: 5,
    color: '#ffffff',
    paddingTop:5,
  },
  gamerNameText: {
    fontSize: 14,
    textAlign: 'left',
    marginLeft: 20,
    color: '#ffffff',
    paddingTop:5,
  },
  pointsText: {
    fontSize: 13,
    textAlign: 'center',
    marginTop: 16,
    color: '#E87E04',
  },
  purchasedLabelText: {
    fontSize: 14,
    textAlign: 'left',
    marginTop: 10,
    color: '#ffffff',
  },
  searchText: {
    fontSize: 13,
    textAlign: 'center',
    color: '#ffffff',
  },
  roundedSquare: {
    width: 100,
    height: 95,
    borderRadius: 3,
    resizeMode: 'stretch',
  },
  largeRoundedSquare: {
      width: 250,
      height: 150,
      borderRadius: 3,
      resizeMode: 'stretch',
  },
  image: {
    width: 15,
    height: 15,
    padding: 5,
    marginRight:10

  },
  textInputStyle: {
    height: 20,
    width: 50,
    borderWidth: 0,
    padding: 2,
    color: '#ffffff',
  },
  circleImage: {
    borderWidth:0,
    borderColor:'#fff',
    alignItems:'center',
    justifyContent:'center',
    width:30,
    height:30,
    borderRadius:30,
  },
});

BackHandler.addEventListener('hardwareBackPress', function() {

 return true;
});