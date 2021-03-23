import React from 'react';

import { Link } from 'react-router-dom';

import './header.scss';

const Header = () => {
    return(
        <header className = 'header'>
            <nav className = 'header__nav'>
                <ul className = 'nav__links'>
                    <li>
                        <Link to = '/'>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to = '/trends'>
                            Trends
                        </Link>
                    </li>
                    <li>
                        <Link to = '/about'>
                            About
                        </Link>        
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;