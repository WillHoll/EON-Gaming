const initialState ={
  currUsername: '',
  currProfile_pic: '',
  currUser_id: 0,
  landingAuth: false,
  newsAuth: false,
  eventsAuth: false,
  mediaAuth: false
};

//ACTION CONSTANTS

const GET_SESSION = 'GET_SESSION';
// const GET_USER_INFO = 'GET_USER_INFO';
const REDUX_RESETTER = 'REDUX_RESETTER'

//ACTION BUILDERS

export function getSession(currUsername, currProfile_pic, currUser_id, landingAuth, newsAuth, eventsAuth, mediaAuth) {
  return {
    type: GET_SESSION,
    payload: {currUsername, currProfile_pic, currUser_id, landingAuth, newsAuth, eventsAuth, mediaAuth}
  }
};

// export function getUserInfo(currUsername, currProfile_pic, currUser_id) {
//   return {
//     type: GET_USER_INFO,
//     payload: {currUsername, currProfile_pic, currUser_id}
//   }
// };

export function reduxResetter() {
  return {
    type: REDUX_RESETTER,
    payload: initialState
  }
}

//REDUCER FUNCTION
export default function reducer(state = initialState, action) {
  switch(action.type) {
    case GET_SESSION:
      return {
        ...state,
        ...action.payload
      }
    case REDUX_RESETTER:
      return {
        ...initialState
      }
    default: return state;
  };
};