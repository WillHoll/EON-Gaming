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

const GET_SESSION = 'GET_SESSION'

//ACTION BUILDERS

export function getSession(currUsername, currProfile_pic, currUser_id) {
  return {
    type: GET_SESSION,
    payload: {currUsername, currProfile_pic, currUser_id}
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
    default: return state;
  };
};