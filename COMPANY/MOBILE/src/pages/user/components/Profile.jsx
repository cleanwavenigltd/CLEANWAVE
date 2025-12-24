import React from "react";
import { View, Text } from "react-native";

export default function Profile() {
  return (
    <View className="flex-1 p-4">
      <Text className="text-2xl font-bold text-gray-800">Profile</Text>
      <Text className="text-gray-600 mt-2">
        Manage your personal information.
      </Text>
    </View>
  );
}
