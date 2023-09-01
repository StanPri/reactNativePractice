import { StyleSheet, Text, View, FlatList, Button, SafeAreaView, StatusBar} from 'react-native';
import React, { Children, useEffect, useReducer, useState } from 'react';




type TUser = {
  id: number;
  name: string;
  children?: any;
}

const userz = {
  id: 1,
  name: 'origin',
  children: [{ 
      id: 2,
      name: '.gitignore'
    },
    {
      id: 3,
      name: 'node_modules',
      children: [{
        id: 4,
        name: 'folder',
        children: [{
          id: 5,
          name: 'package.json'
        }]
      }]
    },
    {
      id: 6,
      name: 'app.tsx'
    }]
  }



  const Item = (user: any) => {
   return <View >
      <Text style={styles.title}>{user.name.last} {user.name.first}</Text>
    </View>
  };



export default function App() {
  const [users, setUsers] = useState([]);
  const [numberOfUsers, setNumberOfUsers] = useState(15)

  useEffect(() => {
    console.log('useEffect')
    fetch(`https://randomuser.me/api?results=${numberOfUsers}`)
      .then((response) => {
        return response.json()
      })
      .then((response) => { 
        setUsers(response.results)
      })
  }, [])
        
  const getSubsequentUserFetch = () => {
    console.log('!!!!!!!!!!!!getSubsequentUserFetch')
    fetch(`https://randomuser.me/api?results=${numberOfUsers}`)
      .then((response) => {
        return response.json()
      })
      .then((response) => { 
        setUsers(users.concat(response.results))
      })
  }

  return (
    // <View style={styles.container}>
    //   {/* <FlatList data={users} renderItem={(user) => Item(user)}></FlatList>  */}

    //   {users && users.map( m => Item(m))}
        
    // </View>
    <View style={{flex: 1}}>
        <FlatList
                data={users}
                renderItem={({item}) => Item(item)}
                onEndReachedThreshold={0.5}
                onEndReached={() => getSubsequentUserFetch()}
                keyExtractor={(user:any) => user.email}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  title: {
    fontSize: 32,
  }
});

