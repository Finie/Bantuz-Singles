import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ExploreScreen from '../ExploreScreen';
import ExploreResult from '../ExploreResult';
import ExploreFilter from '../ExploreFilter';

const Stack = createStackNavigator();
const ExploreNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={'eploreHome'} component={ExploreScreen} />
      <Stack.Screen name="exporeScreen" component={ExploreResult} />
      <Stack.Screen name="searchFilter" component={ExploreFilter} />
    </Stack.Navigator>
  );
};

export default ExploreNavigation;
