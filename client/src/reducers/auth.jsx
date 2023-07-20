import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SAVE_ENTREPRISE,
  SAVE_PROFILE,
  GET_INFORMATION,
  SAVE_EMPLOYE,
} from "../actions/type";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = user
  ? { isLoggedIn: true, user, }
  : {
      isLoggedIn: false,
      user: null,
      entreprise: null,
      profile: null,
      updateInformation: null,
    };

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        employe: null,
      };
    case SAVE_ENTREPRISE:
      return {
        ...state,
        entreprise: payload,
      };
    case SAVE_PROFILE:
      return {
        ...state,
        updateInformation: payload,
      };
    case GET_INFORMATION:
      return {
        ...state,
        isLoggedIn: true,
        profile:payload,
      };
    case SAVE_EMPLOYE:
      return {
        ...state,
        employe: payload,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        employe: null,
      };
    default:
      return state;
  }
}
