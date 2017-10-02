export function selectEvent(event) {
  return {
    type: 'EVENT_SELECTED',
    payload: event,
  };
}

export function eventBack() {
  return {
    type: 'EVENT_BACK',
    payload: null,
  };
}

export function onSortingChange(sorting) {
  return {
    type: 'SET_SORTING',
    payload: sorting,
  };
}

export function onShowingChange(showing) {
  return {
    type: 'SET_SHOWING',
    payload: showing,
  };
}
