const initialState = {
  userData: {},
};

const RegisterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_POST_REGISTER':
      return {
        ...state,
        userData: action.userDataRegister,
      };

    default:
      return state;
  }
};

export default RegisterReducer;
