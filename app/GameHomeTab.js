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
import Search from 'react-native-search-box';


const window = Dimensions.get('window');

export default class GameHomeTab extends Component {


    _onPressButton() {
        // Alert.alert('You tapped the button!')
        Actions.pop();
      }


    constructor(props) {
    super(props);
    this.state = { text: '' ,
                    isLoading: true
                  };
    this.items = [];


     }

    //this method will called when the screen is first loading
    componentDidMount() {

      this._getToken();

    }
      
    //get Token from the storage  
    async _getToken(){
            try {
              const value = await AsyncStorage.getItem('@MySuperStore:token');
              if (value !== null){
                // We have data!!
                console.log(value);


                this.setState({token: value}, () => { 
                   
                  this._getFeaturedBanners();
                  this._getTrendingGames();
                  this._getNewGames();

                });


              }
            } catch (error) {
              // Error retrieving data
            }
      }




     _getFeaturedBanners() {

        fetch('http://gaming.dialog.lk/api/v2/getFeaturedBanners',{  
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
                 featuredDataSource: responseJson.responseBody
               }, function() {
                   // Alert.alert(responseJson)
                 // In this block you can do something with new state.
               });
           }
         })
         .catch((error) => {
           console.error(error);
         });

     }

     _getTrendingGames() {

        fetch('http://gaming.dialog.lk/api/v2/search?os=Android&subCategory=TRENDING',{  
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
                 trendingDataSource: responseJson.responseBody,
                 length:responseJson.responseBody.length
               }, function() {

                  console.log(`${this.state.token}`);
                  var newList = [];
                   if(`${this.state.length}`>6){
                    for(i=0;i<6;i++){
                      newList.push(responseJson.responseBody[i]);
                    }
                    this.setState({
                       isLoading: false,
                       trendingDataSource: newList,
                       length:responseJson.responseBody.length
                     });

                   }
                 // In this block you can do something with new state.
               });
           }
         })
         .catch((error) => {
           console.error(error);
         });

     }

    _getNewGames() {

        fetch('http://gaming.dialog.lk/api/v2/search?os=Android&subCategory=NEW',{  
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
                 newGamesDataSource: responseJson.responseBody,
                 length:responseJson.responseBody.length
               }, function() {
                  console.log(`${this.state.token}`);
                  var newList = [];
                   if(`${this.state.length}`>6){
                    for(i=0;i<6;i++){
                      newList.push(responseJson.responseBody[i]);
                    }
                    this.setState({
                       isLoading: false,
                       newGamesDataSource: newList,
                     });

                   }
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

                <View style={{
                    backgroundColor: '#0A0029',
                    flexDirection: 'row',
                    height: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: 15,
                    marginTop: 7,
                    marginRight: 15,
                    borderRadius: 2,
                  }}>
                  <Image
                          style={styles.image}
                          source={require('../img/search1.png')}
                        />
                  <TextInput
                      placeholderTextColor='#ffffff'
                      placeholder="Search"
                      underlineColorAndroid = 'transparent'
                      style={styles.textInputStyle}
                      onChangeText={(text) => this.setState({text})}
                      value={this.state.text}
                      onSubmitEditing={() => Actions.actionSearch({subCategory: this.state.text})}
                  />
                    
                </View>

                 <FlatList
                  horizontal={true}
                  data={this.state.featuredDataSource
                }

                  renderItem={({item}) => 
                  <TouchableOpacity  onPress={() => Actions.actionGameDetail({appId: item.appId})}>
                  <View style={{
                            marginLeft: 15,
                            marginTop: 10,
                            height: 150,
                            width: 250,
                            backgroundColor: '#ffffff',
                            borderRadius: 3,
                            
                          }}>
                            
                            <Image

                                style={styles.largeRoundedSquare}
                                source={{uri:item.bgImage}}
                              >
                            </Image>

                  </View>
                  </TouchableOpacity>
                }
                />

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginLeft: 15,
                    marginTop: 10,
                    marginRight: 15
                  }}>
                  <Text style={styles.purchasedLabelText}>Trending Games</Text>
                  <TouchableOpacity  onPress={() => Actions.actionSearch({subCategory: "TRENDING"})}>
                  <Text style={styles.pointsText}>See More</Text>
                  </TouchableOpacity>
                    
                </View>
                

                <FlatList
                  horizontal={true}
                  data={this.state.trendingDataSource}

                  renderItem={({item}) => 
                        <TouchableOpacity  onPress={() => Actions.actionGameDetail({appId: item.appId})}>

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


                                      <Text style={styles.gameNameText}>{item.name}</Text>
                            </View>
                        </TouchableOpacity>
                }
                />
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginLeft: 15,
                    marginTop: 10,
                    marginRight: 15
                  }}>
                  <Text style={styles.purchasedLabelText}>New Releases</Text>
                  <TouchableOpacity  onPress={() => Actions.actionSearch({subCategory: "NEW"})}>
                  <Text style={styles.pointsText}>See More</Text>
                  </TouchableOpacity>
                    
                </View>
                

                <FlatList
                  horizontal={true}
                  data={this.state.newGamesDataSource}

                  renderItem={({item}) => 

                      <TouchableOpacity  onPress={() => Actions.actionGameDetail({appId: item.appId})}>

                          <View style={{
                                    marginLeft: 15,
                                    marginTop: 10,
                                    height: 115,
                                    width: 100,
                                    marginBottom: 10,
                                    backgroundColor: '#ffffff',
                                    borderRadius: 3,
                                    
                                  }}>
                                    
                                    <Image

                                        style={styles.roundedSquare}
                                        source={{uri:item.icon}}
                                      >
                                    </Image>


                                    <Text style={styles.gameNameText}>{item.name}</Text>
                          </View>

                    </TouchableOpacity>
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
  gameNameText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#000000',
    paddingTop:3,
    paddingBottom:10
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
});

BackHandler.addEventListener('hardwareBackPress', function() {

 return true;
});