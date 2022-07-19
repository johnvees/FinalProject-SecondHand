import {combineReducers} from 'redux';
import Global from './globalReducer';
import LoginReducer from '../screens/Login/redux/reducer';

export const allReducers = combineReducers({
  login: LoginReducer,
  Global,
});
