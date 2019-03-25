import ActionTypes from "./ActionTypes";
const serverURL = "http://localhost:7000/category";
let savedCriteria = null;
// ACTION CREATORS (Action object creator functions)
// ~ standard and only way to create each action object
export const categoriesAll_REQ = () => ({
  type: ActionTypes.CATEGORIES_ALL_REQ
});
export const categoriesAll_OK = categoryList => ({
  type: ActionTypes.CATEGORIES_ALL_OK,
  categoryList: categoryList
});
export const categoriesAll_X = () => ({
  type: ActionTypes.CATEGORIES_ALL_X
});

export const categoriesSEARCH_REQ = () => ({
  type: ActionTypes.CATEGORIES_SEARCH_REQ
});
export const categoriesSEARCH_OK = categorySearch => ({
  type: ActionTypes.CATEGORIES_SEARCH_OK,
  categorySearch: categorySearch
});
export const categoriesSEARCH_X = () => ({
  type: ActionTypes.CATEGORIES_SEARCH_X
});
export const categoriesIS_SEARCH = isSearch => ({
  type: ActionTypes.CATEGORIES_IS_SEARCH,
  isSearch: isSearch
});
// Same with other actions...
// Action object creator functions
export const categoryAdd_REQ = () => ({
  type: ActionTypes.CATEGORY_ADD_REQ
});
export const categoryAdd_OK = () => ({
  type: ActionTypes.CATEGORY_ADD_OK
});
export const categoryAdd_X = () => ({
  type: ActionTypes.CATEGORY_ADD_X
});

export const categoryDEL_REQ = () => ({
  type: ActionTypes.CATEGORY_DEL_REQ
});
export const categoryDEL_OK = () => ({
  type: ActionTypes.CATEGORY_DEL_OK
});
export const categoryDEL_X = () => ({
  type: ActionTypes.CATEGORY_DEL_X
});

export const categoryEDIT_REQ = () => ({
  type: ActionTypes.CATEGORY_EDIT_REQ
});
export const categoryEDIT_OK = () => ({
  type: ActionTypes.CATEGORY_EDIT_OK
});
export const categoryEDIT_X = () => ({
  type: ActionTypes.CATEGORY_EDIT_X
});

// Helper function, real action function?
export function fetchAllCategories() {
  return async (dispatch, getState) => {
    dispatch(categoriesAll_REQ());

    fetch(serverURL + "/alljson")
      .then(data => data.json())
      .then(data => {
        const categoryList = data;
        dispatch(categoriesAll_OK(categoryList));
      })
      .catch(() => {
        console.log("error fetching");
        dispatch(categoriesAll_X());
      });
  };
}

// Helper function, real action function?
export function addCategory(category) {
  return async (dispatch, getState) => {
    dispatch(categoryAdd_REQ());
    if (!category.id || !category.name || !category.budget) {
      dispatch(categoryAdd_X());
      alert("All fields required. ID and Budget must be numbers.");
    } else {
      fetch(serverURL + "/add", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            id: category.id,
            name: category.name,
            budget: category.budget
          })
        })
        .then(data => {
          if (data.status === 422) {
            alert("This ID already exists");
            dispatch(categoryAdd_X());
          } else if (data.status === 423) {
            alert("All fields required. ID and Budget must be numbers.");
            dispatch(categoryAdd_X());
          } else if (data.status === 200) {
            dispatch(categoryAdd_OK());
            dispatch(fetchAllCategories());
          }
        })
        .catch(() => {
          dispatch(categoryAdd_X());
        });
    }
  };
}

export function deleteCategory(category) {
  return async (dispatch, getState) => {
    dispatch(categoryDEL_REQ());
    fetch(serverURL + "/delete", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: category.id,
          name: category.name,
          budget: category.budget
        })
      })
      .then(() => {
        dispatch(categoryDEL_OK());
        if (savedCriteria !== null) {
          dispatch(searchCategory(savedCriteria));
        } else {
          dispatch(fetchAllCategories());
        }
      })
      .catch(() => dispatch(categoryDEL_X()));
  };
}

export function editCategory(category) {
  return async (dispatch, getState) => {
    dispatch(categoryEDIT_REQ());
    fetch(serverURL + "/edit", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: category.id,
          name: category.name,
          budget: category.budget
        })
      })
      .then(data => {
        if (data.status === 422) {
          dispatch(categoryEDIT_X());
          alert("Invalid input. Please fill all blanks.");
        } else if (data.status === 423) {
          dispatch(categoryEDIT_X());
          alert("Invalid budget");
        } else if (data.status === 200) {
          dispatch(categoryEDIT_OK());
          if (savedCriteria !== null) {
            dispatch(searchCategory(savedCriteria));
          } else {
            dispatch(fetchAllCategories());
          }
        }
      })
      .catch(() => dispatch(categoryEDIT_X()));
  };
}

export function searchCategory(criteria) {
  savedCriteria = criteria;
  return async (dispatch, getState) => {
    dispatch(categoriesSEARCH_REQ());
    fetch(serverURL + "/search", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: criteria.name,
          budget: criteria.budget,
          isAbove: criteria.isAbove
        })
      })
      .then(data => data.json())
      .then(data => {
        const categorySearch = data;
        console.log(categorySearch);
        dispatch(categoriesSEARCH_OK(categorySearch));
        dispatch(fetchAllCategories());
      })
      .catch(() => {
        console.log("error fetching");
        dispatch(categoriesSEARCH_X());
      });
  };
}

export function toggleSearch(isSearch) {
  return async dispatch => {
    savedCriteria = null;
    dispatch(categoriesIS_SEARCH(isSearch));
  };
}

// Same with other actions...
// Action object creator functions
/*
export const categoryRandomized_REQ = () => ({
    type: ActionTypes.CATEGORY_RANDOMIZED_REQ,
});
export const categoryRandomized_OK = (id) => ({
    type: ActionTypes.CATEGORY_RANDOMIZED_OK,
    id: id,
});
export const categoryRandomized_X = () => ({
    type: ActionTypes.CATEGORY_RANDOMIZED_X,
});

// Helper function, real action function?
export function randomizeCategory() { 
    return async (dispatch, getState) => {
        dispatch(categoryRandomized_REQ());
        // Here would be some async AJAX call with await...
        // ... or some promises or so
        const categoryList = (getState()).categories.categoryList;
        //const {categoryList} = getState().categories;
        console.dir(categoryList);

        if(!categoryList || categoryList.length ===0) {
            dispatch(categoryRandomized_X());
        } else {
            let randomizedId = Math.floor(Math.random*categoryList.length);
            dispatch(categoryRandomized_OK(randomizedId));
        }
    }
};
*/

console.log("fsdfs")