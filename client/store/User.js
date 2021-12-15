import axios from "axios";

const FETCH_APPLICATIONS = "FETCH_APPLICATIONS";
const NEW_APPLICATION = "NEW_APPLICATION";
const TOKEN = 'token'

const fetchApp = (app) => {
  return {
    type: FETCH_APPLICATIONS,
    apps: app
  }
}

const newApp = (app) => {
  return {
    type: NEW_APPLICATION,
    newApplication: app
  }
}

export const fetchUserApp = (userId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/api/users/${userId}`);
      const applications = response.data;
      dispatch(fetchApp(applications))

    } catch(e) {
      console.log('SORRY',e);
    }
  }
}

export const fetchNewApp = (appl) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      console.log(token)
      if (token) {
        const newResponse = await axios.post(`/api/users/create`,{
          headers: {
            authorization: token
          },
          appl
        });
        const result = newResponse.data;
        return dispatch(newApp(result));
      }

    } catch (error) {
      console.log('Sorry',error);
    }
  }
}


export default function appReducer(state = [], action) {
  switch(action.type) {
    case FETCH_APPLICATIONS:
      return action.apps;
    case NEW_APPLICATION:
      return [...state, action.newApplication]
    default:
    return state;
  }
}
