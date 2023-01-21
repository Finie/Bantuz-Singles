import React from 'react';
import {StyleSheet, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import useThemeStyles from 'src/hooks/useThemeStyles';

// inactive icons
import Home from 'src/assets/icons/home.svg';
import HeartHomeinactive from 'src/assets/icons/hearthome.svg';
import ChatHome from 'src/assets/icons/chathome.svg';
import ProfileInactive from 'src/assets/icons/profile.svg';
import Explore from 'src/assets/icons/exploreinactive.svg';

//active icons
import HomeActive from 'src/assets/icons/homeactive.svg'; //exploreactive.svg
import ExploreActive from 'src/assets/icons/exploreactive.svg'; //exploreactive.svg
import LoveActive from 'src/assets/icons/loveactive.svg'; //exploreactive.svg
import ChatActive from 'src/assets/icons/chatactive.svg'; //exploreactive.svg
import ProfileActive from 'src/assets/icons/profileactive.svg'; //exploreactive.svg
import MatchesScreen from './MatchesScreen';
import ExploreNavigation from './nav/ExploreNavigation';
import ChatHomeScreen from './ChatHome';
import ProfileScreen from './ProfileScreen';

const Tab = createBottomTabNavigator();

const MainNavigation = ({navigation}) => {
  const {colors} = useThemeStyles();

  const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 48,
      backgroundColor: colors.snow,
      borderRadius: 10,
      paddingHorizontal: 20,
    },
  });

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          justifyContent: 'center',
          alignItems: 'center',
          height: 85,
        },
      }}>
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) => (
            <View style={styles.container}>
              {focused ? <HomeActive /> : <Home />}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="explore"
        component={ExploreNavigation}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) => (
            <View style={styles.container}>
              {focused ? <ExploreActive /> : <Explore />}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="matches"
        component={MatchesScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) => (
            <View style={styles.container}>
              {focused ? <LoveActive /> : <HeartHomeinactive />}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="chat"
        component={ChatHomeScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) => (
            <View style={styles.container}>
              {focused ? <ChatActive /> : <ChatHome />}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) => (
            <View style={styles.container}>
              {focused ? <ProfileActive /> : <ProfileInactive />}
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigation;
