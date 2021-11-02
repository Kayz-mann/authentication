import axios from 'axios'
import React, { useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { showErrMsg, showSuccessMsg } from '../../header/utils/notification/Notification'
import { isLength, isMatch } from '../../header/utils/validation/Validation'
import './Profile.css'

function Profile() {
    const initialState = {
        name: '',
        password: '',
        cf_password: '',
        phone_number: '',
        err: '',
        success: ''
    }

    const {user, isAdmin} = auth
    const [data, setData] = useState(initialState)
    const [avatar, setAvatar] = useState(false)
    const [loading, setLoading] = useState(false)
    const [callback, setCallback] = useState(false)
    const {name, password, cf_password, phone_number, err, success} = data
    const auth = useSelector(state => state.auth)
    const token = useSelector(state => state.token)

    const handleChange = e => {
       const {name, value} = e.target
       setData({...data, [name]: value, err: '', success: ''})
    }

    const updateInfor = () => {
        try{
            axios.patch('/user/update', {
                name: name ? name: user.name,
                avatar: avatar ? avatar: user.avatar
            }, {
                headers: { Authorization: token }
            })
            setData({...data, err: '', success: 'Updated Successfully!'})
        } catch (err) {
            setData({...data, err: err.response.data.msg, success: ''})
        }
    }

    const updatePassword = () => {
        if(isLength(password))
        return setData({...data, err: "Password must be at least 6 characters", success: ''})

        if(!isMatch(password, cf_password))
        return setData({...data, err: "Password did not match", success: ''})
        try{
            axios.patch('/user/reset', {
                password
            }, {
                headers: { Authorization: token }
            })
            setData({...data, err: '', success: 'Updated Successfully!'})
        } catch (err) {
            setData({...data, err: err.response.data.msg, success: ''})
        }
    }

    const handleUpdate = () => {
        if(name || avatar) updateInfor()
        if(password) updatePassword()
    }

    const changeAvatar = async(e) => {
        e.preventDefault()
        try {
            const file = e.target.files[0]
            if(!file) return setData({...data, err: "No files were uploaded", success: ''})

            if(file.size > 1024 * 1024)
            return setData({...data, err: "Size too large", success: ''})

            if(file.type !== 'image/jpeg' && file.type !== 'image/png')
            return setData({...data, err: "FIle format is incorrect", success: ''})

            let formData = new FormData()
            formData.append('file', file)
            setLoading(true)
            const res = await axios.post('/api/upload_avatar', formData, {
                headers: {'content-type': 'multipart/form-data', Authorization: token}
            })
            setLoading(false)
            setAvatar(res.data.url)

        } catch (err) {
            setData({...data, err: err.response.data.msg, success: ''})
        }
    }

    


    
    return (
        <>
        <div>
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}
            {loading && <h3>Loading...</h3>}
        </div>
        <div className="profile_page">
            <div className="col-left">
                <h2>{isAdmin ? "Admin Profile" : "User Profile"}</h2>

                <div className="avatar">
                    <img src={avatar ? avatar : user.avatar} alt="" />
                    <span>
                        <i class="fas fa-camera"></i>
                            <p>Change</p>
                            <input type="file" name="file" id="file_up" onChange={changeAvatar} />
                    </span>
                </div>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" placeholder="Your name" defaultValue={user.name} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" placeholder="Email Address" defaultValue={user.email} onChange={handleChange}  />
                </div>
                <div className="form-group">
                    <label htmlFor="password">New Password</label>
                    <input type="password" name="password" id="password" placeholder="Your password" value={password} onChange={handleChange}   />
                </div>
                <div className="form-group">
                    <label htmlFor="cf_password">Confirm Password</label>
                    <input type="password" name="cf_password" id="cf_password" placeholder="Confirm password" value={cf_password} onChange={handleChange}   />
                </div>
                <div className="form-group">
                    <label htmlFor="number">Phone No:</label>
                    <input type="number" name="phone_number" id="name" placeholder="Enter Phone Number" value={phone_number} onChange={handleChange}  />
                </div>
                <div>
                    <em style={{color: "crimson"}}>
                        if you update password your google and facebook registration will become invalid
                    </em>
                </div>

                <button disabled={loading}>Submit Update</button>
            </div>
            <div className="col-right">
                <h2>{isAdmin ? "Users" : "MyOrders"}</h2>
                <div style={{overflowX: "auto"}}>
                    <table className="customers">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Admin</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <th>ID</th>
                            <td>Name</td>
                            <td>Email</td>
                            <td>Admin</td>
                            <td>Action</td>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </>
    )
}

export default Profile
