import React from 'react'
import { Link, Route } from 'react-router-dom'
import Home from "./Home"
import Setting from "./Setting"
import Profile from "./Profile"
const Dashboard = (props) => {

    return (
        <div className='col'>
            <Link className="navbar-brand btn btn-dark text-white me-1" to="/dashboard/home"> Home </Link>
            <Link className="navbar-brand btn btn-dark text-white me-1" to="/dashboard/setting"> Setting </Link>
            <Link className="navbar-brand btn btn-dark text-white me-1" to="/dashboard/profile"> Profile </Link>

            <Route path="/dashboard/home" component={Home} />
            <Route path="/dashboard/setting" component={Setting} />
            <Route path="/dashboard/profile" component={Profile} />
        </div>
    )
}

export default Dashboard