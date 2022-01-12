import { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, FlatList, ListRenderItem } from 'react-native';
import { ListItem } from 'react-native-elements';
import { Avatar } from 'react-native-elements/dist/avatar/Avatar';
import { UsersProps, People } from './App';


  export default function ListScreen({ navigation, route }: UsersProps) {
    const [ users, setUsers ] = useState<People[]>(route.params?.people || []);

    const handlePress = (item: any) => {
      navigation.navigate('Location', { focusPeople: {title: item.name, latitude: item.latitude, longitude: item.longitude }})
    }

    const renderItem: ListRenderItem<People> = ({ item }) => (
      <ListItem bottomDivider style={styles.itemWrapper} onPress={() => { handlePress(item) }}>
      <Avatar source={{uri: item.avatar}} />
      <ListItem.Content>
        <ListItem.Title>{item.name}</ListItem.Title>
        <ListItem.Subtitle>{item.email}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
    );

    const initData = async() =>{
      const uList : People[] = [];
      try{
        let response = await fetch('https://61d7e17be6744d0017ba87ef.mockapi.io/api/v1/mock',
        {
          method: 'GET',
          headers: {Accept: 'application/json, text/html, */*'},
      });
        let data = await response.json();
        data.map((d: any) => {
          uList.push({ name: d.name, email: d.email, avatar: d.avatar, latitude: Number(d.lat), longitude: Number(d.lng)} as People);        
        })
        setUsers(uList);
      }catch(error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      initData();
    }, []);

  
    return (
      <View style={styles.container}>
         {users && (<FlatList
         data={users}
         renderItem={renderItem}
         keyExtractor={(item, index) => String(index)}
         contentContainerStyle={{ flexGrow: 1 }}
         />)}
      </View>
    );
  }

  const { width } = Dimensions.get('window');

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    itemWrapper: {
      width
  }
  });