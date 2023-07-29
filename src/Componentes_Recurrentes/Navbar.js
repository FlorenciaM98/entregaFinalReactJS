import { Link, NavLink } from "react-router-dom";

import Cart from "./Cart";

function Navbar({ titulo, logo }) {

    return (
        <div className="navBar-container">
            <div className="navBar-titulo">{titulo}</div>
            <div className="navBar-avatar">
                <img src={ logo } />
            </div>
            <div className="navBar-links">
                <NavLink to="/">Home</NavLink>
                <NavLink to="store">Store</NavLink>
                <NavLink to="contact">Contact</NavLink>
                <NavLink to="cart">Cart</NavLink>
            </div>
        </div>
    )
}

export default Navbar;