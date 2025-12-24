import React from "react";
import { Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../pages/user/components/Home";
import Pickups from "../pages/user/components/Pickups";
import Wallet from "../pages/user/components/Wallet";
import Profile from "../pages/user/components/Profile";
import Header from "../components/Header";

const Tab = createBottomTabNavigator();

export default function UserLayout() {
  return (
    <>
      <Header />
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: { backgroundColor: "#ffffff" },
          tabBarActiveTintColor: "#8CA566",
          tabBarInactiveTintColor: "#6B7280",
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => (
              <Text style={{ color, fontSize: size }}>🏠</Text>
            ),
          }}
        />
        <Tab.Screen
          name="Pickups"
          component={Pickups}
          options={{
            tabBarLabel: "Pickups",
            tabBarIcon: ({ color, size }) => (
              <Text style={{ color, fontSize: size }}>🚛</Text>
            ),
          }}
        />
        <Tab.Screen
          name="Wallet"
          component={Wallet}
          options={{
            tabBarLabel: "Wallet",
            tabBarIcon: ({ color, size }) => (
              <Text style={{ color, fontSize: size }}>💰</Text>
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: ({ color, size }) => (
              <Text style={{ color, fontSize: size }}>👤</Text>
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
}
