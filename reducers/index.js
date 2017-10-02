import { combineReducers } from 'redux';

import EventReducer from './EventReducer';
import SelectEventReducer from './SelectEventReducer';

const rootReducer = combineReducers({
  events: EventReducer,
  selectedEvent: SelectEventReducer,
});

export default rootReducer;
