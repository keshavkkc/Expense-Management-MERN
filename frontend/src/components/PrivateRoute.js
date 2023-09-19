import React, { Component } from "react"
import { Route, Redirect } from "react-router-dom"

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <div>
      <Route
        {...rest}
        render={(props) => {
          return (
            <>
              {localStorage.getItem("token") ? (
                <Component {...props} {...rest} /> // extra props value pass to comoponent we are accepting in {...rest}
              ) : (
                <>
                  {alert("Sorry. First you need to login to access this route")}
                  <Redirect to={{ path: "/" }} />
                </>
              )}
            </>
          )
        }}
      />
    </div>
  )
}

export default PrivateRoute
