import React from 'react';
import { Text, View, FlatList, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import db from '../config'
import { ScrollView } from 'react-native-gesture-handler';



export default class Searchscreen extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        allStories: [],
        lastVisibleStory: null,
        search:''
      }
    }

    retriveStories = async ()=>{
      var text = this.state.search.toUpperCase()
      var enteredText = text.split("")

      const query = await db.collection("stories").where('story','==',text).startAfter(this.state.lastVisibleStory).limit(10).get()
      query.docs.map((doc)=>{
        this.setState({
          allStories: [...this.state.allStories, doc.data()],
          lastVisibleStory: doc
        })
      })      
  }

    searchStory= async(text) =>{
      var enteredText = text.split("")  
        const story =  await db.collection("stories").where('story','==',text).get()
        story.docs.map((doc)=>{
          this.setState({
            allStories:[...this.state.allStories,doc.data()],
            lastVisibleStory: doc
          })
        })
    }

    componentDidMount = async ()=>{
      const query = await db.collection("stories").limit(10).get()
      query.docs.map((doc)=>{
        this.setState({
          allStories: [],
          lastVisibleStory: doc
        })
      })
    }
    render() {
      return (
        <View style={styles.container}>
          <View style={styles.searchBar}>
        <TextInput 
          style ={styles.bar}
          placeholder = "Enter Story Name"
          onChangeText={(text)=>{this.setState({search:text})}}/>
          <TouchableOpacity
            style = {styles.searchButton}
            onPress={()=>{this.searchStory(this.state.search)}}
          >
            <Text>Search</Text>
          </TouchableOpacity>
          </View>
        <FlatList
          data={this.state.allStories}
          renderItem={({item})=>(
            <View style={{borderBottomWidth: 2}}>
              <Text>{"Book Id: " + item.bookId}</Text>
              <Text>{"Student id: " + item.studentId}</Text>
              <Text>{"Transaction Type: " + item.transactionType}</Text>
            </View>
          )}
          keyExtractor= {(item, index)=> index.toString()}
          onEndReached ={this.retriveStories}
          onEndReachedThreshold={0.7}
        /> 
        </View>
      );
    }
  }


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 20
    },
    searchBar:{
      flexDirection:'row',
      height:40,
      width:'auto',
      borderWidth:0.5,
      alignItems:'center',
      backgroundColor:'grey',
  
    },
    bar:{
      borderWidth:2,
      height:30,
      width:300,
      paddingLeft:10,
    },
    searchButton:{
      borderWidth:1,
      height:30,
      width:50,
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:'green'
    }
  })
