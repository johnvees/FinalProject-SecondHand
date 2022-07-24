const initialState = {
  userData: {},
};

const UbahAkunReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_GET_USER_DATA':
      return {
        ...state,
        userData: action.getUserData,
      };

    default:
      return state;
  }
};

export default UbahAkunReducer;
