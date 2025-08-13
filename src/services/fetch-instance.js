import {decrypt} from "../helpers/encryption";

let clientBearerToken = null;
export const fetchInstance = async (url, method, instance) => {
    if (!clientBearerToken) {
        let client = localStorage.getItem('client');
        const dec = client ? decrypt(client) : {}
        clientBearerToken = dec?.clientToken
    }
    // console.log('Bearer ' + dec?.clientToken)
    try {
        return await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                // "Authorization": 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI1IiwianRpIjoiZGFhMWUxM2U1ZDVjYjU2NGY0ODg4NmJhNDU0ZGNmZDIwYWUzZmQwNDA5YmJhMDFkMjQ0NmM1MzkzMGRkY2E4ODA2YjcwODRkODAxM2QxNjYiLCJpYXQiOjE3MDQ4ODk3OTEuNjc0OTE3LCJuYmYiOjE3MDQ4ODk3OTEuNjc0OTE4LCJleHAiOjE3MzY1MTIxOTEuNjczNTQ0LCJzdWIiOiI2NCIsInNjb3BlcyI6W119.FTkhrbKFPcoPnGpgcezGC3luRwjji93quxKzKJcG_7_48JidP_SbNFMgPLNNGxzJZmVMWvrQg8UtvXSys7TkKin4MB9qmaofwX-2wRvIahoKnVItzxDMaNOegrSpjTdOg-SuEqj_WGt0LTsEG83YtSF2OvISx-ot9JwzD58OetX9Wca0yxwXVUqrs52RV_qR4aZb5HP37c8rm-lBTJhtzRiMf-TQtWAB6VrFGZ7CJeCq7JHCGZvEG2AINnIXwS0gA94kIvTrEwG7q2TIXiLno_-XUfnmNuMh9ZyhM7lPU9MdlOFS1EG5tNqpDqiAcgc88DxD60T0mOvXPeOebfATyIZNoaWK4fO-xZ7Zj5eTJnPOHIph4IDCoa6TpuIbxruqhOQY29uiAlEZo_yZA5p_0ZrTIjKXlNW1sAESIuPgCECkN0DDkLhATID-q3wS9ZEEDV9hnk0aCwVfCvhnn8a7iri7jOhD9MHMfamloLeVvunSBDZ9SNNEbsot0CHiZPmMgdtov93BLGKp5Ro9UIVrRkKmJI7eMJnDvDZ61eNIrEYbmfvEJxSFUUWfuB1JsPLViUR1NA6BlT8wqCcplaEq7BjRtwEGeJWYHGQeQL-YRiuP_NmSNt948IWpQsKUAVXccb5AeRpdwV2x4DegZGp3ZKd1m0vryN9feZ8H-V1l_x4'
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            },
            // body: JSON.stringify({...instance, appKey: "live-exchange"}),
            body: JSON.stringify(instance),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                return responseJson;
            });
    } catch (err) {
        console.log(err.message);
    }
};

export const resetToken = () => {
    clientBearerToken = null
}

export const getInstance = async (url, method) => {
    try {
        return await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                return responseJson;
            });
    } catch (err) {
        console.log(err.message);
    }
};


// export default {fetchInstance, getInstance};
