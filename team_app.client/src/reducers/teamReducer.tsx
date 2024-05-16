type actionType = {
    type: string,
    payload: Array<object> | object;
}

const teamReducer = (state = [], action: actionType) => {
    switch (action.type) {
        case 'SET_TEAM':
            return action.payload;
        case 'ADD_MEMBER':
            return action.payload;
        case 'REMOVE_MEMBER':
            return action.payload;
        default:
            return state;
    }
}

export default teamReducer;