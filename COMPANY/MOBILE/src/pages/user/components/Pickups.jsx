import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";
import { Picker } from '@react-native-picker/picker';

export default function Pickups() {
  const [form, setForm] = useState({
    wasteType: "",
    quantity: "",
    address: "",
    date: "",
    time: "",
  });

  const handleChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    // Handle pickup request
    Alert.alert("Success", "Pickup request submitted!");
  };

  return (
    <ScrollView className="flex-1 p-6 bg-gray-50">
      <View className="mb-6">
        <Text className="text-3xl font-bold text-primary mb-1">
          Request Pickup
        </Text>
        <Text className="text-gray-500">Schedule a waste collection</Text>
      </View>

      <View className="bg-white rounded-xl shadow-md p-6 space-y-4">
        <View>
          <Text className="text-gray-700 mb-1">Waste Type</Text>
          <View className="border border-gray-300 rounded-lg bg-white">
            <Picker
              selectedValue={form.wasteType}
              onValueChange={(value) => handleChange("wasteType", value)}
            >
              <Picker.Item label="Select waste type" value="" />
              <Picker.Item label="Plastic" value="plastic" />
              <Picker.Item label="Paper" value="paper" />
              <Picker.Item label="Metal" value="metal" />
              <Picker.Item label="Organic" value="organic" />
            </Picker>
          </View>
        </View>

        <View>
          <Text className="text-gray-700 mb-1">Quantity (kg)</Text>
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-3 bg-white"
            value={form.quantity}
            onChangeText={(value) => handleChange("quantity", value)}
            placeholder="Enter quantity"
            keyboardType="numeric"
          />
        </View>

        <View>
          <Text className="text-gray-700 mb-1">Pickup Address</Text>
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-3 bg-white"
            value={form.address}
            onChangeText={(value) => handleChange("address", value)}
            placeholder="Enter pickup address"
            multiline
            numberOfLines={3}
          />
        </View>

        <View>
          <Text className="text-gray-700 mb-1">Preferred Date</Text>
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-3 bg-white"
            value={form.date}
            onChangeText={(value) => handleChange("date", value)}
            placeholder="YYYY-MM-DD"
          />
        </View>

        <View>
          <Text className="text-gray-700 mb-1">Preferred Time</Text>
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-3 bg-white"
            value={form.time}
            onChangeText={(value) => handleChange("time", value)}
            placeholder="HH:MM"
          />
        </View>

        <TouchableOpacity
          className="bg-primary py-3 rounded-lg mt-4"
          onPress={handleSubmit}
        >
          <Text className="text-white text-center font-medium">
            Request Pickup
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
