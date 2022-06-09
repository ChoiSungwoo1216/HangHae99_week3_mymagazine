// // info.js
import { db } from "../../shared/firebase";
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, query, orderBy} from "firebase/firestore";

// Actions
const LOAD = "post/LOAD";
const ADD = "post/ADD";
const EDIT = "post/EDIT";
const DELETE = "post/DELETE";

const initialState = {
  list: [],
};

// Action Creators
export function loadpost(post_list) {
  return { type: LOAD, post_list };
}

export function addpost(post) {
  return { type: ADD, post: post };
}

export function editpost(post, post_index) {
  return { type: EDIT, post, post_index };
}

export function deletepost(post_index) {
  return { type: DELETE, post_index };
}

// middlewares

export const loadPostFB = () => {
  return async function (dispatch) {
    const post_data = await getDocs(query(collection(db, "post"), orderBy("timestamp", "desc")));
    let post_list = [];

    post_data.forEach((b) => {
      post_list.push({ id: b.id, ...b.data() });
    });

    dispatch(loadpost(post_list));
  }
}

export const addPostFB = (post) => {
  return async function (dispatch) {
    const docRef = await addDoc(collection(db, "post"), post);
    const post_data = { id: docRef.id, ...post };

    dispatch(addpost(post_data));
  }
}

export const editPostFB = (post, post_id) => {
  return async function (dispatch, getState) {
    const docRef = doc(db, "post", post_id);

    await updateDoc(docRef, { ...post, ...post });

    const _post_list = getState().post.list;
    const post_index = _post_list.findIndex((b) => {
      return b.id === post_id;
    })

    dispatch(editpost(post, post_index));
  };
};

export const deletePostFB = (post_id) => {
  return async function (dispatch, getState) {
    if (!post_id) {
      return;
    }
    const docRef = doc(db, "post", post_id);
    await deleteDoc(docRef);

    const _post_list = getState().post.list;
    const post_index = _post_list.findIndex((b) => {
      return b.id === post_id;
    });

    dispatch(deletepost(post_index));
  }
}

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "post/LOAD": {
      return { list: action.post_list };
    }

    case "post/ADD": {
      const new_post_list = [action.post, ...state.list];
      return { list: new_post_list };
    }

    case "post/EDIT": {
      const edit_post_list = state.list.map((post, idx) => {
        return Number(action.post_index) === idx
          ? { ...post, ...action.post }
          : post;
      });
      return { ...state, list: edit_post_list };
    }

    case "post/DELETE": {
      const new_post_list = state.list.filter((l, idx) => {
        return parseInt(action.post_index) !== idx;
      });

      return { list: new_post_list };
    }

    default:
      return state;
  }
}