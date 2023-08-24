import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList} from 'react-native';
import React, { useEffect, useState } from 'react';

export default function App() {
  const [users, setUsers] = useState();
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        return response.json()
      })
      .then((response) => { 
        setUsers(response)
        console.log(JSON.stringify(response, undefined, 4))
      })


  }, [])

  const itemComponent = (item) => {
    return <Text style={styles.item}>{item.name}</Text>

  }


  return (
    <View style={styles.container}>
        <FlatList 
        data={users}
        renderItem={({item}) => itemComponent(item)}
        />
        
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

