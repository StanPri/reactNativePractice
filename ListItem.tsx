import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, { useState } from 'react';
import { User } from './Users';

interface ListItemProps {
    user:User
}

const ListItem = (props: ListItemProps) => {
    const [isExpanded, setIsExpended] = useState<boolean>(false)
    const expendToggle = () => setIsExpended(!isExpanded);
    return(
        <TouchableOpacity onPress={expendToggle}>
            <View style={styles.item}>
                <View>
                    <Text style={styles.title}>{props.user.name.first+", "+props.user.name.last}</Text>
                </View>
            </View>
            {isExpanded && <ItemDetail user={props.user}/>}
        </TouchableOpacity>);
}

const ItemDetail = (props: ListItemProps)  => {
    return(<View>
        <Text>{props.user.email}</Text>
    </View>)
}
const styles = StyleSheet.create({
    item: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    }
  });


export default ListItem; 