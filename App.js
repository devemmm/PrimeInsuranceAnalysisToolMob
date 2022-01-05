import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SurveyScreen from "./src/screens/SurveyScreen";
import SurveyScreenn from "./src/screens/SurveyScreenn";
import IdentificationScreen from "./src/screens/IdentificationScreen";
import WelcomeScreen from "./src/screens/WelcomeScreen";

const stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <stack.Navigator initialRouteName="Identification">
        <stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <stack.Screen
          name="Surveyy"
          component={SurveyScreenn}
          options={{
            headerShown: false,
          }}
        />
        <stack.Screen
          name="Identififation"
          component={IdentificationScreen}
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
