import axios from 'axios'
import React, { useState } from 'react'
import { useParams } from 'react-router'
import { showErrMsg, showSuccessMsg } from '../../header/utils/notification/Notification'
import { isLength, isMatch } from '../../header/utils/validation/Validation'

const intialState = {
    password: '',
    cf_password: '',
    err: '',
    success: ''
}



function ResetPassword() {
    const [data, setData] = useState(intialState)
    const {token} = useParams()
    const {password, cf_password, err, success} = data

    const handleChangeInput = e => {
        const {name, value} = e.target
        setData({...data, [name]:value, err: '', success: ''})
    }

    const resetPassword = async () => {
        if(isLength(password))
        return setData({...data, err: "Password must be at least 6 characters", success: ''})

        if(!isMatch(password, cf_password))
        return setData({...data, err: "Passwords do not match", success: ''})

        try {
            const res = await axios.post('/user/reset', {password}, {
                headers: {Authorization: token}
            })
            return setData({...data, err: "", success: res.data.msg})
        } catch (err) {
            err.response.data.msg && setData({...data, err: err.response.data.msg, success: ''})
        }
    }

    return (
        <div className="fg_pass">
            <h2>Forgot your password?</h2>
            <div className="row">
                {err && showErrMsg(err)}
                {success && showSuccessMsg(success)}

                <label htmlFor="email">Password</label>
                <input type="password" name="password" id="password" value={password} onChange={handleChangeInput}/>

                <label htmlFor="cf_password">Confirm password</label>
                <input type="password" name="cf_password" id="cf_password" value={cf_password} onChange={handleChangeInput}/>
                
                
                <button onClick={resetPassword}>Reset Password</button>
            </div>
        </div>
    )
}

export default ResetPassword
