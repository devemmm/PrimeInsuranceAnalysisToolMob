import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider as AuthProvider } from "./src/context/AppContext";
import SurveyScreen from "./src/screens/SurveyScreen";
import IdentificationScreen from "./src/screens/IdentificationScreen";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import SplashScreen from "./src/screens/SplashScreen";

const stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <stack.Navigator initialRouteName="Identification">
        <stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{
            headerShown: false,
          }}
        />
        <stack.Screen
          name="Welcome"
          component={WelcomeScreen}
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
        <stack.Screen
          name="Identififation"
          component={IdentificationScreen}
          options={{
            headerShown: false,
          }}
        />
      </stack.Navigator>
    </NavigationContainer>
  );
};

export default () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};
