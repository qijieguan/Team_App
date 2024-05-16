export const setTeam = (data: Array<object>) => {
    return {
        type: 'SET_TEAM',
        payload: data
    }
}

export const addMember = (data: object) => {
    return {
        type: 'ADD_MEMBER',
        payload: data
    }
}

export const removeMember = (data: object) => {
    return {
        type: 'REMOVE_MEMBER',
        payload: data
    }
}
