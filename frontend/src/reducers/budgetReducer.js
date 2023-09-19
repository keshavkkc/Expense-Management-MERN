const initialState = {
    data: {},
    isLoading: false,
    isError: ''
}

const budgetReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LIST_BUDGET': {
            return {
                ...state,
                data: action.payload,
                isLoading: false,
                isError: ''
            }
        }
        case 'UPDATE_BUDGET': {
            return {
                ...state,
                data: { ...state.data, ...action.payload },
                isLoading: false,
                isError: ''
            }
        }
        case 'LOADING_BUDGET': {
            return {
                ...state,
                isLoading: true,
                isError: ''
            }
        }
        case 'ERROR_BUDGET': {
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        }
        default: {
            return state
        }
    }
}

export default budgetReducer