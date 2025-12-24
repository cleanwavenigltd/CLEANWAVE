import React from "react";

const Card = ({
  children,
  className = "",
  padding = "md",
  shadow = "md",
  hover = false,
  onClick,
}) => {
  const paddingClasses = {
    none: "",
    sm: "p-3",
    md: "p-4",
    lg: "p-6",
    xl: "p-8",
  };

  const shadowClasses = {
    none: "",
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
    xl: "shadow-xl",
  };

  const hoverClasses = hover
    ? "hover:shadow-lg transition-shadow duration-200 cursor-pointer"
    : "";

  return (
    <div
      className={`
        bg-white rounded-xl
        ${paddingClasses[padding]}
        ${shadowClasses[shadow]}
        ${hoverClasses}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;
