import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Image,
  StyleSheet,
} from "react-native";
import { COLORS, SIZES } from "../constant/theme";
import { Context as AppContext } from "../context/AppContext";

const WelcomeScreen = ({ navigation }) => {
  const { state } = useContext(AppContext);
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/support.png")}
          style={styles.vectorImage}
        />
        <Text
          style={{ fontSize: 20, fontWeight: "bold", color: COLORS.yellow }}
        >
          Help us to improve our services
        </Text>
        <Text
          style={{
            textAlign: "center",
            fontSize: 10,
            marginTop: 10,
            color: COLORS.primary,
          }}
        >
          We use survey to find out attitudes anad reactions, to measure client
          satisfaction, to gauge options about varius issues, and to add
          credibility to our wide range of services
        </Text>
      </View>

      <TouchableOpacity
        style={styles.startBatton}
        onPress={() => navigation.navigate("Identififation")}
      >
        <Text style={styles.startText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "azure",
  },
  header: {
    flex: 1,
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
  },
  vectorImage: {
    height: SIZES.height * 0.2,
    width: "40%",
    resizeMode: "cover",
    borderRadius: 10,
    marginBottom: 10,
  },
  startBatton: {
    backgroundColor: COLORS.primary,
    height: SIZES.height * 0.07,
    width: "80%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SIZES.height * 0.05,
    marginTop: SIZES.height * 0.25,
  },
  startText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default WelcomeScreen;
