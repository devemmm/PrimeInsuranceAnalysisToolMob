import React, { useEffect, useContext } from "react";
import { View, Image, ActivityIndicator } from "react-native";
import { SIZES, COLORS } from "../constant/theme";
import { Context as DataContext } from "../context/AppContext";

const SplashScreen = ({ navigation }) => {
  const { fetchAvailableService } = useContext(DataContext);

  useEffect(() => {
    fetchAvailableService({ navigation });
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.primary }}>
      <Image
        source={require("../../assets/splash.png")}
        style={{
          height: SIZES.height,
          width: SIZES.width,
          resizeMode: "contain",
        }}
      />
      <View
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          left: 0,
          height: SIZES.height * 0.35,
        }}
      >
        <ActivityIndicator size="large" color="#fff" />
      </View>
    </View>
  );
};

export default SplashScreen;
