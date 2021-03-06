import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  FlatList,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constant/theme";
import { Context as AuthContext } from "../context/AppContext";

const IdentificationScreen = ({ navigation }) => {
  const [showPersonalIdentification, setShowPersonalIdentification] =
    useState(true);

  const { state, setSelectService, findQuetionaire, setUser } =
    useContext(AuthContext);
  const primeServices = state.service;

  const [names, setNames] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [showActivityIndictor, setActivityIndictor] = useState(false);

  const handleStart = () => {
    if (!names || !phone) {
      return;
    }

    if (phone.length < 9) {
      return;
    }

    setNames("");
    setPhone("");

    setUser({ user: { name: names, phone: `+250${phone}` } });

    findQuetionaire({
      service: state.selectedService,
      setActivityIndictor,
      Alert,
      navigation,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <View
        style={{
          flex: 1,
          paddingHorizontal: 16,
          backgroundColor: COLORS.primary,
          position: "relative",
        }}
      >
        <View style={{ height: SIZES.height * 0.3, width: "100%" }}>
          <Image
            source={require("../../assets/images/logo.png")}
            style={{
              width: "100%",
              height: "100%",
            }}
            resizeMode={"contain"}
          />
        </View>

        {showPersonalIdentification ? (
          <View
            style={{
              height: SIZES.height * 0.4,
              justifyContent: "center",
              flex: 1,
            }}
          >
            <Text
              style={{
                color: COLORS.white,
                textAlign: "center",
                fontSize: 16,
                fontWeight: "bold",
                marginBottom: 10,
              }}
            >
              Please select the services you want to make survey on
            </Text>

            <FlatList
              data={primeServices}
              keyExtractor={(services) => services.name}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    style={{
                      borderWidth: 3,
                      borderColor:
                        item.name == service
                          ? COLORS.success
                          : COLORS.secondary + "40",
                      backgroundColor:
                        item.name == service ? COLORS.yellow + "90" : "#1c7ad6",

                      height: 60,
                      borderRadius: 20,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingHorizontal: 20,
                      marginVertical: 10,
                    }}
                    onPress={() => {
                      setSelectService({ service: item.name });
                      // console.log({ service: item.name });
                      setService(item.name);
                    }}
                  >
                    <Text style={{ fontSize: 20, color: COLORS.white }}>
                      {item.name}
                    </Text>

                    {item.name == service ? (
                      <View
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: 30 / 2,
                          backgroundColor: COLORS.success,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <MaterialCommunityIcons
                          name="check"
                          style={{
                            color: COLORS.white,
                            fontSize: 20,
                          }}
                        />
                      </View>
                    ) : null}
                  </TouchableOpacity>
                );
              }}
            />

            <TouchableOpacity
              onPress={() => {
                setShowPersonalIdentification(!showPersonalIdentification);
              }}
              style={{
                backgroundColor: COLORS.yellow,
                height: SIZES.height * 0.08,
                borderRadius: 10,
                justifyContent: "center",
                marginTop: 20,
                marginVertical: 20,
              }}
            >
              <Text
                style={{
                  color: COLORS.white,
                  fontSize: 30,
                  textAlign: "center",
                }}
              >
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View
            style={{
              height: SIZES.height * 0.4,
              justifyContent: "center",
            }}
          >
            <TextInput
              placeholder="Names"
              placeholderTextColor={COLORS.yellow}
              autoFocus
              style={styles.textField}
              value={names}
              onChangeText={(names) => setNames(names)}
            />

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <Text style={[styles.textField, { color: COLORS.yellow }]}>
                (+250)
              </Text>
              <TextInput
                placeholder="Phone number"
                placeholderTextColor={COLORS.yellow}
                style={styles.textField}
                autoComplete={false}
                autoCapitalize="none"
                keyboardType="phone-pad"
                value={phone}
                maxLength={9}
                onChangeText={(phone) => setPhone(phone)}
                returnKeyType="done"
                onSubmitEditing={handleStart}
              />
            </View>

            <TouchableOpacity
              onPress={handleStart}
              style={{
                backgroundColor: COLORS.yellow,
                height: SIZES.height * 0.08,
                borderRadius: 10,
                justifyContent: "center",
                marginTop: 20,
              }}
            >
              <Text
                style={{
                  color: COLORS.white,
                  fontSize: 30,
                  textAlign: "center",
                }}
              >
                Start
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Background Image */}
        <Image
          source={require("../../assets/images/DottedBG.png")}
          style={{
            width: SIZES.width,
            height: 130,
            zIndex: -1,
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            opacity: 0.5,
          }}
          resizeMode={"contain"}
        />
      </View>

      {showActivityIndictor ? (
        <View
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            left: 0,
            height: SIZES.height,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size="large" color="#fff" />
        </View>
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textField: {
    color: COLORS.white,
    fontSize: 25,
    borderBottomColor: COLORS.yellow,
    borderBottomWidth: 0.5,
    marginVertical: 20,
    padding: 10,
  },
});

export default IdentificationScreen;
