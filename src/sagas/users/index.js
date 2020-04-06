import addUserSaga from "./addUserSaga";
import editUserSaga from "./editUserSaga";
import getAllUsersSaga from "./getAllUsersSaga";
import deleteUserSaga from "./deleteUserSaga";
import message from "./Message"

const users = [addUserSaga, editUserSaga, getAllUsersSaga, deleteUserSaga];

export default users;
