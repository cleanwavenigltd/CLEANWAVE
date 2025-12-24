import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Input = ({
  label,
  type = "text",
  value,
  onChangeText,
  placeholder = "",
  required = false,
  disabled = false,
  error = "",
  icon: IconName = null,
  className = "",
  showPasswordToggle = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState(false);

  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <View className={`w-full ${className}`}>
      {label && (
        <View className="flex-row items-center mb-2">
          <Text className="text-sm font-medium text-gray-700">{label}</Text>
          {required && <Text className="text-red-500 ml-1">*</Text>}
        </View>
      )}

      <View className="relative">
        {IconName && (
          <Ionicons
            name={IconName}
            size={20}
            color="#9CA3AF"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10"
          />
        )}

        <TextInput
          secureTextEntry={type === "password" && !showPassword}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          editable={!disabled}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`
            w-full
            ${IconName ? "pl-10" : "pl-4"}
            ${showPasswordToggle ? "pr-10" : "pr-4"}
            py-3
            border border-gray-300
            rounded-lg
            ${error ? "border-red-500" : ""}
            ${disabled ? "bg-gray-100" : "bg-white"}
            ${focused ? "shadow-md border-primary" : "shadow-sm"}
          `}
        />

        {showPasswordToggle && type === "password" && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={20}
              color="#6B7280"
            />
          </TouchableOpacity>
        )}
      </View>

      {error && <Text className="mt-1 text-sm text-red-600">{error}</Text>}
    </View>
  );
};

export default Input;
