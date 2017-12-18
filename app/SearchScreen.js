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
  FlatList
} from 'react-native';
import { Actions } from 'react-native-router-flux';


export default class SearchScreen extends Component {

    _onPressButton() {
        // Alert.alert('You tapped the button!')
        Actions.pop();
      }

        constructor(props) {
    super(props);
    this.state = { text: '' ,
                    isLoading: true
                  };

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

                  if(`${this.props.subCategory}`=="NEW"){
                      this.setState({title: "New Releases"});
                      this._getTrendingGames();

                  }else if(`${this.props.subCategory}`=="TRENDING"){
                      this.setState({title: "Trending Games"});
                      this._getTrendingGames();

                  }else{
                      this.setState({title: `${this.props.subCategory}`});
                      this._searchGamesFromKey();
                  }

                });


              }
            } catch (error) {
              // Error retrieving data
            }
      }


      _searchGamesFromKey() {

        fetch(`http://gaming.dialog.lk/api/v2/search?os=Android&key=${this.props.subCategory}`,{  
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

        fetch(`http://gaming.dialog.lk/api/v2/search?os=Android&subCategory=${this.props.subCategory}`,{  
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
                 // Alert.alert(responseJson)
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



          <View style={{
                      flexDirection: 'row',
                      marginLeft: 10,
                      marginTop: 5
                    }}>
                    <TouchableOpacity onPress={this._onPressButton}>
                      <Image
                        style={styles.image}
                        source={require('../img/go-back-left-arrow.png')}
                      />
                    </TouchableOpacity>

                    <Text style={styles.titleText}>{this.state.title}</Text>
                    
          </View>
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
                          style={styles.searchIcon}
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
                  data={this.state.trendingDataSource}
                  numColumns={3}
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

        
        </View>

        
      );
    }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#190B48',
  },
  titleText: {
    fontSize: 22,
    textAlign: 'left',
    margin: 5,
    marginTop: 30,
    marginLeft:30,
    color: '#ffffff',
  },
  image: {
    marginTop: 35,
    marginLeft: 10,
    width: 17,
    height: 17,
    padding: 5

  },
  searchIcon: {
    width: 15,
    height: 15,
    padding: 5,
    marginRight:10

  },
  gameNameText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#000000',
    paddingTop:3,
    paddingBottom:10
  },
  roundedSquare: {
    width: 100,
    height: 95,
    borderRadius: 3,
    resizeMode: 'stretch',
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