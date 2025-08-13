import APPEARANCE_CONSTANTS from "../constants/appearance";
import krFlag from '../assets/flags/kr.svg'
import enFlag from '../assets/flags/en.svg'
import trFlag from '../assets/flags/tr.svg'
import azFlag from '../assets/flags/az.svg'
import grFlag from '../assets/flags/gr.svg'
import frFlag from '../assets/flags/fr.svg'
import chFlag from '../assets/flags/ch.svg'
import itFlag from '../assets/flags/it.svg'
import jpFlag from '../assets/flags/jp.svg'
import spFlag from '../assets/flags/sp.svg'
import prFlag from '../assets/flags/pr.svg'
import ruFlag from '../assets/flags/ru.svg'
import Big from "big.js";
import i18n from "i18next";


const appearanceStates = {

    chartColors: {
        defaultColor: '#2e79eb',
        lineColor: '#FFF',
        greenColor: '#2e9d41',
        redColor: '#f54b4b'
    },
    fontSize: 13,
    dimensions: {
        width: 0,
        height: 0,
    },

    gridOpacity: 0.1,
    isIframe: false,
    toggle: false,
    margin: {
        left: -20,
        right: 60,
        top: 0,
        bottom: 20,
    },
    gridHeight: 0,
    gridWidth: 0,
    yGrid: {
        innerTickSize: 0,
        fontSize:11,
        // innerTickSize: -1 * gridHeight,
        tickStrokeDasharray: 'Solid',
        tickStrokeWidth: 0.1,
        tickStrokeOpacity: .8,
        stroke: 'transparent',
        tickStroke: 'rgba(255,255,255,1)',
        ticks: 9,
    },
    xGrid: {
        innerTickSize: 0,
        tickStrokeDasharray: 'Solid',
        tickStrokeWidth: 0.1,
        tickStrokeOpacity: 0.8,
        stroke: 'transparent',
        tickStroke: 'rgba(255,255,255,.2)',
        ticks: 8,
        fontSize: 9
    },

    activeLanguage: {
        key: "tr",
        title: "Türkçe",
        flag: trFlag,
    },

    languages: [
        {
            key: "tr",
            title: "Türkçe",
            flag: trFlag,
        },
        {
            key: "en",
            title: "English",
            flag1: '../assets/flags/en.svg',
            flag: enFlag,
        },

        {
            key: "az",
            title: "Azeri",
            flag: azFlag,
        },
        {
            key: "ru",
            title: "Pусский",
            flag: ruFlag,
        },
        {
            key: "de",
            title: "Deutsch",
            flag: grFlag,
        },
        {
            key: "fr",
            title: "Français",
            flag: frFlag,
        },
        {
            key: "ch",
            title: "中國人",
            flag: chFlag,
        },
        {
            key: "it",
            title: "italiano",
            flag: itFlag,
        },
        {
            key: "jp",
            title: "日本",
            flag: jpFlag,
        },
        {
            key: "pr",
            title: "Português",
            flag: prFlag,
        },
        {
            key: "sp",
            title: "España",
            flag: spFlag,
        },
        {
            key: "kr",
            title: "한국인",
            flag: krFlag,
        },

    ]


};

const appearanceReducer = (state = appearanceStates, action) => {
    switch (action.type) {

        case APPEARANCE_CONSTANTS.SET_LINE_COLOR:
            return {
                ...state,
                chartColors: {
                    ...state.chartColors,
                    lineColor: action.data
                }
            }


        case APPEARANCE_CONSTANTS.SET_DEFAULT_COLOR:
            return {
                ...state,
                chartColors: {
                    ...state.chartColors,
                    defaultColor: action.data
                }
            }

        case APPEARANCE_CONSTANTS.SET_GREEN_COLOR:
            return {
                ...state,
                chartColors: {
                    ...state.chartColors,
                    greenColor: action.data
                }
            }

        case APPEARANCE_CONSTANTS.SET_RED_COLOR:
            return {
                ...state,
                chartColors: {
                    ...state.chartColors,
                    redColor: action.data
                }
            }

        case APPEARANCE_CONSTANTS.SET_DIMENSIONS:
            return {
                ...state,
                dimensions: action.data,
                xGrid: {
                    ...state.xGrid,
                    innerTickSize: -1 * action?.data?.height,
                },
                yGrid: {
                    ...state.yGrid,
                    innerTickSize: -1 * action?.data?.width,
                },
                gridHeight: action?.data?.height - state?.margin.top - state?.margin.bottom,
                gridWidth: action?.data?.width - state?.margin.left - state?.margin.right
                // const gridHeight = height - margin.top - margin.bottom;
                // const gridWidth = width - margin.left - margin.right;

            }

        case APPEARANCE_CONSTANTS.SET_TOGGLE:
            return {
                ...state,
                toggle: !state.toggle
            }

        case APPEARANCE_CONSTANTS.SET_GRID_OPACITY:
            const newValue = action?.data === 'increment' ? Big(state.xGrid.tickStrokeOpacity).plus(0.1)?.toNumber()
                :
                Big(state.xGrid.tickStrokeOpacity).minus(0.1)?.toNumber()

            return {
                ...state,
                xGrid: {
                    ...state.xGrid,
                    tickStrokeOpacity: newValue
                },
                yGrid: {
                    ...state.yGrid,
                    tickStrokeOpacity: newValue
                }
            }

        case APPEARANCE_CONSTANTS.SET_IFRAME:
            return {
                ...state,
                isIframe: action?.data
            }
        case APPEARANCE_CONSTANTS.SET_ACTIVE_LANGUAGE:
            console.log('action = ',action)
            const theLang = state.languages?.find(i => i.key === action?.data)
            if (!theLang)
                return {
                    ...state
                }

            i18n.changeLanguage(theLang?.key)
            localStorage.setItem('language', action.data)
            return {
                ...state,
                activeLanguage: theLang
            }
        default:
            return state;

    }
};

export default appearanceReducer;
