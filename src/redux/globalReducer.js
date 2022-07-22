const initialState = {
  loading: false,
};

const Global = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.value,
      };

    default:
      return state;
  }
};

export default Global;
