const initialState = {
    data: [],
    isLoading: false,
    isError: ''
}

const categoriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UDPATE_CATEGORIES': {
            const newData = state.data.map((ele) => {
                if (ele._id === action.payload._id) {
                    return { ...ele, name: action.payload.name }
                } else {
                    return { ...ele }
                }
            })
            return {
                ...state,
                data: newData,
                isLoading: false,
                isError: ''
            }
        }
        case 'SOFT_DELETE': {
            const newState = state.data.map((obj) => {
                if (obj._id === action.payload._id) {
                    return { ...obj, isDeleted: action.payload.isDeleted }
                } else {
                    return { ...obj }
                }
            })
            return {
                ...state,
                data: newState,
                isLoading: false,
                isError: ''
            }
        }
        case 'LIST_CATEGORIES': {
            return {
                ...state,
                data: action.payload,
                isLoading: false,
                isError: ''
            }
        }
        case 'LOADING': {
            return {
                ...state,
                isLoading: !state.isLoading,
                isError: ''
            }
        }
        case 'ERROR': {
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

export default categoriesReducer