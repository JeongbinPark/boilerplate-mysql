import {
  REGISTER_USER,
  LOGIN_USER,
  AUTH_USER
} from '../_actions/types';

const initState = null;

export default function(state=initState, action){
  switch (action) {
    case REGISTER_USER:
      return {...state, success:action.payload};
    case LOGIN_USER:
      return {...state, loginSuccess:action.payload};
    case AUTH_USER:
      return {...state, userData: action.payload};
    default :
      return state;
  }
}