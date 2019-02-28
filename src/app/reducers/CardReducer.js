
const initialState = {
    isPending: false,
    // shuffle: false,
    cards: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case "CARD_PENDING":
            return {
                ...state,
                isPending: true,
            };
        case "GET_DESK_CARD_SUCCESS":
            return {
                ...state,
                isPending: false,
                deck_id: action.payload.deck_id
            };
        case "GET_CARD_SHUFFLE_SUCCESS":
            return {
                ...state,
                isPending: false,
                // shuffle: false,
            };
        case "GET_DRAW_CARD_SUCCESS":
            return {
                ...state,
                isPending: false,
                cards: action.payload
            };       
        case "GET_CARD_FAILURE":
            return {
                ...state,
                isPending: false,
            }

        default:
    }   

    return state;
}
