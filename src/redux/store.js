import { configureStore } from "@reduxjs/toolkit";
import  categoriesReducer  from './slices/categories/categories';
import getRegionsReducer from "./slices/getRegions/getRegions.slice";
import loginReducer from './slices/login/login.slice';
import registerReducer from './slices/register/register.slice';
import addApplicationReducer from './slices/addApplication/addApplication.slice';
import getPostsReducer from './slices/getPosts/getPosts.slice';
import getMyQuestionsSlice from "./slices/getMyQuestions/getMyQuestions.slice";
import getQuestionSlice from "./slices/getQuestion/getQuestion.slice";
import getAnswerSlice from "./slices/getAnswer/getAnswer.slice";
import modersReducer from './slices/moders/moders.slice';
import addAnswerSlice from "./slices/addAnswer/addAnswer.slice";
import getUnpublishedSlice from "./slices/getUnpublished/getUnpublished.slice"

const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    getRegions: getRegionsReducer,
    login: loginReducer,
    register: registerReducer,
    questions: addApplicationReducer,
    posts: getPostsReducer,
    getMyQuestions: getMyQuestionsSlice,
    moders: modersReducer,
    getQuestion: getQuestionSlice,
    getAnswer: getAnswerSlice,
    addAnswer: addAnswerSlice,
    getUnpublished: getUnpublishedSlice,
  },
});

export default store;
