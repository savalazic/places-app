export function selectPlace(place) {
  return {
    type: 'PLACE_SELECTED',
    payload: place,
  };
}

export function placeBack() {
  return {
    type: 'PLACE_BACK',
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
