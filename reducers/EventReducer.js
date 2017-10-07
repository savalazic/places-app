const initialState = {
  events: [],
  sorting: '',
  showing: {
    type: ['all'],
    city: 'Beograd',
  },
};


export default function (state = initialState, action) {
  switch (action.type) {
    case 'FETCH_EVENTS':
      return Object.assign({}, state, {
        events: action.payload.data,
      });
    case 'SET_SHOWING_CITY':
      return {
        ...state,
        showing: {
          ...state.showing,
          city: action.payload,
        },
      };
    case 'SET_SHOWING_TYPE':
      return {
        ...state,
        showing: {
          ...state.showing,
          type: action.payload,
        },
      };
    case 'SET_SORTING':
      return {
        ...state,
        sorting: action.payload,
      };
    default:
      return state;
  }
}
