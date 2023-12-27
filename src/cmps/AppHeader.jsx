
import { NavLink } from "react-router-dom"

export function AppHeader() {

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
        </header>
    )
}
