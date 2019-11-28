import { combineReducers } from 'redux';
import user from './user/reducer';
import drones from './drones/reducer';
import squadrons from './squadrons/reducer';

const rootReducer = combineReducers({
    user,
    drones,
    squadrons,
});

export default rootReducer;
