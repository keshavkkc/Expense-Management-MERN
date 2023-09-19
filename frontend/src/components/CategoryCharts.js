import React, { useEffect } from 'react'
import { Chart } from "react-google-charts";
import { useDispatch, useSelector } from 'react-redux';
import { startGetInfo } from '../actions/dashboardAction';

const CategoryCharts = (props) => {

    const dispatch = useDispatch()

    const dashboard = useSelector((state) => {
        return state.dashboard
    })

    useEffect(() => {

        dispatch(startGetInfo())
    }, [dispatch])

    const categories = dashboard.data.categories

    const formatData = () => {

        const data = [
            ["Category", "Amount"],
            ...Object.entries(categories).map((entry) => {
                return [
                    entry[0],
                    entry[1]
                ]
            })
        ];
        return data
    }



    return (
        <div className='d-inline'>
            {categories &&

                <Chart
                    chartType='PieChart'
                    data={formatData()}
                    options={{
                        title: "Category Wise Expenses",
                        is3D: true,
                    }}
                    width={"100%"}
                    height={"400px"}
                />
            }
        </div>
    )
}

export default CategoryCharts