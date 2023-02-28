import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Album from './src/screens/Album';
import DetailAlbum from './src/screens/DetailAlbum';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Album"
          component={Album}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DetailAlbum"
          component={DetailAlbum}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
