import axios from 'axios'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './Header.css'

function Header() {
    const auth = useSelector(state => state.auth)
    const {user, isLogged} = auth

    const handleLogout = async () => {
        try {
            await axios.get('user/logout')
            localStorage.removeItem('firstLogin')
            window.location.href = "/";
        } catch (err) {
            window.location.href = "/";
        }
    }

    const userLink = () => {
        return <li className="drop-nav">
            <Link to="#" className="avatar">
            <img src={user.avatar} alt="" />{user.name}
            <i class="fas fa-angle-down"></i>
            </Link>
            <ul className="dropdown">
                <li><Link to="/profile">Profile</Link></li>
                <li onClick={handleLogout}><Link to="/">Logout</Link></li>
            </ul>
        </li>
    }

    const transform = {
        transform: isLogged ? "translateY(-5px)" : 0
    }

    return (
        <div>
            <header>
                <div className="logo">
                     <h1> <Link to="/">Auth</Link></h1>
                </div>

                <ul style={transform}>
                    <li><Link to="/"><i className="fas fa-shopping-cart"></i>Cart</Link></li>
                    {
                        isLogged ?  userLink()
                        :
                        <li><Link to="/login"><i className="fas fa-user"></i>Sign in</Link></li>
                    }
                    
                </ul>
            </header>
        </div>
    )
}

export default Header
