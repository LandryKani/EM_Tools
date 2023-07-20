import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SAVE_ENTREPRISE,
  SAVE_PROFILE,
  SAVE_EMPLOYE,
  GET_INFORMATION,
  SET_MESSAGE,
} from "./type";

import AuthService from "../services/auth.service";

export const registerEnterprise = (dataEntreprise) => (dispatch) => {
  try {
    return dispatch({
      type: SAVE_ENTREPRISE,
      payload: dataEntreprise,
    });
  } catch (error) {
    console.log(error);
  }
};

export  const registerProfile = (dataEmploye)=>{
  return new Promise((resolve,reject)=>{
    AuthService.registerProfile(dataEmploye).then(
      (res)=>{
        resolve({
          type: SAVE_PROFILE,
          payload: res,
        }).catch(()=>reject())
      }
    )
  })
}



export const getProfile = (accessToken)=>{
  return new Promise((resolve, reject) => {
    AuthService.getProfile(accessToken).then(
      (res) => {
        resolve({
          type: GET_INFORMATION,
          payload: res ,
        })
      }).catch(()=>reject())
  })
  
}

export const registerlogo= (logo)=>(dispatch) => {
  try {
    return dispatch({
      type: SAVE_ENTREPRISE,
      payload: logo,
    });
  } catch (error) {
    console.log(error);
  }
}

export const register =
  (data) =>
  (dispatch) => {
    return AuthService.registerEnterprise(
      data
    ).then(
      (response) => {
        console.log(response)
        dispatch({
          type: REGISTER_SUCCESS,
        });

        dispatch({
          type: SET_MESSAGE,
          payload: response.message,
        });

        return Promise.resolve();
      },

      
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        dispatch({
          type: REGISTER_FAIL,
        });
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });

        return Promise.reject();
      }
    );
  };

export const login = (username, password) => (dispatch) => {
  return AuthService.login(username, password).then(
    (data) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data },
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: LOGIN_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const logout = () => (dispatch) => {
  AuthService.logout();

  dispatch({
    type: LOGOUT,
  });
};
