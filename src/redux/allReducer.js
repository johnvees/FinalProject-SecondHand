import {combineReducers} from 'redux';
import Global from './globalReducer';
import LoginReducer from '../screens/Login/redux/reducer';
import RegisterReducer from '../screens/Register/redux/reducer';
import NotificationReducer from '../screens/Notifikasi/redux/reducer';

export const allReducers = combineReducers({
  login: LoginReducer,
  register: RegisterReducer,
  notification: NotificationReducer,
  Global,
});
