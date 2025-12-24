import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { login } from "../../services/authservice";
import logo from "../../../assets/cleanwave-logo.png";

export default function Login() {
  const navigation = useNavigation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await login(form);
      if (response.success) {
        Alert.alert("Success", "Login successful!");
        navigation.navigate("Main");
      } else {
        setError(response.message || "Login failed");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-gray-50 p-6">
      <View className="items-center mb-6">
        {/* <Image source={logo} className="w-20 h-24 mb-4" /> */}
        <Text className="text-xl font-bold text-primary text-center">
          Cleanwave Recycling Nigeria Limited
        </Text>
      </View>

      {error && (
        <View className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
          <Text className="text-red-700 text-sm">{error}</Text>
        </View>
      )}

      <View className="space-y-4">
        <View>
          <Text className="text-gray-700 mb-1">Email</Text>
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-3 bg-white"
            value={form.email}
            onChangeText={(value) => handleChange("email", value)}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View>
          <Text className="text-gray-700 mb-1">Password</Text>
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-3 bg-white"
            value={form.password}
            onChangeText={(value) => handleChange("password", value)}
            placeholder="Enter your password"
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            className="mt-1"
            onPress={() => setShowPassword(!showPassword)}
          >
            <Text className="text-primary text-sm">
              {showPassword ? "Hide" : "Show"} Password
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          className={`bg-primary py-3 rounded-lg mt-4 ${
            loading ? "opacity-50" : ""
          }`}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text className="text-white text-center font-medium">
            {loading ? "Logging in..." : "Login"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="mt-4"
          onPress={() => navigation.navigate("Register")}
        >
          <Text className="text-primary text-center">
            Don't have an account? Register
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
