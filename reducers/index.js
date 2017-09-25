import { combineReducers } from 'redux';

import PlaceReducer from './PlaceReducer';
import SelectPlaceReducer from './SelectPlaceReducer';

const rootReducer = combineReducers({
  places: PlaceReducer,
  selectedPlace: SelectPlaceReducer,
});

export default rootReducer;
