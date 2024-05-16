import teamReducer from './teamReducer.tsx';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
    team: teamReducer
});

export default allReducers;