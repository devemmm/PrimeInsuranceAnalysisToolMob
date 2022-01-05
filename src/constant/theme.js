import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
  primary: "rgb(21,159,219)",
  secondary: "#1E90FF",
  accent: "#3498db",

  success: "#00C851",
  error: "#ff4444",

  black: "#171717",
  white: "#FFFFFF",
  background: "rgb(21,159,219)",

  yellow: "rgb(249,211,35)",
};

export const SIZES = {
  base: 10,
  width,
  height,
};
