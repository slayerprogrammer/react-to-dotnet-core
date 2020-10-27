import {combineReducers} from 'redux';
import tripReducers from './tripReducers';

const rootReducer = combineReducers({
    trips: tripReducers
});

export default rootReducer;