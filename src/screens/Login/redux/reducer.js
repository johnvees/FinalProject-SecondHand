const initialState = {
  userData: {},
  tokenValue: '',
};

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_POST_LOGIN':
      return {
        ...state,
        userData: action.userDataLogin,
      };
    case 'SET_TOKEN':
      return {
        ...state,
        tokenValue: action.token,
      };

    default:
      return state;
  }
};

export default LoginReducer;
