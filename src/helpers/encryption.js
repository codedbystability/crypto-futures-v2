import * as CryptoJS from "crypto-js";
import Big from "big.js";
import React from "react";

export const decrypt = (encrypted) => {
    if (!encrypted)
        return null
    try {
        const bytes = CryptoJS.AES.decrypt(encrypted, 'KEDZYLjAmW8gQC7sKvqt7kSvikuMIssu')
            .toString(CryptoJS.enc.Utf8);
        return JSON.parse(bytes);
    } catch (e) {
        console.log('ENCRYPTION ERR - ', e)
        console.log(encrypted)
        return null
    }
}

export function getDeviceID(length) {

    const deviceID = localStorage.getItem('deviceID')
    if (deviceID)
        return deviceID

    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    localStorage.setItem('deviceID', result)
    return result;
}


export function deleteAllCaches() {
    const deviceID = localStorage.getItem('deviceID')


    localStorage.clear()

    if (deviceID)
        localStorage.setItem('deviceID', deviceID)

    return true
}

export const encrypt = (data) => {
    try {
        return CryptoJS.AES.encrypt(JSON.stringify(data), 'KEDZYLjAmW8gQC7sKvqt7kSvikuMIssu')
            .toString();
    } catch (e) {
        console.log('ENCRYPTION ERR - ', e)
        return null
    }
}


export const afterDecimal = (num) => {
    try {
        if (Number.isInteger(num)) {
            return 0;
        }

        return num.toString().split('.')[1].length;
    } catch (e) {
        return 0;
    }
}


export function formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
    try {
        decimalCount = Math.abs(decimalCount);
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

        const negativeSign = amount < 0 ? "-" : "";

        let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
        let j = (i.length > 3) ? i.length % 3 : 0;

        return negativeSign +
            (j ? i.substr(0, j) + thousands : '') +
            i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
            (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
    } catch (e) {
        console.log(e)
    }
}

export function toggleFullScreen(elem, returnFunc) {

    // let clientDomain = 'http://localhost:3000';

    // if (window.location.href.indexOf("apioption") != -1) {
    //     clientDomain = 'https://apioption.com';
    // } else if (window.location.href.indexOf("ikiliopsiyon1") != -1) {
    //     clientDomain = 'https://ikiliopsiyon1.com';
    // } else if (window.location.href.indexOf("karopsiyon1") != -1) {
    //     clientDomain = 'https://karopsiyon1.com';
    // }
    //
    // if (returnFunc) {
    //     console.log('return by client')
    //     window.parent.postMessage({
    //         'func': 'toggleScreen',
    //         'message': 'fullscreen method called.'
    //     }, clientDomain);
    //     return
    // }

    // ## The below if statement seems to work better ## if ((document.fullScreenElement && document.fullScreenElement !== null) || (document.msfullscreenElement && document.msfullscreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen)) {
    if (
        (document.fullScreenElement !== undefined &&
            document.fullScreenElement === null) ||
        (document.msFullscreenElement !== undefined &&
            document.msFullscreenElement === null) ||
        (document.mozFullScreen !== undefined && !document.mozFullScreen) ||
        (document.webkitIsFullScreen !== undefined &&
            !document.webkitIsFullScreen)
    ) {
        if (elem.requestFullScreen) {
            elem.requestFullScreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullScreen) {
            elem.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }
    } else if (document.cancelFullScreen) {
        document.cancelFullScreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}

export const getStyledContent = (price, digits = 2) => {

    try {
        const split = Big(price || 0).toFixed(digits).split('.')
        return <span>
            {split[0]}.
            <span className="cool-d">
                {split[1]}
            </span>
        </span>
        // return Big(parityO.b)?.toFixed(parseInt(parityO.digit || 0))
    } catch (e) {
        return ''
    }
}
export const getStyledContentReverse = (price, digits = 2) => {

    try {
        const split = Big(price || 0).toFixed(digits).split('.')
        return <span className="cool-d">

            {split[0]}.
            <span className="text-secondary">
                {split[1]}
            </span>
        </span>
        // return Big(parityO.b)?.toFixed(parseInt(parityO.digit || 0))
    } catch (e) {
        return ''
    }
}
