const initialState = {
  notification: 0,
};

const NotificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_BADGE_NUMBER':
      return {
        ...state,
        notification: action.notification,
      };

    default:
      return state;
  }
};

export default NotificationReducer;
