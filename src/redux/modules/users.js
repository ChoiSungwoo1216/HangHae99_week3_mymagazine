import { db } from "../../shared/firebase";
import { collection, getDocs } from "firebase/firestore";

// Actions
const U_LOAD = "users/LOAD";


const initialState = {
  list: [],
};

// Action Creators
export function loadusers(users_list) {
  return { type: U_LOAD, users_list };
}

//middleware
export const loadUsersFB = () => {
    return async function (dispatch) {
      const users_data = await getDocs(collection(db, "users"));
      let users_list = [];
  
      users_data.forEach((b) => {
        users_list.push({ id: b.id, ...b.data() });
      });
  
      dispatch(loadusers(users_list));
    }
  }

  //reducer
  export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
      case "users/LOAD": {
        return { list: action.users_list };
      }
      default:
        return state;
    }
  }