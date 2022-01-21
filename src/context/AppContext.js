import createDataContext from "./createDataContext";
import primeApi from "../api/primeApi";

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "add_service":
      return { ...state, service: action.payload };

    case "add_selecled_service":
      return { ...state, selectedService: action.payload };

    case "add_answer":
      const resp = state.response;
      resp.push(action.payload);
      return { ...state, response: resp };

    case "find_questinaire":
      return { ...state, questions: action.payload };

    case "set_user":
      return {
        ...state,
        name: action.payload.name,
        phone: action.payload.phone,
      };

    case "restore_context":
      return {
        ...state,
        questions: [],
        response: [],
      };
    default:
      return state;
  }
};

const fetchAvailableService =
  (dispatch) =>
  async ({ navigation, Alert, setShowActivityIndicator }) => {
    setShowActivityIndicator(true);
    fetch(`${primeApi}/services`, {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((res) => {
        dispatch({ type: "add_service", payload: res.service });

        navigation.navigate("Welcome");
      })
      .catch(() => {
        setShowActivityIndicator(false);
        Alert.alert(
          "Sorry, something went wrong.",
          "network error please try again",
          [{ text: "OK", onPress: this.fetchAvailableService }]
        );
        navigation.navigate("Welcome");
      });
  };

const setSelectService =
  (dispatch) =>
  ({ service }) =>
    dispatch({ type: "add_selecled_service", payload: service });

const findQuetionaire =
  (dispatch) =>
  async ({ service, setActivityIndictor, navigation, Alert }) => {
    setActivityIndictor(true);
    fetch(`${primeApi}/survey/${service}`, {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((res) => {
        const { survey } = res;
        let quetions = [];

        if (survey.length > 0) {
          survey[0].questions.forEach((que) => {
            que.option = [
              "very satisfied",
              "satisfied",
              "Neither satisfied nor dissatisfied",
              "dissatisfied",
              "verry dissatisfied",
            ];
            quetions.push(que);
          });
        }

        dispatch({ type: "find_questinaire", payload: quetions });
        setActivityIndictor(false);
        navigation.navigate("Survey");
      })
      .catch((error) => {
        console.log(error);
        setActivityIndictor(false);
        Alert.alert(
          "Sorry, something went wrong.",
          "network error please try again",
          [{ text: "OK", onPress: console.log("ok") }]
        );
      });
  };

const responseQuetion =
  (dispatch) =>
  ({ Q$A }) => {
    dispatch({ type: "add_answer", payload: Q$A });
  };

const setUser =
  (dispatch) =>
  ({ user }) =>
    dispatch({ type: "set_user", payload: user });

const submitSurvey =
  (dispatch) =>
  async ({ survey, Alert, setActivityIndictor, restartSurvey }) => {
    setActivityIndictor(true);
    fetch(`${primeApi}/users/respond/survey`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...survey,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        setActivityIndictor(false);
        console.log(res);
        restartSurvey();
      })
      .catch(() => {
        setActivityIndictor(false);
        Alert.alert(
          "Sorry, something went wrong.",
          "network error please try again",
          [{ text: "OK", onPress: console.log("ok") }]
        );
      });
  };

const restoreContext = (dispatch) => () =>
  dispatch({ type: "restore_context" });

export const { Context, Provider } = createDataContext(
  AuthReducer,
  {
    fetchAvailableService,
    setSelectService,
    findQuetionaire,
    responseQuetion,
    setUser,
    submitSurvey,
    restoreContext,
  },
  {
    service: [],
    questions: [],
    selectedService: "",
    response: [],
    name: "",
    phone: "",
  }
);
