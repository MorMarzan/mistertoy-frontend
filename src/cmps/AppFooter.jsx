import { NavLink } from "react-router-dom";

export function AppFooter() {

    return (
        <footer className="app-footer full">
            <h1>MisterToy App</h1>
            <nav className="app-nav">
                <NavLink to="/" >Home</NavLink>
                <NavLink to="/about" >About</NavLink>
                <NavLink to="/toy" >Toys</NavLink>
            </nav>
        </footer>
    )
}
