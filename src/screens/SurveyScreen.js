import React, { useState, useContext } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Modal,
  Alert,
  Animated,
  SectionBase,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constant/theme";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { Context as AuthContext } from "../context/AppContext";

const SurveyScreenn = ({ navigation }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
  const [correctOption, setCorrectOption] = useState(null);
  const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
  const [disabledSubmitButton, setDisabledSubmitButton] = useState(false);
  const [score, setScore] = useState(0);
  const [showNextButton, setShowNextButton] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [commentSection, setCommentSection] = useState(true);
  const [comment, setComment] = useState("");
  const [error, setError] = useState(false);

  const { state, responseQuetion, submitSurvey, restoreContext } =
    useContext(AuthContext);
  const allQuestions = state.questions;
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [showActivityIndictor, setActivityIndictor] = useState(false);

  const validateAnswer = (selectedOption) => {
    let correct_option = allQuestions[currentQuestionIndex]["correct_option"];
    setCurrentOptionSelected(selectedOption);
    setCorrectOption(correct_option);
    setIsOptionsDisabled(false);
    if (selectedOption == correct_option) {
      // Set Score
      setScore(score + 1);
    }
    // Show Next Button
    setShowNextButton(true);
  };

  const convertAnswer = (answer) => {
    switch (answer) {
      case "very satisfied":
        return 1;
      case "satisfied":
        return 2;
      case "Neither satisfied nor dissatisfied":
        return 3;
      case "dissatisfied":
        return 4;
      case "verry dissatisfied":
        return 5;
      default:
        return 0;
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex == allQuestions.length - 1) {
      // Last Question
      // Show Score Modal
      responseQuetion({
        Q$A: {
          question: allQuestions[currentQuestionIndex].question,
          answer: convertAnswer(currentAnswer),
        },
      });
      setShowScoreModal(true);
    } else {
      responseQuetion({
        Q$A: {
          question: allQuestions[currentQuestionIndex].question,
          answer: convertAnswer(currentAnswer),
        },
      });

      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentOptionSelected(null);
      setCorrectOption(null);
      setIsOptionsDisabled(false);
      setShowNextButton(false);
    }
    Animated.timing(progress, {
      toValue: currentQuestionIndex + 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };
  const restartSurvey = () => {
    restoreContext();
    setShowScoreModal(false);

    setCurrentQuestionIndex(0);
    setScore(0);

    setCurrentOptionSelected(null);
    setCorrectOption(null);
    setIsOptionsDisabled(false);
    setShowNextButton(false);
    Animated.timing(progress, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false,
    }).start();
    navigation.navigate("Welcome");
  };

  const renderQuestion = () => {
    return (
      <View
        style={{
          marginVertical: 40,
        }}
      >
        {/* Question Counter */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
          }}
        ></View>

        {/* Question */}
        <Text
          style={{
            color: COLORS.black,
            fontSize: 25,
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          {allQuestions[currentQuestionIndex]?.question}
        </Text>
      </View>
    );
  };
  const renderOptions = () => {
    return (
      <ScrollView>
        {allQuestions[currentQuestionIndex]?.option.map((option) => (
          <TouchableOpacity
            onPress={() => {
              validateAnswer(option);
              setCurrentAnswer(option);
            }}
            disabled={isOptionsDisabled}
            key={option}
            style={{
              borderWidth: 3,
              borderColor:
                option == currentOptionSelected
                  ? COLORS.success
                  : COLORS.secondary + "40",
              backgroundColor:
                option == currentOptionSelected
                  ? COLORS.yellow
                  : COLORS.secondary + "20",
              height: 60,
              borderRadius: 20,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              paddingHorizontal: 20,
              marginVertical: 10,
            }}
          >
            {option == currentOptionSelected ? (
              <Ionicons
                name="radio-button-on"
                style={[styles.radioBtn, { color: COLORS.success }]}
              />
            ) : (
              <Ionicons name="radio-button-off" style={styles.radioBtn} />
            )}
            <Text
              style={{ fontSize: 20, color: COLORS.black, fontWeight: "bold" }}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  const renderNextButton = () => {
    if (showNextButton) {
      return (
        <TouchableOpacity
          onPress={handleNext}
          style={{
            marginTop: 20,
            width: "100%",
            backgroundColor: COLORS.yellow,
            padding: 20,
            borderRadius: 20,
          }}
        >
          <Text
            style={{ fontSize: 20, color: COLORS.white, textAlign: "center" }}
          >
            Next
          </Text>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };

  const [progress, setProgress] = useState(new Animated.Value(0));
  const progressAnim = progress.interpolate({
    inputRange: [0, allQuestions.length],
    outputRange: ["0%", "100%"],
  });
  const renderProgressBar = () => {
    return (
      <View
        style={{
          width: "100%",
          height: 20,
          borderRadius: 20,
          backgroundColor: "#00000020",
          marginTop: 30,
        }}
      >
        <Animated.View
          style={[
            {
              height: 20,
              borderRadius: 20,
              backgroundColor: COLORS.yellow,
            },
            {
              width: progressAnim,
            },
          ]}
        ></Animated.View>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <View
        style={{
          flex: 1,
          paddingVertical: 40,
          paddingHorizontal: 16,
          backgroundColor: COLORS.background,
          position: "relative",
        }}
      >
        <View style={{ justifyContent: "center" }}>
          <Text
            style={{
              color: COLORS.white,
              textAlign: "center",
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            Customer Satisfaction Surveyy
          </Text>
          <Text
            style={{
              color: COLORS.white,
              textAlign: "center",
              fontSize: 14,
              marginHorizontal: 10,
            }}
          >
            Please Fill the form here to share your idea
          </Text>
        </View>
        {/* ProgressBar */}
        {renderProgressBar()}

        <View
          style={{
            height: SIZES.height * 0.58,
            width: "95%",
            marginHorizontal: 10,
            backgroundColor: COLORS.white,
            marginTop: 40,
            backgroundColor: "azure",
            borderRadius: 10,
            paddingHorizontal: 20,
          }}
        >
          {/* Question */}
          {renderQuestion()}

          {/* {renderOptions()} */}
          {renderOptions()}
        </View>

        {/* Next Button */}
        {renderNextButton()}

        {/* Score Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={showScoreModal}
        >
          {commentSection ? (
            <View
              style={{
                flex: 1,
                backgroundColor: COLORS.primary,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TextInput
                placeholder="Comment"
                autoCapitalize="none"
                style={[
                  styles.textArea,
                  { borderColor: error ? "red" : "#fff" },
                ]}
                value={comment}
                onChangeText={(value) => {
                  setError(false);
                  setComment(value);
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  if (comment.length < 1) {
                    setError(true);
                  } else {
                    setCommentSection(false);
                  }
                }}
                style={{
                  backgroundColor: COLORS.yellow,
                  padding: 20,
                  width: "80%",
                  borderRadius: 20,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: COLORS.white,
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                >
                  Send
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                backgroundColor: COLORS.primary,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  backgroundColor: COLORS.white,
                  width: "90%",
                  borderRadius: 20,
                  padding: 20,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 30,
                    fontWeight: "bold",
                    color: COLORS.yellow,
                    textAlign: "center",
                    marginBottom: 30,
                  }}
                >
                  Thank you for your Time!!
                </Text>

                {/* Restart Suvey*/}
                <TouchableOpacity
                  disabled={disabledSubmitButton}
                  onPress={() => {
                    setDisabledSubmitButton(true);
                    submitSurvey({
                      survey: {
                        response: state.response,
                        name: state.name,
                        phone: state.phone,
                        service: state.selectedService,
                      },
                      navigation,
                      Alert,
                      setActivityIndictor,
                      restartSurvey,
                    });

                    // restartSurvey();
                  }}
                  style={{
                    backgroundColor: COLORS.yellow,
                    padding: 20,
                    width: "100%",
                    borderRadius: 20,
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: COLORS.white,
                      fontSize: 20,
                      fontWeight: "bold",
                    }}
                  >
                    Submit Survey
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Modal>

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
          <ActivityIndicator size="large" color="red" />
        </View>
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  quetion: {
    borderWidth: 3,
    borderColor: COLORS.secondary + "40",
    backgroundColor: COLORS.secondary + "20",
    height: 60,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginHorizontal: 10,
  },
  radioBtn: {
    fontSize: 24,
    color: "black",
    marginRight: 10,
  },
  optionText: {
    fontSize: 16,
    textTransform: "capitalize",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginLeft: 20,
    marginVertical: 10,
  },
  textArea: {
    height: 100,
    backgroundColor: "#fff",
    width: "80%",
    borderRadius: 10,
    marginBottom: 40,
    textAlign: "center",
    fontSize: 18,
    color: "grey",
    fontWeight: "bold",
    borderWidth: 2,
  },
});

export default SurveyScreenn;
