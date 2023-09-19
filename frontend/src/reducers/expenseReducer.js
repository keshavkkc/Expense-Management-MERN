const initialState = {
    data: [],
    isLoading: false,
    isError: ''
}

const expenseReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LIST_EXPENSES': {
            return {
                ...state,
                data: [...action.payload],
                isLoading: false,
                isError: ''
            }
        }
        case 'DELETE_EXPENSES': { // SOFT DELETE EXPENSES
            const newData = state.data.map((obj) => {
                if (obj._id === action.payload._id) {
                    return { ...obj, isDeleted: action.payload.isDeleted }
                } else {
                    return { ...obj }
                }
            })
            return {
                ...state,
                data: newData,
                isError: ''
            }
        }
        default: {
            return state
        }
    }
}

export default expenseReducer