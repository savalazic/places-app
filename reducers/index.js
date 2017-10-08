import { combineReducers } from 'redux';

import EventReducer from './EventReducer';
import SelectEventReducer from './SelectEventReducer';
import PlaceReducer from './PlaceReducer';

const rootReducer = combineReducers({
  events: EventReducer,
  places: PlaceReducer,
  selectedEvent: SelectEventReducer,
});

export default rootReducer;
