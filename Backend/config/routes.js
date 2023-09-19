const express = require("express")
const router = express.Router()
const usersCltr = require("../app/controllers/usersCltr")
const { budgetCltr } = require("../app/controllers/budgetCltr")
const { categoryCltr } = require("../app/controllers/categoryCltr")
const { expenseCltr } = require("../app/controllers/expenseCltr")
const { dashboardCltr } = require("../app/controllers/dashboardCltr")
const { authenticateUser } = require('../app/middlewares/authentication')


//Users Routes:-
router.post("/api/users/register", usersCltr.register)
router.post("/api/users/login", usersCltr.login)
router.get("/api/users/account", authenticateUser, usersCltr.account)


//Budget Routes:
router.put("/api/budgets/update", authenticateUser, budgetCltr.update)
router.get("/api/budgets", authenticateUser, budgetCltr.list)


//Category Routes:
router.get("/api/categories", authenticateUser, categoryCltr.list)
router.post("/api/users/categories", authenticateUser, categoryCltr.create)
router.put("/api/users/categories/:id", authenticateUser, categoryCltr.update)
router.put("/api/categories/:id", authenticateUser, categoryCltr.destroy) // soft delete categories (Q: if we soft delete categories does we need to delete expense)


//Expense Routes:
router.get("/api/expenses", authenticateUser, expenseCltr.list) // All Expenses
router.get("/api/", authenticateUser, expenseCltr.deletedList)// Listing Deleted Expenses
router.get("/api/expenses/:id", authenticateUser, expenseCltr.show)
router.post("/api/expenses", authenticateUser, expenseCltr.create) // Creating Expenses
router.put("/api/expenses/delete/:id/", authenticateUser, expenseCltr.update)// soft delete, undo delete
router.put("/api/expenses/:id", authenticateUser, expenseCltr.edit)//update

//Dashboard Routes:
router.get('/api/dashboard', authenticateUser, dashboardCltr.list)


module.exports = router