import { useRef, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import MapView from 'react-native-maps';
import { Camera, Marker } from 'react-native-maps';
import { LocationProps, Coordinate } from './App';

export default function MapScreen({ route, navigation }: LocationProps) {

    const { focusPeople } = route.params;

    const [initRegion, setInitRegion] = useState<any>({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    const mapRef = useRef<MapView>(null);

    useEffect(() => {
        if(mapRef.current && focusPeople){
            const newCamera: Camera = {
                center: { latitude: focusPeople.latitude, longitude: focusPeople.longitude },
                zoom: 15,
                heading: 0,
                pitch: 0,
                altitude: 5
            }
            mapRef.current.animateCamera(newCamera, { duration: 500 });
        }
    }, [focusPeople]);
    return (
        <View style={{ flex: 1 }}>
            <MapView
                ref={mapRef}
                style={{ flex: 1 }}
                region={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
            {
                focusPeople && (
                    <Marker
                        key={focusPeople.title}
                        coordinate={{
                            latitude: focusPeople.latitude,
                            longitude: focusPeople.longitude,
                        }}
                        title={focusPeople.title}
                    />
                )
            }
            </MapView>
        </View>
        

    )
}