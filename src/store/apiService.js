import axios from 'axios';

export const instance = async (
  getState,
  method = 'GET',
  URL,
  isAuth = false,
  params = {},
) => {
  const state = getState();
  const isInternetReachable = state.device.isInternetReachable;

  if (isInternetReachable) {
    try {
      // let headers = {
      //   // Accept: 'application/json',
      //   // 'Content-Type': 'application/json',
      // };

      if (isAuth) {
        // headers = {
        //   ...headers,
        //   Authorization: state.auth.user.access_token,
        // };
      }

      let response = {};

      if (method === 'GET') {
        response = await axios
          .get(URL)
          .then((responseJSON) => responseJSON.data);
      } else {
        response = await axios
          .post(URL, params)
          .then((responseJSON) => responseJSON.data);
      }

      // console.log(response);
      return response;
    } catch (error) {
      // console.log(error);
      return false;
    }
  } else {
    return false;
  }
};
