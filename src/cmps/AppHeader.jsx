
import { NavLink, useNavigate } from "react-router-dom"

import { useDispatch, useSelector } from 'react-redux'
import { LoginSignup } from './LoginSignup.jsx'
import { showErrorMsg } from '../services/event-bus.service.js'
import { SET_USER } from '../store/reducers/user.reducer.js'
import { logout } from "../store/actions/user.actions"



export function AppHeader() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const user = useSelector(storeState => storeState.userModule.loggedinUser)

    async function onLogout() {
        try {
            await logout()
            onSetUser(null)
        } catch (err) {
            console.error('Error loading toys:', err)
            showErrorMsg('OOPs try again')
        }
    }

    function onSetUser(user) {
        dispatch({ type: SET_USER, user })
        navigate('/')
    }

    return (
        <header className="app-header full">
            <section className="header-container">
                <h1>MisterToy App</h1>
                <nav className="app-nav">
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/about" >About</NavLink>
                    <NavLink to="/toy" >Toys</NavLink>
                    <NavLink to="/dashboard" >Dashboard</NavLink>
                </nav>
            </section>
            {user ? (
                < section >
                    <span to={`/user/${user._id}`}>Hello {user.fullname}</span>
                    <button onClick={onLogout}>Logout</button>
                </ section >
            ) : (
                <section>
                    <LoginSignup onSetUser={onSetUser} />
                </section>
            )}
        </header>
    )
}
