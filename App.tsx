import { StyleSheet, Text, View, FlatList, Button, SafeAreaView, StatusBar, ActivityIndicator} from 'react-native';
import React, { Children, useEffect, useReducer, useState } from 'react';
import { User, UsersApiResponse } from './Users';
import List from './List';




export default function App() {
  const [users, setUsers] = useState<User[]|null|undefined>();
  const [numberOfUsers, setNumberOfUsers] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => { 
    console.log('useEffect')
    fetchUsers()
  }, []);

  const fetchUsers = () => {
    console.log('app fetch')
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
    <List initialUsers={users} isLoading={isLoading}/> 
  ); 
}


