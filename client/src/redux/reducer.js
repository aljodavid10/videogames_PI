import { FILTER, FILTER_LOCATION, ORDER, UPDATE } from "./actionTypes";

const initialState = {
    videogames: [],
    videogames2: [],
    errors: ""
};

function reducer(state = initialState, { type, payload }) {
    switch (type) {
        case UPDATE:
            return ({
                ...state,
                videogames: payload, 
                videogames2: payload
            })
        case FILTER:
            const genderFiltered = state.videogames2.filter(videogame => {
                return videogame.genres.some(genre => genre === payload);
            });
            
            return {
                ...state,
                videogames: payload === 'All' ? state.videogames2 : genderFiltered
            };
        case FILTER_LOCATION:
            const locationFiltered = state.videogames2.filter(videogame => videogame.location === payload);
            
            return {
                ...state,
                videogames: locationFiltered
            };
        case ORDER:
            const orderedVideogames = [...state.videogames2];

            orderedVideogames.sort((a, b) => {
                if (payload === 'ascendenteID') 
                    return a.id - b.id;
                else if(payload === 'descendenteID')
                    return b.id - a.id;
                else if (payload === 'ascendenteRating') 
                    return a.rating - b.rating;
                else if(payload === 'descendenteRating')
                    return b.rating - a.rating;
            });
            return {
                ...state,
                videogames: orderedVideogames
            };
        case "ERROR":
            return {
                ...state,
                errors: payload
            };
        default:
            return state;
    }
}

export default reducer;
