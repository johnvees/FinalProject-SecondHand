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
    case 'SET_NOTIFICATION':
      return {
        ...state,
        notification: action.notification,
      };
    default:
      return state;
  }
};

export default NotificationReducer;
