import React from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { store } from "./src/store/store";
import AuthLayout from "./src/layouts/AuthLayout";
import UserLayout from "./src/layouts/UserLayout";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Auth" component={AuthLayout} />
          <Stack.Screen name="Main" component={UserLayout} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
