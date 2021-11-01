/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import './Login.css'
import axios from'axios' 
import { showErrMsg, showSuccessMsg } from '../../header/utils/notification/Notification'
import { useDispatch } from 'react-redux'
import { dispatchLogin } from '../../../redux/actions/authAction'
import { isEmpty, isLength, isMatch } from '../../header/utils/validation/Validation'


const initialState = {
    name: '',
    email: '',
    password: '',
    err: '',
    success: '',
    cf_password: '',
    phone_number: '',
    err: '',
    
}

function Register() {
     const [user, setUser] = useState(initialState)
     const {email, password, err, phone_number, cf_password, success, name} = user
     const dispatch = useDispatch()
     const history = useHistory()

     const handleChangeInput = (e) => {
         const {name, value} = e.target
         setUser({...user, [name]:value, err: '', success: ''})
     }

     const handleSubmit = async (e) => {
         e.preventDefault()

         if(isEmpty(name) || isEmpty(password))
         return setUser({...user,  err:"Please fill in all fields", success: ''})

         if(isEmpty(email) || isEmpty(password))
         return setUser({...user,  err:"Invalid email", success: ''})

         if(isLength(password) || isEmpty(password))
         return setUser({...user,  err:"Password must be at least 6 characters", success: ''})

         if(isMatch(password, cf_password))
         return setUser({...user,  err:"Password did not match", success: ''})
         try {
             const res = await axios.post('../user/register', {
                 name, email, password, phone_number
             })
             setUser({...user,  err: '', success: res.data.msg})

         } catch(err) {
             err.response.data.msg &&
             setUser({...user,  err: err.response.data.msg, success: ''})
         }
     }
    return (
        <div className="login_page">
            <h2>Register</h2>
             {err && showErrMsg(err)}
             {success && showSuccessMsg(success)}

            <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Name</label>
                <input type="text" placeholder="Enter Name"  value={name} name="name" onChange={handleChangeInput} />
            </div>
            <div>
                <label htmlFor="email">Email Address</label>
                <input type="text" placeholder="Enter email address" id="email" value={email} name="name" onChange={handleChangeInput} />
            </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="Enter your password" id="password" value={password} name="password" onChange={handleChangeInput} />
                </div>
                <div>
                    <label htmlFor="password">Confirm Password</label>
                    <input type="password" placeholder="Confirm password" id="password" value={cf_password} name="password" onChange={handleChangeInput} />
                </div>
                <div>
                    <label htmlFor="phone_number">Phone Number</label>
                    <input type="number" placeholder="Phone Number" id="cf_password" value={phone_number} name="phone_number" onChange={handleChangeInput} />
                </div>
                <div className="row">
                    <button type="submit">Register</button>
                </div>
            </form>
            <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
    )
}

export default Register
