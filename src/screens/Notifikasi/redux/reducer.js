const initialState = {
  badge: 0,
  notification: [],
};

const NotificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_BADGE_NUMBER':
      return {
        ...state,
        badge: action.badge,
      };

    default:
      return state;
  }
};

export default NotificationReducer;
