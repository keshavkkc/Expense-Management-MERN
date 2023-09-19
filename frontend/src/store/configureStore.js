import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from 'redux-thunk'
import usersReducer from "../reducers/usersReducer"
import categoriesReducer from "../reducers/categoriesReducer"
import budgetReducer from "../reducers/budgetReducer"
import expenseReducer from "../reducers/expenseReducer"
import { dashboardReducer } from "../reducers/dashboardReducer"
const configureStore = () => {
    const store = createStore(combineReducers({
        users: usersReducer,
        categories: categoriesReducer,
        budgets: budgetReducer,
        expenses: expenseReducer,
        dashboard: dashboardReducer
    }), applyMiddleware(thunk))
    return store
}

export default configureStore