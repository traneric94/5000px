import { combineReducers } from 'redux';
import modal from './modal_reducer';
import loading from './loading_reducer';
const uiReducer = combineReducers({
  modal,
  loading
});

export default uiReducer;
