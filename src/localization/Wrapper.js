import React, {useState} from "react";
import Russian from "../localization/russianLanguage.json";
import Kyrgyz from "../localization/kyrgyzLanguage.json";
import English from "../localization/englishLanguage.json";
import {IntlProvider} from "react-intl";
import { localStorageCheck } from "@/helpers/constants";

export const Context = React.createContext();
export const russianLanguageCode = 'ru-RU';
export const kyrgyzLanguageCode = 'ky';
export const englishLanguageCode = 'en-US';

let local;
let lang;

export let localStorageLang;

if (localStorageCheck) {
    localStorageLang = localStorage.getItem("language")
}

if (!localStorageLang) {
    local = navigator.language
} else{
    local = localStorageLang;
}

if(local === kyrgyzLanguageCode){
    lang = Kyrgyz;
}else if(local === russianLanguageCode){
    lang = Russian;
}
