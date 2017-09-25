export default function (state = null, action) {
  switch (action.type) {
    case 'PLACE_SELECTED':
      return action.payload;
    case 'PLACE_BACK':
      return action.payload;
    default:
      return state;
  }
}
