
// import styles from '../style/Header.module.css'
import { Link } from 'react-router-dom'

function Header() {
    return (
        <div className="navbar bg-body-tertiary">
            <Link to="/" style={{ color: 'Black', textDecoration: 'none', textShadow: '5px 5px silver' }}>
                   <h1 className="mx-4 display-6 font-monospace">My rest countries</h1> 
            </Link>
        </div>
    );
}

export default Header;