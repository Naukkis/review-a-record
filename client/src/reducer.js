const R = require('ramda');

const initialState = {
  artists: "",
  albums: "",
  artistalbums: "",
  config: "",
  reviews: "",
  writereview: ""
}

const reducer = (state= initialState, action) => {
  switch (action.type) {
    case 'LOAD_ALBUM':
      const A = R.compose(
        R.assocPath([action.field], action.payload))(state)
      return A

    case 'LOAD_ARTIST':
      const B = R.compose(
        R.assocPath([action.field], action.payload))(state)
      return B

    case 'CHANGE_REDIRECT':
      const C = R.compose(
        R.assocPath([action.field], action.payload))(state)
      return C

    case 'LOAD_REVIEWS':
      const D = R.compose(
        R.assocPath([action.field], action.payload))(state)
      return D

    case 'WRITE_REVIEW':
      const E = R.compose(
        R.assocPath([action.field], action.payload))(state)
      return E

    default: return state;
  }

}

export {reducer};
