import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";

export default function HomePage() {
  return (
    <ScrollView className="flex-1 p-6 bg-gray-50">
      <View className="mb-6">
        <Text className="text-3xl font-bold text-primary mb-1">
          Dashboard Overview
        </Text>
        <Text className="text-gray-500">Welcome back! Here's your summary</Text>
      </View>

      {/* Stats */}
      <View className="flex-row gap-4 mb-6">
        <View className="bg-white rounded-xl shadow-md p-6 flex-1">
          <Text className="text-sm text-gray-600 font-medium">
            Total Pickups
          </Text>
          <Text className="text-3xl font-bold text-primary mt-2">12</Text>
        </View>
        <View className="bg-white rounded-xl shadow-md p-6 flex-1">
          <Text className="text-sm text-gray-600 font-medium">
            Wallet Balance
          </Text>
          <Text className="text-3xl font-bold text-primary mt-2">₦2,500</Text>
        </View>
      </View>

      {/* Quick Actions */}
      <View className="bg-white rounded-xl shadow-md p-6 mb-6">
        <Text className="text-lg font-semibold mb-4 text-gray-800">
          Quick Actions
        </Text>
        <View className="flex-row gap-3">
          <TouchableOpacity className="bg-primary text-white py-3 rounded-lg font-medium flex-1">
            <Text className="text-white text-center font-medium">
              Request Pickup
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-gray-100 text-gray-700 py-3 rounded-lg font-medium flex-1">
            <Text className="text-gray-700 text-center font-medium">
              View History
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Recent Activity */}
      <View className="bg-white rounded-xl shadow-md p-6">
        <Text className="text-lg font-semibold mb-4 text-gray-800">
          Recent Activity
        </Text>
        <View className="space-y-3">
          <View className="flex-row justify-between items-center pb-3 border-b border-gray-200">
            <Text className="text-gray-700">Pickup Completed</Text>
            <Text className="text-primary font-semibold">+₦500</Text>
          </View>
          <View className="flex-row justify-between items-center pb-3 border-b border-gray-200">
            <Text className="text-gray-700">Wallet Withdrawal</Text>
            <Text className="text-red-500 font-semibold">-₦1,000</Text>
          </View>
          <View className="flex-row justify-between items-center">
            <Text className="text-gray-700">Pickup Scheduled</Text>
            <View className="px-3 py-1 bg-yellow-100 rounded-full">
              <Text className="text-yellow-800 text-xs font-medium">
                Pending
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
