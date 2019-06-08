import { RECEIVE_USERS } from "../actions/user_actions";

const searchedUsersReducer = (state = {}, action) => {
  Object.freeze(state);
  const nextState = {}

  switch (action.type) {
    case RECEIVE_USERS:
      let searched = []
      Object.values(action.users).forEach(user => {
        searched.push(user.id)
      });
      return nextState.searchedUsers = searched;
    default:
      return state;
  }
}

export default searchedUsersReducer;