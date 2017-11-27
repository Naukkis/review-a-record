const R = require('ramda');

const initialState = {
  artists: "",
  albums: "",
  config: ""
}

const reducer = (state= initialState, action) => {
  switch (action.type) {
    case 'LOAD_ALBUM':
      const C = R.compose(
        R.assocPath([action.field], action.payload))(state)
      return C

    case 'LOAD_ARTIST':
      const B = R.compose(
        R.assocPath([action.field], action.payload))(state)
      return B
  }
  return state;
}

export {reducer};
