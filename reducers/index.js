import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import EventReducer from './EventReducer';
import SelectEventReducer from './SelectEventReducer';
import PlaceReducer from './PlaceReducer';

const rootReducer = combineReducers({
  events: EventReducer,
  places: PlaceReducer,
  selectedEvent: SelectEventReducer,
  form: formReducer,
});

export default rootReducer;
