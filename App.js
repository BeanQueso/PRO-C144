import React from "react";
import HomeScreen from "./screens/Home";
import RecommendedArticlesScreen from "./screens/Recommendation";
import PopularArticlesScreen from "./screens/Popular";
import {NavigationContainer} from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RFValue } from "react-native-responsive-fontsize";

const Tab = createBottomTabNavigator()

export default function App() {
  return(
    <>
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
        />
        <Tab.Screen
          name="Recommended"
          component={RecommendedArticlesScreen}
        />
        <Tab.Screen
          name="Popular"
          component={PopularArticlesScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
    </>
  )
}

