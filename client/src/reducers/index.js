import { combineReducers } from 'redux';
import rootReducer from './itemReducer';


export default combineReducers({
    item: rootReducer
});