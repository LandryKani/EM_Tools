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
  LIST_EMPLOYE,
  DELETE_EMPLOYE,
  GET_EMPLOYE_INFORMATION,
  SET_MESSAGE,
  CREATE_PROJECT,
  LIST_PROJECT,
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

export const registerProfile = (dataEmploye) => (dispatch) => {
  AuthService.registerProfile(dataEmploye)
    .then((response) => {
      console.log("this is the response on update", response);
      dispatch({
        type: SAVE_PROFILE,
        payload: response,
      });
    })
    .catch((error) => {
      console.log("this is the error on update", error);
    });
};

export const createProject =(projectsData)=>(dispatch)=>{
  AuthService.createProject(projectsData).then((response)=>{
    console.log("this is the response on create Project", response)
    dispatch({
      type: CREATE_PROJECT,
      payload: response,
    })
  }).catch((error)=>{
    console.log("this is the error on create Porject", error)
  })
}



export const registerEmploye = (newEmploye) => (dispatch) => {
  AuthService.registerEmploye(newEmploye)
    .then((response) => {
      console.log("this is the response on add Employe", response);
      dispatch({
        type: SAVE_EMPLOYE,
        payload: response,
      });
    })
    .catch((error) => {
      console.log("this is the error on add Employe", error);
    });
};

export const listEmploye = () => (dispatch) => {
  AuthService.listEmploye()
    .then((response) => {
      console.log("this is the response on list Employe", response);
      dispatch({
        type: LIST_EMPLOYE,
        payload: response,
      });
    })
    .catch((error) => {
      console.log("this is the error on list Employe", error);
    });
};

export const listProject = () => (dispatch) => {
  AuthService.listProject()
    .then((response) => {
      console.log("this is the response on list Employe", response);
      dispatch({
        type: LIST_PROJECT,
        payload: response,
      });
    })
    .catch((error) => {
      console.log("this is the error on list Employe", error);
    });
};

export const deleteEmploye = (id) => (dispatch) => {
  AuthService.deleteEmploye(id)
    .then((response) => {
      console.log("this is the response on deleteEmploye", response);
      dispatch({
        type: DELETE_EMPLOYE,
        payload: { id: id },
      });
    })
    .catch((error) => {
      console.log("this is the error on list Employe", error);
    });
};

export const getProfile = () => {
  return new Promise((resolve, reject) => {
    AuthService.getProfile()
      .then((res) => {
        console.log("this is the user information", res);
        resolve({
          type: GET_INFORMATION,
          payload: res,
        });
      })
      .catch(() => reject());
  });
};

export const updateEmploye = (id, data) => (dispatch) => {
  AuthService.updateEmploye(id, data)
    .then((response) => {
      console.log("response of update employee:", response.username)
      console.log("id and data:", id, data);
      dispatch({
        type: GET_EMPLOYE_INFORMATION,
        payload: {
          id: id,
          username: data.username,
          e_mail: data.e_mail,
          numtel: data.numtel
        },
      });
    })
    .catch((error) => {
      console.log("this is the error on list Employe", error);
    });
};

export const registerlogo = (logo) => (dispatch) => {
  try {
    return dispatch({
      type: SAVE_ENTREPRISE,
      payload: logo,
    });
  } catch (error) {
    console.log(error);
  }
};

export const register = (data) => (dispatch) => {
  return AuthService.registerEnterprise(data).then(
    (response) => {
      console.log(response);
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
