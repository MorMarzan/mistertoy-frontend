import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { LoginSignup } from './LoginSignup.jsx'
import { userService } from '../services/user.service.js'
import { showErrorMsg } from '../services/event-bus.service.js'
import { SET_USER } from '../store/reducers/user.reducer.js'


export function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const user = useSelector(storeState => storeState.userModule.loggedinUser)

    function onLogout() {
        userService.logout()
            .then(() => {
                onSetUser(null)
            })
            .catch((err) => {
                showErrorMsg('OOPs try again')
            })
    }

    function onSetUser(user) {
        dispatch({ type: SET_USER, user })
        navigate('/')
    }


    return (
        <section className="login full main-layout">
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
        </section>
    )
}
