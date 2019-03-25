import ActionTypes from "../actions/ActionTypes";

//Define initial states of reducer
export const initialState = {
  isLoading: false,
  categoryList: [],
  categoryIdsFound: null,
  categoryCurrent: null,
  categorySearch: [],
  isSearch: false
};

export default function categories(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.CATEGORIES_ALL_REQ:
      return {
        ...state,
        isLoading: true
      };
    case ActionTypes.CATEGORIES_ALL_OK:
      let foo = action.categoryList;
      console.log("fetching");
      console.log(state);
      if (state.isSearch) {
        let searchFilter = state.categorySearch.map(item => {
          return item.id;
        });
        foo = foo.filter(item => searchFilter.includes(item.id));
      }
      return {
        ...state,
        categoryList: foo,
        isLoading: false
      };
    case ActionTypes.CATEGORIES_ALL_X:
      return {
        ...state,
        isLoading: false
      };
    case ActionTypes.CATEGORIES_SEARCH_REQ:
      return {
        ...state,
        isLoading: true
      };
    case ActionTypes.CATEGORIES_SEARCH_OK:
      return {
        ...state,
        categorySearch: action.categorySearch,
        isLoading: false
      };
    case ActionTypes.CATEGORIES_SEARCH_X:
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
        isLoading: false
      };
    case ActionTypes.CATEGORY_ADD_X:
      return {
        ...state,
        isLoading: false
      };
    case ActionTypes.CATEGORY_DEL_REQ:
      return {
        ...state,
        isLoading: true
      };
    case ActionTypes.CATEGORY_DEL_OK:
      return {
        ...state,
        isLoading: false
      };
    case ActionTypes.CATEGORY_DEL_X:
      return {
        ...state,
        isLoading: false
      };
    case ActionTypes.CATEGORY_EDIT_REQ:
      return {
        ...state,
        isloading: true
      };
    case ActionTypes.CATEGORY_EDIT_OK:
      return {
        ...state,
        isLoading: false
      };
    case ActionTypes.CATEGORY_EDIT_X:
      return {
        ...state,
        isLoading: false
      };
    case ActionTypes.CATEGORIES_IS_SEARCH:
      return {
        ...state,
        categorySearch: [],
        isSearch: action.isSearch
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
