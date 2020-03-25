import addUserSaga from "./addUserSaga";
import editUserSaga from "./editUserSaga";
import getAllUsersSaga from "./getAllUsersSaga";
import deleteUserSaga from "./deleteUserSaga";
const users = [addUserSaga, editUserSaga, getAllUsersSaga, deleteUserSaga];

export default users;
