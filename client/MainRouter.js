import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './core/Home'
import Users from './user/Users'
import Signup from './user/Signup'
import Signin from './auth/Signin'
import PrivateRoute from './auth/PrivateRoute'

const MainRouter = () => {
    return (<div>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/users" component={Users}/>
            <Route path="/signup" component={Signup}/>
            <Route path="signin" component={Signin}/>
            <PrivateRoute path="/user/edit/:userId" component={EditProfile}/>
        </Switch>
    </div>)
}

export default MainRouter