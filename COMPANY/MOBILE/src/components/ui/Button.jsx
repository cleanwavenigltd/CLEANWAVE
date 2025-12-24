import React from "react";
import { TouchableOpacity, Text, ActivityIndicator } from "react-native";

const Button = ({
  children,
  onPress,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  className = "",
}) => {
  const baseClasses =
    "font-medium rounded-lg flex-row items-center justify-center gap-2";

  const variantClasses = {
    primary: "bg-primary text-white shadow-md",
    secondary: "bg-secondary text-white shadow-md",
    outline: "border-2 border-primary text-primary",
    ghost: "text-primary",
    danger: "bg-red-600 text-white shadow-md",
  };

  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-3 text-base",
    lg: "px-6 py-4 text-lg",
    xl: "px-8 py-5 text-xl",
  };

  const disabledClasses = disabled || loading ? "opacity-50" : "";

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${disabledClasses}
        ${className}
      `}
    >
      {loading && <ActivityIndicator size="small" color="white" />}
      <Text className={`${variantClasses[variant]} ${sizeClasses[size]}`}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
