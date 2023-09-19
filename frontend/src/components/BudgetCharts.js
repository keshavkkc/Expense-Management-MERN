import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startGetInfo } from '../actions/dashboardAction';
import { Chart } from "react-google-charts";

const BudgetCharts = (props) => {
    const dispatch = useDispatch()

    const dashboard = useSelector((state) => {
        return state.dashboard
    })


    useEffect(() => {
        dispatch(startGetInfo())
    }, [dispatch])

    const totalBudget = dashboard.data.budget
    const totalExpenses = dashboard.data.totalExpenses

    const formatData = () => {
        const total = totalBudget.amount - totalExpenses
        const remaningExpenses = (total / totalBudget.amount) * 100
        const data = [
            ["Category", "Amount"],
            ["Spent", totalExpenses],
            ["Remaning", remaningExpenses],
        ];
        return data
    }

    return (
        <div>
            {totalBudget ? <Chart
                chartType='PieChart'
                data={formatData()}
                options={{
                    title: "Budget Overview",
                    is3D: true,
                }}
                width={"100%"}
                height={"400px"}
            /> : (
                'Loading'
            )
            }
        </div>
    )
}

export default BudgetCharts