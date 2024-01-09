import { StyleSheet, Text, View, FlatList, Button, SafeAreaView, StatusBar, ActivityIndicator} from 'react-native';
import React, { Children, useEffect, useReducer, useState } from 'react';
import { User, UsersApiResponse } from './Users';




export default function App() {
  const [users, setUsers] = useState<User[]|null|undefined>();
  const [numberOfUsers, setNumberOfUsers] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchUsers()
  }, []);

  const fetchUsers = () => {
    console.log('fetchUsers')
    setIsLoading(true)
    fetch(`https://randomuser.me/api?results=${2}`)
      .then((response) => {
        return response.json()
      })
      .then((response:UsersApiResponse) => { 
          let newUsers: User[]= [];
          console.log('Number of users')
          console.log(response.results.length)
          if(response){
            newUsers = response.results
          }
          if(users) {
            setUsers(users.concat(newUsers))
          } else {
            setUsers(newUsers)
          }
          setIsLoading(false)
      })
  }

  const Item = (user:User) => (
    <View style={styles.item}>
      <Text style={styles.title}>{user.name.first+", "+user.name.last}</Text>
    </View>
  );
        
  return(
    !isLoading ?
    <FlatList
      data={users}
      renderItem={({item}) => Item(item)}
      keyExtractor={(item:User) => item.email}
      onEndReached={() => fetchUsers()}
    /> : 
    <View style={styles.spinner}>
      <ActivityIndicator size="large" />
    </View>
  ); 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  spinner: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    flex: 1,
    color: '0000ff'
  }
});


