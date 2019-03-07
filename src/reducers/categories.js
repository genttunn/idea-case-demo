import ActionTypes from "../actions/ActionTypes";

//Define initial states of reducer
export const initialState = {
  isLoading: false,
  categoryList: [],
  categoryIdsFound: null,
  categoryCurrent: null
};

export default function categories(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.CATEGORIES_ALL_REQ:
      return {
        ...state,
        isLoading: true
      };
    case ActionTypes.CATEGORIES_ALL_OK:
      return {
        ...state,
        categoryList: action.categoryList,
        isLoading: false
      };
    case ActionTypes.CATEGORIES_ALL_X:
      return {
        ...state,
        isLoading: false
      };

    case ActionTypes.CATEGORY_ADD_REQ:
      return {
        ...state,
        isLoading: true
      };
    case ActionTypes.CATEGORY_ADD_OK:
      return {
        ...state,
        categoryList: action.categoryList,
        isLoading: false
      };
    case ActionTypes.CATEGORY_ADD_X:
      return {
        ...state,
        isLoading: false
      };
    case ActionTypes.CATEGORY_DEL_REQ:
      console.log("from reducer");
      console.log(action.categoryList);
      return {
        ...state,
        categoryList: action.categoryList,
        isloading: false
      };
    case ActionTypes.CATEGORY_DEL_X:
      return {
        ...state,
        isLoading: false
      };

    /*
        case ActionTypes.CATEGORY_RANDOMIZED_REQ:
            return {
                ...state,
                isLoading: true,
            };
        case ActionTypes.CATEGORY_RANDOMIZED_OK:
            return {
                ...state,
                categoryCurrent: state.categoryList[action.id],
                isLoading: false,
            };
        case ActionTypes.CATEGORY_RANDOMIZED_X:
            return {
                ...state,
                isLoading: false,
            };
        */
    default:
      return state;
  }
}
