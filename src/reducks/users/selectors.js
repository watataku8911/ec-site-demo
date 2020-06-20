import {createSelector} from "reselect";

const usersSelector = (state) => state.users;

export const getSignedIn = createSelector(
    [usersSelector],
    state => state.isSineedIn
);

export const getUserId = createSelector(
    [usersSelector],
    state => state.uid
);

export const getUsername = createSelector(
    [usersSelector],
    state => state.username
);