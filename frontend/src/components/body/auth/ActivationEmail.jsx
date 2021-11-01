import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { showErrMsg, showSuccessMsg } from '../../header/utils/notification/Notification'

function ActivationEmail() {
    const {activation_token} = useParams()
    const [err, setErr] = useState('')
    const [success, setSuccess] = useState('')

    useEffect(() => {
        if(activation_token){
            const activationEmail = async () => {
                try {
                   const res = await axios.post('user/activation', {activation_token})
                   setSuccess(res.data.message)
                } catch (err) {
                     err.response.data.msg && setErr(err.response.data.msg)
                }
            }
        }
    }, [activation_token])

    return (
        <div className="active_page">
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}
        </div>
    )
}

export default ActivationEmail
