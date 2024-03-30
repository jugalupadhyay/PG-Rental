export const getAllPgsReducer = (state = { pgs: [] }, action) => {
  switch (action.type) {
    case "GET_PGS_REQUEST":
      return {
        loading: true,
        ...state,
      };
    case "GET_PGS_SUCCESS":
      return {
        loading: false,
        pgs: action.payload,
      };
    case "GET_PGS_FAILED":
      return {
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export const addPgReducer = (state = {}, action) => {
  switch (action.type) {
    case "ADD_PG_REQUEST":
      return {
        loading: true,
        ...state,
      };
    case "ADD_PG_SUCCESS":
      return {
        loading: false,
        success: true,
      };
    case "ADD_PG_FAILED":
      return {
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
