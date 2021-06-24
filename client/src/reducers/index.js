import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import authReducer from './authReducer';
import dataForContestReducer from './dataForContestReducer';
import payReducer from './payReducer';
import getContestsReducer from './getContestsReducer';
import storeContestReducer from './storeContestReducer';
import bundleReducer from './bundleReducer';
import getContestByIdReducer from './getContestByIdReducer';
import updateContestReducer from './updateContestReducer';
import chatReducer from './chatReducer';
import userProfileReducer from './userProfileReducer';
import eventsReducer from './eventsReducer';



const appReducer=combineReducers({
   form: formReducer,
   auth: authReducer, // auth
   dataForContest: dataForContestReducer,
   payment: payReducer,
   contestByIdStore: getContestByIdReducer,
   contestsList: getContestsReducer,
   contestStore: storeContestReducer,
   bundleStore: bundleReducer,
   updateContestStore: updateContestReducer,
   chatStore: chatReducer,
   userProfile: userProfileReducer,
   eventsStore: eventsReducer,
});

export default appReducer;