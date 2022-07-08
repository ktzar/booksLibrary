import { NavLink } from 'react-router-dom';

export const Navigation = () => (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container-fluid">
            <span className="navbar-brand">School Library</span>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <NavLink className={({isActive}) => `nav-link ${isActive?'active':''}`} to="/">Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className={({isActive}) => `nav-link ${isActive?'active':''}`} to="/search">Search</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className={({isActive}) => `nav-link ${isActive?'active':''}`} to="/take">Take</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className={({isActive}) => `nav-link ${isActive?'active':''}`} to="/return">Return</NavLink>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
)
