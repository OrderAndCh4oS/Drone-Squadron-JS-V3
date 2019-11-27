import { combineReducers } from 'redux';
import userReducer from './user/reducer';
import dronesReducer from './drones/reducer';
import squadronsReducer from './squadrons/reducer';

const rootReducer = combineReducers({
    userReducer,
    dronesReducer,
    squadronsReducer,
});

export default rootReducer;
