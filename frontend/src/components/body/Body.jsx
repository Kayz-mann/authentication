import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Switch } from 'react-router'
import ActivationEmail from './auth/ActivationEmail'
import Login from './auth/Login'
import Register from './auth/Register'
import NotFound from '../header/utils/notfound/NotFound'
import ForgotPassword from './auth/ForgotPassword'
import ResetPassword from './auth/ResetPassword'
import Profile from './profile/Profile'
import EditUser from './profile/EditUser'

function Body() {
    const auth = useSelector(state => state.auth)
    const {isLogged, isAdmin} = auth
    return (
        <section>
            <Switch>
                <Route path="/login" component={isLogged ? NotFound : Login} exact></Route>
                <Route path="/register" component={isLogged ? NotFound : Register} exact></Route>
                <Route path="/forgot_password" component={isLogged ? NotFound : ForgotPassword} exact></Route>
                <Route path="/user/reset/:token" component={isLogged ? NotFound : ResetPassword} exact></Route>
                <Route path="/user/activate/:activation_token" component={ActivationEmail} exact></Route>
                <Route path="/profile" component={isLogged ? Profile : NotFound} exact></Route>
                <Route path="/edit_user/:id" component={isAdmin ? EditUser : NotFound} exact></Route>
                
            </Switch>
        </section>

    )
}

export default Body
