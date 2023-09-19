import { Link, Route, withRouter } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import CreatePost from "./CreatePost";
import PrivateRoute from './components/PrivateRoute'
const App = (props) => {
  return (
    <div className="container">
      <div className="row">
        {!localStorage.getItem('token') ? (
          <>
            <h1 className="col-12 "> Expense Management </h1>
            <div className="col">
              <Link to='/register' className="navbar-brand btn btn-dark text-white me-1"> Register</Link>
              <Link to='/login' className="navbar-brand btn btn-dark text-white"> Login</Link>
            </div>
          </>
        ) : (
          <div className="col">
            <Link className="navbar-brand btn btn-dark text-white me-1 float-end" onClick={() => {
              localStorage.removeItem('token')
              alert('Succesfullt Logout')
              props.history.push('/login')
            }}> LogOut </Link>
          </div>

        )}
      </div>
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <PrivateRoute path="/dashboard" component={Dashboard} />
      <Route path="/posts" component={CreatePost} />
    </div>
  );
}

export default withRouter(App);
