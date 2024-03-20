import {FILTER, FILTER_LOCATION, ORDER, UPDATE } from "./actionTypes";

export const update = (data) => {
    return {
        type: UPDATE,
        payload: data
    }
}

export const filterCards = (gender) => {
    return {
        type: FILTER,
        payload:gender
    }
}

export const filterCardsLocation = (gender) => {
    return {
        type: FILTER_LOCATION,
        payload:gender
    }
}

export const orderCards = (orden) => {
    return {
        type:ORDER,
        payload:orden
    }
}