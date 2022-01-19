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

    default:
      return status;
  }
};

const fetchAvailableService =
  (dispatch) =>
  async ({ navigation }) => {
    try {
      const response = await primeApi.get("/services");

      dispatch({ type: "add_service", payload: response.data.service });

      navigation.navigate("Welcome");
    } catch (error) {
      console.log(error.message);
      navigation.navigate("Welcome");
    }
  };

const setSelectService =
  (dispatch) =>
  ({ service }) =>
    dispatch({ type: "add_selecled_service", payload: service });

const findQuetionaire =
  (dispatch) =>
  async ({ service, setActivityIndictor, navigation }) => {
    try {
      setActivityIndictor(true);
      const response = await primeApi.get(`/survey/${service}`);
      const { survey } = response.data;

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
    } catch (error) {
      console.log(error);
      navigation.navigate("Welcome");
    }
  };

const responseQuetion =
  (dispatch) =>
  ({ Q$A }) => {
    dispatch({ type: "add_answer", payload: Q$A });
  };

export const { Context, Provider } = createDataContext(
  AuthReducer,
  { fetchAvailableService, setSelectService, findQuetionaire, responseQuetion },
  { service: [], questions: [], selectedService: "", response: [] }
);