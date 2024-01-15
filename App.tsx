import React, { useEffect, useState } from 'react';
import { User, UsersApiResponse } from './Users';
import List from './List';




export default function App() {
  const [users, setUsers] = useState<User[]|null|undefined>();

  useEffect(() => { 
    console.log('useEffect')
    fetchUsers()
  }, []);

  const fetchUsers = () => {
    console.log('app fetch')
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
          setUsers(newUsers)
      })
  }
        
  return(
    users ? <List initialUsers={users} />  : null
  ); 
}


