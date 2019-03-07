import ActionTypes from "./ActionTypes";
import { fetchTestCategories } from "../models/Test";
const serverURL = "http://localhost:7000/category";
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

export const categoryDEL = categoryList => ({
  type: ActionTypes.CATEGORY_DEL_REQ,
  categoryList: categoryList
});
export const categoryDEL_X = () => ({
  type: ActionTypes.CATEGORY_DEL_X
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

// Same with other actions...
// Action object creator functions
export const categoryAdd_REQ = () => ({
  type: ActionTypes.CATEGORY_ADD_REQ
});
export const categoryAdd_OK = categoryList => ({
  type: ActionTypes.CATEGORY_ADD_OK,
  categoryList: categoryList
});
export const categoryAdd_X = () => ({
  type: ActionTypes.CATEGORY_ADD_X
});

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
          } else if (data.status === 423) {
            alert("All fields required. ID and Budget must be numbers.");
          }
          return data.json();
        })
        .then(data => {
          const categoryList = data;
          dispatch(categoryAdd_OK(categoryList));
        })
        .catch(() => {
          dispatch(categoryAdd_X());
        });
    }
  };
}

export function deleteCategory(category) {
  return async (dispatch, getState) => {
    // dispatch(categoryDEL(category));
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
      .then(data => data.json())
      .then(data => {
        const categoryList = data;
        dispatch(categoryDEL(categoryList));
      })
      .catch(() => dispatch(categoriesAll_X()));
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
