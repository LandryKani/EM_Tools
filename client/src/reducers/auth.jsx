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
  LIST_EMPLOYE,
  DELETE_EMPLOYE,
  GET_EMPLOYE_INFORMATION,
  CREATE_PROJECT,
  LIST_PROJECT,
} from "../actions/type";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = user
  ? { isLoggedIn: true, user }
  : {
      isLoggedIn: false,
      user: null,
      entreprise: null,
      profile: null,
      project: null,
      employees: null,
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
        user: {
          ...state.auth.user,
          payload,
        },
      };
    case GET_INFORMATION:
      return {
        ...state,
        isLoggedIn: true,
        profile: payload,
      };
    case SAVE_EMPLOYE:
      return {
        ...state,
        employe: payload,
      };
    case LIST_EMPLOYE:
      return {
        ...state,
        isLoggedIn: true,
        employees: payload,
      };
      case LIST_PROJECT:
        return {
          ...state,
          isLoggedIn: true,
          project: payload,
        };
    case DELETE_EMPLOYE:
      return {
        ...state,
        employees: state.employees.filter((x) => x.id !== action.payload.id),
      };
    case GET_EMPLOYE_INFORMATION:
      return {
        ...state,
        isLoggedIn: true,
        employees: state.employees.map((employee) =>
          employee.id === action.payload.id
            ? {
                ...employee,
                username: action.payload.username,
                e_mail: action.payload.e_mail,
                numtel: action.payload.numtel,
              }
            : employee
        ),
      };
    case CREATE_PROJECT:
      return{
        ...state,
        isLoggedIn: true,
        project: payload,
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
