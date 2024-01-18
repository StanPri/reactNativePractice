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
    const objectString = JSON.stringify(props, null, 2);
    return(<View>
        <Text>{objectString}</Text>
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
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    objectText: {
        fontSize: 16,
    }
  });


export default ListItem; 