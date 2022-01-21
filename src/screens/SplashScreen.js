import React, { useEffect, useContext } from "react";
import {
  View,
  Image,
  ActivityIndicator,
  Alert,
  Text,
  TouchableOpacity,
} from "react-native";
import { useState } from "react/cjs/react.development";
import { SIZES, COLORS } from "../constant/theme";
import { Context as DataContext } from "../context/AppContext";

const SplashScreen = ({ navigation }) => {
  const { fetchAvailableService } = useContext(DataContext);

  const [showActivityIndictor, setShowActivityIndicator] = useState(true);

  useEffect(() => {
    fetchAvailableService({ navigation, Alert, setShowActivityIndicator });
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

      {showActivityIndictor ? (
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
      ) : (
        <TouchableOpacity
          onPress={() =>
            fetchAvailableService({
              navigation,
              Alert,
              setShowActivityIndicator,
            })
          }
          style={{
            backgroundColor: COLORS.yellow,
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            alignSelf: "center",
            width: "40%",
            marginBottom: 5,
            borderRadius: 5,
          }}
        >
          <Text style={{ color: "#fff" }}>Reflesh</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SplashScreen;
