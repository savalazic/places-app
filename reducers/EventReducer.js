// import _ from 'lodash';

// const events = [
//   {
//     _id: '59d1933eb2498063a9e4e442',
//     name: 'RnB Sunday',
//     description: 'lorem ipsum',
//     from: 23,
//     to: 4,
//     place: {
//       _id: '59d1929cfb2b7451ec513706',
//       name: 'Brankow',
//       city: 'Beograd',
//       address: 'Baba Visnjina 45',
//       email: 'mail@brankow.rs',
//       telephone: '123123',
//       description: 'lorem ipsum',
//       lat: 44.812046499999996,
//       lng: 20.494431799999998,
//       from: 6,
//       to: 20,
//       category: {
//         _id: '59d17df5b94b5e432c866e44',
//         name: 'club',
//         __v: 0,
//       },
//       __v: 0,
//       comment: [

//       ],
//       images: [
//         'https://www.beogradnocu.com/wp-content/uploads/2013/01/14939542_912840072186621_484914153173230101_o-1024x576.jpg',
//         'http://serbia-touroperator.com/wp-content/uploads/2016/01/brankow-5.jpg',
//       ],
//       features: [
//         'credit card',
//         'parking',
//       ],
//     },
//     __v: 0,
//     date: '2017-10-02T01:15:42.481Z',
//   },
// ];

const initialState = {
  events: [],
  sorting: '',
  showing: ['all'],
};


export default function (state = initialState, action) {
  switch (action.type) {
    case 'FETCH_EVENTS':
      return Object.assign({}, state, {
        events: action.payload.data,
      });
    case 'SET_SHOWING':
      return {
        ...state,
        showing: action.payload,
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
