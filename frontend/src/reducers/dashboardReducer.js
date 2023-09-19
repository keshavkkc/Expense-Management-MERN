const intialState = {
    data: {},
    isLoading: false,
    isError: ''
}

export const dashboardReducer = (state = intialState, action) => {
    switch (action.type) {
        case 'GET_INFO': {
            return {
                ...state,
                data: action.payload,
                isError: ''
            }
        }
        default: {
            return state
        }
    }
}