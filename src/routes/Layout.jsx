import { Outlet, NavLink, useNavigate } from "react-router-dom";
import React from "react";
import "./Layout.css";
import logo from '../assets/logo.png';
import { useState, useEffect } from "react";

const Layout = ({ setSearchTerm }) => {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const handleClick = () => {
        setSearchTerm(search);
        setSearch("");
        navigate("/");
    }

    return (
        <div className="layout">
            <header className="navbar">
                <div className="nav-name">
                    <NavLink to="/" className="nav-logo" onClick={() => { setSearchTerm("") }}>
                        <img src={logo} alt="Daily Drip Club logo"></img>
                    </NavLink>
                </div>

                <nav className="nav-items">
                    <NavLink to="/" className="item" onClick={() => { setSearchTerm("") }}>
                        Home
                    </NavLink>
                    <NavLink to="/create" className="item">
                        Create Post
                    </NavLink>
                    <NavLink to="/about" className="item">
                        About
                    </NavLink>
                </nav>

                <div className="nav-switches">
                    <input type="search"
                        className="search"
                        value={search}
                        placeholder="Discover a new drink!"
                        onChange={e => setSearch(e.target.value)}
                    />
                    <button className="search-btn" onClick={handleClick}>Search</button>
                </div>
            </header>

            <main className="content">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;