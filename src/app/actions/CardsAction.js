import * as ApiCaller from "../utils/ApiCaller";
import template from "string-template";
import { CARD_SHUFFLE, DRAW_CARD } from "../utils/ApiEndpoint";
// import AppConst from "../utils/AppConst";
// import AppLocalStorage from "../utils/AppLocalStorage";
// import history from './history';


export const getCardShuffle = (id) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch({
                type: "CARD_PENDING"
            });
            ApiCaller.apiGet(template(CARD_SHUFFLE + id + '/shuffle'), ApiCaller.baseHeader())
                .then(function (resp){
                    // console.log(resp);
                    dispatch({
                        type: "GET_CARD_SHUFFLE_SUCCESS",
                        payload: resp.data
                    });
                    resolve();
                }).catch(error => {
                    // const status = error.response.status;
                    dispatch({
                        type: "GET_CARD_FAILURE"
                        // payload: status
                    });
                    reject();
                })
        })
    }
}

export const getCardDraw = (id) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch({
                type: "CARD_PENDING"
            });
            ApiCaller.apiGet(template(DRAW_CARD + id + '/draw/?count=12'), ApiCaller.baseHeader())
                .then(function (resp){
                    // console.log(resp);
                    dispatch({
                        type: "GET_DRAW_CARD_SUCCESS",
                        payload: resp.data.cards
                    });
                    resolve();
                }).catch(error => {
                    // const status = error.response.status;
                    dispatch({
                        type: "GET_CARD_FAILURE"
                        // payload: status
                    });
                    reject();
                })
        })
    }
}