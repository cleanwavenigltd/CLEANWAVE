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
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { register } from "../../services/authservice";
import logo from "../../../assets/cleanwave-logo.png";

export default function Register() {
  const navigation = useNavigation();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
    gender: "",
    state: "",
    lga: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (name, value) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "state" ? { lga: "" } : {}),
    }));
  };

  const validateForm = (data) => {
    if (!data.name?.trim()) return "Name is required.";
    if (!data.email || !/^\S+@\S+\.\S+$/.test(data.email))
      return "A valid email is required.";
    if (!data.phone || !/^\+?[0-9]{7,15}$/.test(data.phone))
      return "A valid phone number is required.";
    if (!data.state) return "Please select your state.";
    if (!data.gender) return "Please select your gender.";
    if (!data.lga) return "Please select your local government.";
    if (!data.password || data.password.length < 8)
      return "Password must be at least 8 characters.";
    if (data.password !== data.confirm) return "Password Mismatch.";
    return null;
  };

  const handleSubmit = async () => {
    setError("");

    const validationError = validateForm(form);
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      const res = await register(form);
      if (res.success) {
        Alert.alert("Success", "Registration successful!");
        navigation.navigate("Login");
      } else {
        setError(res.error || "Registration failed");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
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
          <Text className="text-gray-700 mb-1">Full Name</Text>
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-3 bg-white"
            value={form.name}
            onChangeText={(value) => handleChange("name", value)}
            placeholder="Enter your full name"
          />
        </View>

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
          <Text className="text-gray-700 mb-1">Phone</Text>
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-3 bg-white"
            value={form.phone}
            onChangeText={(value) => handleChange("phone", value)}
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
          />
        </View>

        <View>
          <Text className="text-gray-700 mb-1">State</Text>
          <View className="border border-gray-300 rounded-lg bg-white">
            <Picker
              selectedValue={form.state}
              onValueChange={(value) => handleChange("state", value)}
            >
              <Picker.Item label="Select State" value="" />
              <Picker.Item label="Lagos" value="Lagos" />
              <Picker.Item label="Kano" value="Kano" />
              <Picker.Item label="Abuja" value="Abuja" />
            </Picker>
          </View>
        </View>

        <View>
          <Text className="text-gray-700 mb-1">Local Government (LGA)</Text>
          <View className="border border-gray-300 rounded-lg bg-white">
            <Picker
              selectedValue={form.lga}
              onValueChange={(value) => handleChange("lga", value)}
              enabled={!!form.state}
            >
              <Picker.Item label="Select LGA" value="" />
              {form.state === "Lagos" && (
                <>
                  <Picker.Item label="Ikeja" value="Ikeja" />
                  <Picker.Item label="Surulere" value="Surulere" />
                </>
              )}
              {form.state === "Kano" && (
                <>
                  <Picker.Item label="Kano Municipal" value="Kano Municipal" />
                  <Picker.Item label="Fagge" value="Fagge" />
                </>
              )}
              {form.state === "Abuja" && (
                <>
                  <Picker.Item label="Gwagwalada" value="Gwagwalada" />
                  <Picker.Item label="Kuje" value="Kuje" />
                </>
              )}
            </Picker>
          </View>
        </View>

        <View>
          <Text className="text-gray-700 mb-1">Gender</Text>
          <View className="border border-gray-300 rounded-lg bg-white">
            <Picker
              selectedValue={form.gender}
              onValueChange={(value) => handleChange("gender", value)}
            >
              <Picker.Item label="Select Gender" value="" />
              <Picker.Item label="Male" value="male" />
              <Picker.Item label="Female" value="female" />
            </Picker>
          </View>
        </View>

        <View>
          <Text className="text-gray-700 mb-1">Password</Text>
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-3 bg-white"
            value={form.password}
            onChangeText={(value) => handleChange("password", value)}
            placeholder="Enter your password"
            secureTextEntry
          />
        </View>

        <View>
          <Text className="text-gray-700 mb-1">Confirm Password</Text>
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-3 bg-white"
            value={form.confirm}
            onChangeText={(value) => handleChange("confirm", value)}
            placeholder="Confirm your password"
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          className={`bg-primary py-3 rounded-lg mt-4 ${
            loading ? "opacity-50" : ""
          }`}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text className="text-white text-center font-medium">
            {loading ? "Processing..." : "Register"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="mt-4"
          onPress={() => navigation.navigate("Login")}
        >
          <Text className="text-primary text-center">
            Already have an account? Login
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
