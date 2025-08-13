import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import translationsEN from './en.json'
import translationsTR from './tr.json'
import kr from './kr.json'
import pr from './pr.json'
import it from './it.json'
import ar from './ar.json'
import sp from './sp.json'
import ch from './ch.json'
import de from './de.json'
import fr from './fr.json'
import az from './az.json'
import ru from './ru.json'


const resources = {
    tr: {
        translation: translationsTR
    },

    en: {
        translation: translationsEN
    },

    az: {
        translation: az
    },
    ru: {
        translation: ru
    },

    fr: {
        translation: fr
    },
    de: {
        translation: de
    },

    kr: {
        translation: kr
    },
    sp: {
        translation: sp
    },
    ch: {
        translation: ch
    },

    pr: {
        translation: pr
    },


    it: {
        translation: it
    },

    ar: {
        translation: ar
    },

};

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        fallbackLng: 'tr', // default language
        keySeparator: '.', // we do not use keys in form messages.welcome
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;
