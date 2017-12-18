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



export default class CategoriesTab extends Component {


    _onPressButton() {
        // Alert.alert('You tapped the button!')
        Actions.pop();
      }

    constructor(props) {
    super(props);
    this.state = { text: '' };
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
                   
                  this._getCategories();

                });


              }
            } catch (error) {
              // Error retrieving data
            }
      }


    _getCategories() {

        fetch('http://gaming.dialog.lk/api/v2/getGameCategory',{  
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
               categoryDataSource: responseJson.responseBody
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



    render() {

          return (
            <ScrollView>
              <View style={styles.container}>

                 <FlatList
                  vertical={true}
                  data={this.state.categoryDataSource}

                  renderItem={({item}) => 
                  <TouchableOpacity  onPress={() => Actions.actionCategoryDetails({categoryId: item.categoryId},{categoryName: item.name})}>
                  <View style={{
                            flexDirection: 'row',
                            marginLeft: 15,
                            marginTop: 10,
                            height: 40,
                            width: 400,
                            backgroundColor: 'transparent',
                            borderRadius: 3,
                            
                          }}>
                            
                            <Image

                                style={styles.circleImage}
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
    fontSize: 14,
    textAlign: 'left',
    marginLeft: 25,
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