import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

import ListScreen from './ListScreen';
import MapScreen from './MapScreen';

export type RootStackParamList = {
  Users: { people: People[] };
  Location: { focusPeople?: Coordinate };
};

export type UsersProps = BottomTabScreenProps<RootStackParamList, 'Users'>;
export type LocationProps = BottomTabScreenProps<RootStackParamList, 'Location'>;

const Tab = createBottomTabNavigator<RootStackParamList>();

export interface Coordinate { 
  title: string;
  latitude: number;
  longitude: number;
}

export interface People {
  name: string;
  email: string;
  avatar: string;
  latitude: number;
  longitude: number;
}

export default function App() {
  
  const [people, setPeople] = useState<People[]>([{"name":"Mark Olson","avatar":"https://cdn.fakercloud.com/avatars/kvasnic_128.jpg",
  "email":"Naomie.Fritsch@gmail.com","latitude":Number("75.5103"),"longitude":Number("170.9885")}]);
  const [defaultMarker, setDefaultMarker] = useState<Coordinate>({
    title: 'Test',
    latitude: 37.77,
    longitude: -122.4
  });

  const initData = async() =>{
    try{
      let response = await fetch('https://61d7e17be6744d0017ba87ef.mockapi.io/api/v1/mock',
      {
        method: 'GET',
        headers: {Accept: 'application/json, text/html, */*'},
    });
      let data = await response.json();
      data.map((d: any) => {
        people.push({ name: d.name, email: d.email, avatar: d.avatar, latitude: Number(d.lat), longitude: Number(d.lng)} as People);        
      })
      setDefaultMarker({ title: data[0].name, latitude: Number(data[0].lat), longitude: Number(data[0].lng)});
    }catch(error) {
      console.log(error);
    }
  };

  useEffect(() => {
    initData();
  }, []);

  return (
      <NavigationContainer>
      <Tab.Navigator initialRouteName='Users'>
        <Tab.Screen name='Users' component={ListScreen} initialParams={{people: people}} />
        <Tab.Screen name='Location' component={MapScreen} initialParams={{focusPeople: defaultMarker}} />
      </Tab.Navigator>
    </NavigationContainer>
    
  )
  
  
}


