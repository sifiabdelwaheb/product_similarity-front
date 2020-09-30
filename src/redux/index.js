import { reducer as packhome } from './package/packhomeRedux';
import { combineReducers } from 'redux';
import settings from './settings/reducer';
import { reducer as auth } from './auth/authUserRedux';
import { reducer as contactUs } from './auth/contactUsRedux';
import { reducer as packageUS } from './package/packageUSRedux';
import { reducer as RegisterUser } from './package/RegisterUserRedux';
import { reducer as ProductSimilarity } from './similarity/ProductSimilarity';
import { reducer as Moteur } from './moteur/MoteruRedux';
import { reducer as message } from './chatbot/Message';
import { reducer as profiling } from './profiling/profilingRedux';
import { reducer as chart } from './profiling/piechart';
import {reducer as sentiment} from './sentiment/sentimentRedux'
import menu from './menu/reducer';

const reducers = combineReducers({
  settings,
  auth,
  menu,
  contactUs,
  packageUS,
  RegisterUser,
  message,
  ProductSimilarity,
  Moteur,
  profiling,
  chart,
  sentiment
});

export default reducers;
