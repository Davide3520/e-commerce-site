import axios from "axios";

const FETCH_APPLICATIONS = "FETCH_APPLICATIONS";

const fetchApp = (app) => {
  return {
    type: FETCH_APPLICATIONS,
    apps: app
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

export default function appReducer(state = [], action) {
  switch(action.type) {
    case FETCH_APPLICATIONS:
      return action.apps;
    default:
    return state;
  }
}
