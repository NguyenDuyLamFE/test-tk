import {combineReducers} from 'redux';
// import {i18nReducer} from "react-redux-i18n";
import {reducer as formReducer} from 'redux-form';
import cardsReducer from "./CardReducer";

const reducers = combineReducers({
    // i18n: i18nReducer,
    form: formReducer,
    cardsReducer,
});

export default reducers;
