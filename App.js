import React, { useEffect, useState } from 'react';
import { View, Text, Button, PermissionsAndroid, Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

const App = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const requestPermissions = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log("Location permission denied");
          return;
        }
      }
      getCurrentLocation();
    };

    requestPermissions();
  }, []);

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        console.log("Current location:", latitude, longitude);
      },
      (error) => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Location Tracking App</Text>
      {location ? (
        <Text>Latitude: {location.latitude}, Longitude: {location.longitude}</Text>
      ) : (
        <Text>Getting location...</Text>
      )}
      <Button title="Get Current Location" onPress={getCurrentLocation} />
    </View>
  );
};

export default App;
