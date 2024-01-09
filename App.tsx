import { StyleSheet, Text, View, FlatList, Button, SafeAreaView, StatusBar} from 'react-native';
import React, { Children, useEffect, useReducer, useState } from 'react';
import { User, UsersApiResponse } from './Users';




export default function App() {
  const [users, setUsers] = useState<User[]|null|undefined>();
  const [numberOfUsers, setNumberOfUsers] = useState(15)

  useEffect(() => {
    fetch(`https://randomuser.me/api?results=${numberOfUsers}`)
      .then((response) => {
        return response.json()
      })
      .then((response:UsersApiResponse) => { 
          setUsers(response.results)
      })
  }, []);

  const Item = (user:any) => (
    <View style={styles.item}>
      <Text style={styles.title}>{user.name.first+", "+user.name.last}</Text>
    </View>
  );
        
  return(
    <FlatList
      data={users}
      renderItem={({item}) => Item(item)}
      keyExtractor={(item:any) => item.email}
    />
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
});


