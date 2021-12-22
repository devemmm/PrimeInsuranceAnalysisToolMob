import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SurveyScreen from "./src/screens/SurveyScreen";
import Identification from "./src/screens/Identification";

const stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <stack.Navigator initialRouteName="Identification">
        <stack.Screen
          name="Identififation"
          component={Identification}
          options={{
            headerShown: false,
          }}
        />
        <stack.Screen
          name="Survey"
          component={SurveyScreen}
          options={{
            headerShown: false,
          }}
        />
      </stack.Navigator>
    </NavigationContainer>
  );
};

export default () => {
  return <App />;
};
