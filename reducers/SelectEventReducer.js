export default function (state = null, action) {
  switch (action.type) {
    case 'EVENT_SELECTED':
      return action.payload;
    case 'EVENT_BACK':
      return action.payload;
    default:
      return state;
  }
}
