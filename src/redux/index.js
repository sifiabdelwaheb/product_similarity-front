import { reducer as packhome } from './package/packhomeRedux';
import { combineReducers } from 'redux';
import settings from './settings/reducer';
import { reducer as auth } from './auth/authUserRedux';
import { reducer as contactUs } from './auth/contactUsRedux';
import { reducer as packageUS } from './package/packageUSRedux';
import { reducer as RegisterUserRedux } from './package/RegisterUserRedux';
import { reducer as allUsers } from './users/getAllUsersRedux';

import { reducer as addUser } from './users/addUserRedux';
import { reducer as editUser } from './users/editUserRedux';
import { reducer as deleteUser } from './users/deleteUserRedux';

import menu from './menu/reducer';

const reducers = combineReducers({
  settings,
  auth,
  menu,
  contactUs,
  packageUS,
  RegisterUserRedux,
  allUsers,

  addUser,

  editUser,

  deleteUser,
});

export default reducers;
