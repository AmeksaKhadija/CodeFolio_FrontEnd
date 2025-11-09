import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import styles from './Header.module.css';

const Header: React.FC = () => {
    const { user, logout } = useAuth();

    return (
        <header className={styles.header}>
            <nav>
                <ul className={styles.navList}>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/profile">Profile</Link>
                    </li>
                    {user ? (
                        <li>
                            <button onClick={logout}>Logout</button>
                        </li>
                    ) : (
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                    )}
                </ul>
            </nav>
            {user && <p className={styles.userInfo}>Welcome, {user.name}!</p>}
        </header>
    );
};

export default Header;