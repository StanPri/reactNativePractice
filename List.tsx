import { StyleSheet, Text, View, FlatList, StatusBar, ActivityIndicator} from 'react-native';
import React, { useState } from 'react';
import { User, UsersApiResponse } from './Users';

type ListProps = {
    initialUsers: User[]|null|undefined, 
    isLoading: boolean
}

const List = (props: ListProps) => {
    const [users, setUsers] = useState<User[]|null|undefined>(props.initialUsers);
    const [isLoading, setIsLoading] = useState(props.isLoading)

  const Item = (user:User) => (
    <View style={styles.item}>
      <Text style={styles.title}>{user.name.first+", "+user.name.last}</Text>
    </View>
  );

  const fetchUsers = () => {
    console.log('List fetch')
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
    return(

        !isLoading ? 
            <FlatList
            data={users}
            renderItem={({item}) => Item(item)}
            keyExtractor={(item:User) => item.email}
            onMomentumScrollEnd={() => fetchUsers()}
            /> 
            : 
            <View style={styles.spinner}>
                <ActivityIndicator size="large" />
            </View>
      ); 

    
}

export default List;

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